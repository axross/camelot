import Tag from '../Tag';

export const MOCK_JSON_1 = {
  id: 1,
  slug: 'yeeeeeah',
  name: 'Yeeeeeah',
};

export const MOCK_JSON_2 = {
  id: 2,
  slug: 'fuuuuuck',
  name: 'Fuuuuuck',
};

export const MOCK_JSON_3 = {
  id: 3,
  slug: 'nice-catch',
  name: 'Nice Catch',
};

export const MOCK_GHOST_API_JSON_1 = MOCK_JSON_1;
export const MOCK_GHOST_API_JSON_2 = MOCK_JSON_2;
export const MOCK_GHOST_API_JSON_3 = MOCK_JSON_3;

export const MOCK_1 = Tag.fromJSON(MOCK_JSON_1);
export const MOCK_2 = Tag.fromJSON(MOCK_JSON_2);
export const MOCK_3 = Tag.fromJSON(MOCK_JSON_3);
