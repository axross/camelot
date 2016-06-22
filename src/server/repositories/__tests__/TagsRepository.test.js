/* @flow */
import test from 'ava';
import createLRU from 'lru-cache';
import TagsRepository from '../TagsRepository';
import {
  MOCK_GHOST_API_JSON_1,
  MOCK_GHOST_API_JSON_2,
  MOCK_GHOST_API_JSON_3,
} from '../../../entities/mocks/tagMocks';

const GET_ALL_MOCK_RESPONSE = {
  status: 200,
  data: {
    tags: [
      MOCK_GHOST_API_JSON_1,
      MOCK_GHOST_API_JSON_2,
      MOCK_GHOST_API_JSON_3,
    ],
  },
};

test('#getAll() calls Ghost Web API properly', t => {
  t.plan(2);

  const tagsRepository = new TagsRepository({
    httpClient: {
      get: (url, params) => {
        t.is(url, '/v0.1/tags');
        t.deepEqual(params);

        return Promise.resolve(GET_ALL_MOCK_RESPONSE);
      },
    },
    cache: createLRU(),
  });

  tagsRepository.getAll()
    .then(() => {});
});

test.cb('#getAll() returns a value from the cache when each a second time', t => {
  t.plan(1);

  let phase = 0;

  const tagsRepository = new TagsRepository({
    httpClient: {
      get: () => {
        if (phase === 1) t.pass();
        if (phase === 2) t.fail();
        if (phase === 3) t.fail();

        return Promise.resolve(GET_ALL_MOCK_RESPONSE);
      },
    },
    cache: createLRU(),
  });

  ++phase;

  tagsRepository.getAll()
    .then(() => {
      ++phase;

      return tagsRepository.getAll();
    })
    .then(() => {
      ++phase;

      return tagsRepository.getAll();
    })
    .then(() => { t.end(); });
});
