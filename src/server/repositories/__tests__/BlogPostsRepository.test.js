/* @flow */
import test from 'ava';
import createLRU from 'lru-cache';
import BlogPost from '../../../entities/BlogPost';
import BlogPostsRepository from '../BlogPostsRepository';
import {
  MOCK_GHOST_API_JSON_1,
  MOCK_GHOST_API_JSON_2,
  MOCK_GHOST_API_JSON_3,
} from '../../../entities/mocks/blogPostMocks';

const GET_ALL_MOCK_RESPONSE = {
  status: 200,
  data: {
    posts: [
      MOCK_GHOST_API_JSON_1,
      MOCK_GHOST_API_JSON_2,
      MOCK_GHOST_API_JSON_3,
    ],
  },
};

const GET_BY_SLUG_MOCK_RESPONSE = {
  status: 200,
  data: {
    posts: [
      MOCK_GHOST_API_JSON_1,
    ],
  },
};

test.cb('#getAll() calls Ghost Web API properly and returns an Array<BlogPost>', t => {
  t.plan(7);

  const apiParams = {
    page: 3,
    limit: 20,
  };

  const blogPostsRepository = new BlogPostsRepository({
    httpClient: {
      get: (url, params) => {
        t.is(url, '/v0.1/posts');
        t.deepEqual(params, {
          params: {
            include: 'tags',
            page: 3,
            limit: 20,
          },
        });

        return Promise.resolve(GET_ALL_MOCK_RESPONSE);
      },
      defaults: {
        baseURL: 'http://foo.bar/baz/qux',
      },
    },
    cache: createLRU(),
    individualCache: createLRU(),
  });

  blogPostsRepository.getAll(apiParams)
    .then(blogPosts => {
      t.true(Array.isArray(blogPosts));
      t.true(blogPosts.every(blogPost => blogPost instanceof BlogPost));
      t.is(
        blogPosts[0].thumbnailImageURL,
        `http://foo.bar${MOCK_GHOST_API_JSON_1.image}`
      );
      t.is(blogPosts[1].thumbnailImageURL, MOCK_GHOST_API_JSON_2.image);
      t.is(
        blogPosts[2].thumbnailImageURL,
        `http://foo.bar/baz/${MOCK_GHOST_API_JSON_3.image}`
      );

      t.end();
    });
});

test.cb('#getAll() returns a value from the cache when each a second time', t => {
  t.plan(2);

  let phase = 0;

  const blogPostsRepository = new BlogPostsRepository({
    httpClient: {
      get: () => {
        if (phase === 1) t.pass();
        if (phase === 2) t.pass();
        if (phase === 3) t.fail();
        if (phase === 4) t.fail();

        return Promise.resolve(GET_ALL_MOCK_RESPONSE);
      },
      defaults: {
        baseURL: 'http://foo.bar/baz/qux',
      },
    },
    cache: createLRU(),
    individualCache: createLRU(),
  });

  ++phase;

  blogPostsRepository.getAll({ limit: 30, page: 2 })
    .then(() => {
      ++phase;

      return blogPostsRepository.getAll({ limit: 100, page: 5 });
    })
    .then(() => {
      ++phase;

      return blogPostsRepository.getAll({ limit: 100, page: 5 });
    })
    .then(() => {
      ++phase;

      return blogPostsRepository.getAll({ limit: 30, page: 2 });
    })
    .then(() => { t.end(); });
});

test.cb('#getBySlug() calls Ghost Web API properly and returns BlogPost', t => {
  t.plan(4);

  const blogPostsRepository = new BlogPostsRepository({
    httpClient: {
      get: (url, params) => {
        t.is(url, '/v0.1/posts/slug/lorem-ipsum');
        t.deepEqual(params, {
          params: { include: 'tags' },
        });

        return Promise.resolve(GET_BY_SLUG_MOCK_RESPONSE);
      },
      defaults: {
        baseURL: 'http://foo.bar/baz/qux',
      },
    },
    cache: createLRU(),
    individualCache: createLRU(),
  });

  blogPostsRepository.getBySlug('lorem-ipsum')
    .then(blogPost => {
      t.true(blogPost instanceof BlogPost);
      t.is(
        blogPost && blogPost.thumbnailImageURL,
        `http://foo.bar${MOCK_GHOST_API_JSON_1.image}`
      );

      t.end();
    });
});

test.cb('#getBySlug() returns a value from the cache when each a second time', t => {
  t.plan(2);

  let phase = 0;

  const blogPostsRepository = new BlogPostsRepository({
    httpClient: {
      get: () => {
        if (phase === 1) t.pass();
        if (phase === 2) t.pass();
        if (phase === 3) t.fail();
        if (phase === 4) t.fail();

        return Promise.resolve(GET_BY_SLUG_MOCK_RESPONSE);
      },
      defaults: {
        baseURL: 'http://foo.bar/baz/qux',
      },
    },
    cache: createLRU(),
    individualCache: createLRU(),
  });

  ++phase;

  blogPostsRepository.getBySlug('lorem-ipsum')
    .then(() => {
      ++phase;

      return blogPostsRepository.getBySlug('no-lorem-ipsum');
    })
    .then(() => {
      ++phase;

      return blogPostsRepository.getBySlug('no-lorem-ipsum');
    })
    .then(() => {
      ++phase;

      return blogPostsRepository.getBySlug('lorem-ipsum');
    })
    .then(() => { t.end(); });
});
