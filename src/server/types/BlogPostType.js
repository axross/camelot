import {
  GraphQLBoolean,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';

import DatetimeType from './DatetimeType';
import TagType from './TagType';

const BlogPostType = new GraphQLObjectType({
  name: 'Post',
  description: 'A Blog Post.',
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLInt),
      description: 'An Unique Identifier.',
    },
    slug: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'An Unique Identifier for an URL.',
    },
    title: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'A BlogPost Title.',
    },
    markdown: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'A Body form of Markdown.',
    },
    thumbnailImageUrl: {
      type: GraphQLString,
      description: 'An URL of Thumbnail Image.',
    },
    isFeatured: {
      type: new GraphQLNonNull(GraphQLBoolean),
      description: 'A Flag represents the Post is featured.',
    },
    publishedAt: {
      type: new GraphQLNonNull(DatetimeType),
      description: 'Publish Date.',
    },
    tags: {
      type: new GraphQLList(TagType),
    },
  },
});

export default BlogPostType;
