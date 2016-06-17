/* @flow */
import type {
  HTTPClientAbstruct,
  LRUCacheAbstruct,
} from '../../types';
import Tag from '../../entities/Tag';

type TagsRepositoryParams = {
  httpClient: HTTPClientAbstruct;
  cache: LRUCacheAbstruct;
};

class TagsRepository {
  httpClient: HTTPClientAbstruct;
  cache: LRUCacheAbstruct;

  constructor({ httpClient, cache }: TagsRepositoryParams) {
    this.httpClient = httpClient;
    this.cache = cache;
  }

  getAll(): Promise<Array<Tag>> {
    const cached = this.cache.get('*');

    if (cached !== undefined) return Promise.resolve(cached);

    return this.httpClient.get('/v0.1/tags')
      .then(res => res.data.tags.map(item => {
        const tags = Tag.fromGhostAPI(item);

        this.cache.set('*', tags);

        return tags;
      }));
  }
}

export default TagsRepository;
