import BlogPost from '../BlogPost';
import {
  MOCK_JSON_1 as TAG_MOCK_JSON_1,
  MOCK_JSON_2 as TAG_MOCK_JSON_2,
  MOCK_JSON_3 as TAG_MOCK_JSON_3,
} from './tagMocks';

export const MOCK_JSON_1 = {
  id: 1,
  slug: 'lorem-ipsum',
  title: 'Lorem Ipsum',
  markdown: 'Lorem Ipsum',
  thumbnailImageUrl: 'http://i.imgur.com/RR0nk2L.jpg',
  isFeatured: false,
  publishedAt: '2016-06-17T12:34:56.789Z',
  tags: [
    TAG_MOCK_JSON_1,
    TAG_MOCK_JSON_2,
  ],
};

export const MOCK_JSON_2 = {
  id: 2,
  slug: 'dolor-sit-amet',
  title: 'Dolor sit amet',
  markdown: 'Dolor sit amet',
  thumbnailImageUrl: 'http://i.imgur.com/PeE9fKb.gif',
  isFeatured: true,
  publishedAt: '2016-06-19T12:34:56.789Z',
  tags: [
    TAG_MOCK_JSON_1,
    TAG_MOCK_JSON_3,
  ],
};

export const MOCK_JSON_3 = {
  id: 1,
  slug: 'consectetur-adipiscing',
  title: 'Consectetur adipiscing',
  markdown: 'Consectetur adipiscing',
  thumbnailImageUrl: 'http://i.imgur.com/FFf191F.gif',
  isFeatured: false,
  publishedAt: '2016-06-21T12:34:56.789Z',
  tags: [
    TAG_MOCK_JSON_2,
    TAG_MOCK_JSON_3,
  ],
};

export const MOCK_GHOST_API_JSON_1 = Object.assign({}, MOCK_JSON_1, {
  image: MOCK_JSON_1.thumbnailImageUrl,
  featured: MOCK_JSON_1.isFeatured,
  published_at: MOCK_JSON_1.publishedAt,
  thumbnailImageUrl: undefined,
  isFeatured: undefined,
  publishedAt: undefined,
});

export const MOCK_GHOST_API_JSON_2 = Object.assign({}, MOCK_JSON_2, {
  image: MOCK_JSON_2.thumbnailImageUrl,
  featured: MOCK_JSON_2.isFeatured,
  published_at: MOCK_JSON_2.publishedAt,
  thumbnailImageUrl: undefined,
  isFeatured: undefined,
  publishedAt: undefined,
});

export const MOCK_GHOST_API_JSON_3 = Object.assign({}, MOCK_JSON_3, {
  image: MOCK_JSON_3.thumbnailImageUrl,
  featured: MOCK_JSON_3.isFeatured,
  published_at: MOCK_JSON_3.publishedAt,
  thumbnailImageUrl: undefined,
  isFeatured: undefined,
  publishedAt: undefined,
});

export const MOCK_1 = BlogPost.fromJSON(MOCK_JSON_1);
export const MOCK_2 = BlogPost.fromJSON(MOCK_JSON_2);
export const MOCK_3 = BlogPost.fromJSON(MOCK_JSON_3);
