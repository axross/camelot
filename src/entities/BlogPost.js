/* @flow */
import assert from 'assert';
import moment from 'moment';

import Tag from '../entities/Tag';

type BlogPostParams = {
  id: number;
  slug: string;
  title: string;
  markdown: string;
  thumbnailImageURL: string;
  isFeatured: boolean;
  publishedAt: moment;
  tags: Array<Tag>;
};

class BlogPost {
  id: number;
  slug: string;
  title: string;
  markdown: string;
  thumbnailImageURL: string;
  isFeatured: boolean;
  publishedAt: moment;
  tags: Array<Tag>;

  constructor(params: BlogPostParams) {
    this.id = params.id;
    this.slug = params.slug;
    this.title = params.title;
    this.markdown = params.markdown;
    this.thumbnailImageURL = params.thumbnailImageURL;
    this.isFeatured = params.isFeatured;
    this.publishedAt = params.publishedAt;
    this.tags = params.tags;
  }

  static validateJSON(obj: Object): void {
    assert(
      Number.isSafeInteger(obj.id),
      'must be id is an integer'
    );
    assert(
      typeof obj.slug === 'string',
      'must be slug is a string'
    );
    assert(
      typeof obj.title === 'string',
      'must be title is a string'
    );
    assert(
      typeof obj.markdown === 'string',
      'must be markdown is a string'
    );
    assert(
      typeof obj.thumbnailImageURL === 'string',
      'must be thumbnailImageURL is a string'
    );
    assert(
      typeof obj.isFeatured === 'boolean',
      'must be isFeatured is a boolean'
    );
    assert(
      obj.publishedAt instanceof moment,
      'must be publishedAt is a Moment'
    );
    assert(
      Array.isArray(obj.tags),
      'must be tags is an Array'
    );

    for (const tag of obj.tags) {
      Tag.validateJSON(tag);
    }
  }

  static fromGhostAPI(obj: Object): BlogPost {
    const params = Object.assign({}, obj, {
      thumbnailImageURL: obj.image,
      isFeatured: obj.featured,
      publishedAt: moment(obj.published_at),
      tags: obj.tags.map(item => Tag.fromGhostAPI(item)),
    });

    BlogPost.validateJSON(params);

    return new BlogPost(params);
  }

  static fromJSON(obj: Object): BlogPost {
    const params = Object.assign({}, obj, {
      publishedAt: moment(obj.publishedAt),
      tags: obj.tags.map(item => Tag.fromJSON(item)),
    });

    BlogPost.validateJSON(params);

    return new BlogPost(params);
  }
}

export default BlogPost;
