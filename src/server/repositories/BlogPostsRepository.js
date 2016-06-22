/* @flow */
import url from 'url';
import type {
  HTTPClientAbstruct,
  LRUCacheAbstruct,
} from '../../types';
import BlogPost from '../../entities/BlogPost';

const DEFAULT_LIMIT = 10;

class BlogPostsRepository {
  httpClient: HTTPClientAbstruct;
  cache: LRUCacheAbstruct;
  individualCache: LRUCacheAbstruct;

  constructor({ httpClient, cache, individualCache }: { httpClient: HTTPClientAbstruct, cache: LRUCacheAbstruct, individualCache: LRUCacheAbstruct }) {
    this.httpClient = httpClient;
    this.cache = cache;
    this.individualCache = individualCache;
  }

  getAll({ page = 1, limit = DEFAULT_LIMIT }: { page: ?number, limit: ?number } = {}): Promise<Array<BlogPost>> {
    const cached = this.cache.get(`${limit}*${page}`);

    if (cached !== undefined) return Promise.resolve(cached);

    return this.httpClient.get('/v0.1/posts', {
      params: {
        include: 'tags',
        page,
        limit,
      },
    })
      .then(res => {
        const blogPosts = res.data.posts
          .map(item => Object.assign({}, item, {
            image: url.resolve(this.httpClient.defaults.baseURL, item.image),
          }))
          .map(item => BlogPost.fromGhostAPI(item));

        this.cache.set(`${limit}*${page}`, blogPosts);

        for (const blogPost of blogPosts) {
          this.individualCache.set(blogPost.slug, blogPost);
        }

        return blogPosts;
      });
  }

  getBySlug(slug: string): Promise<?BlogPost> {
    const cached = this.individualCache.get(slug);

    if (cached !== undefined) return Promise.resolve(cached);

    return this.httpClient.get(`/v0.1/posts/slug/${slug}`, {
      params: { include: 'tags' },
    })
      .then(res => {
        if (res.data.posts.length === 0) return null;

        const item = res.data.posts[0];
        const blogPost = BlogPost.fromGhostAPI(Object.assign({}, item, {
          image: url.resolve(this.httpClient.defaults.baseURL, item.image),
        }));

        this.individualCache.set(slug, blogPost);

        return blogPost;
      });
  }
}

export default BlogPostsRepository;
