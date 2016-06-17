/* @flow */
import assert from 'assert';

type TagParams = {
  id: number;
  slug: string;
  name: string;
}

class Tag {
  id: number;
  slug: string;
  name: string;

  constructor(params: TagParams) {
    this.id = params.id;
    this.slug = params.slug;
    this.name = params.name;
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
      typeof obj.name === 'string',
      'must be name is a string'
    );
  }

  static fromGhostAPI(obj: Object): Tag {
    Tag.validateJSON(obj);

    return new Tag(obj);
  }

  static fromJSON(obj: Object): Tag {
    Tag.validateJSON(obj);

    return new Tag(obj);
  }
}

export default Tag;
