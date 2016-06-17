/* @flow */
import test from 'ava';
import createLRU from 'lru-cache';
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

test('#getAll() calls Ghost Web API properly', t => {
  t.plan(2);

  const apiParams = {
    page: 3,
    limit: 20,
  };

  const blogPostsRepository = new BlogPostsRepository({
    httpClient: {
      get: (url, params) => {
        t.is(url, '/v0.1/posts');
        t.deepEqual(params, {
          params: Object.assign({ include: 'tags' }, apiParams),
        });

        return Promise.resolve(GET_ALL_MOCK_RESPONSE);
      },
    },
    cache: createLRU(),
    individualCache: createLRU(),
  });

  blogPostsRepository.getAll(apiParams)
    .then(() => {});
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

test('#getBySlug() calls Ghost Web API properly', t => {
  t.plan(2);

  const blogPostsRepository = new BlogPostsRepository({
    httpClient: {
      get: (url, params) => {
        t.is(url, '/v0.1/posts/slug/lorem-ipsum');
        t.deepEqual(params, {
          params: { include: 'tags' },
        });

        return Promise.resolve(GET_BY_SLUG_MOCK_RESPONSE);
      },
    },
    cache: createLRU(),
    individualCache: createLRU(),
  });

  blogPostsRepository.getBySlug('lorem-ipsum')
    .then(() => {});
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
