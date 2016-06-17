import {
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';

const TagType = new GraphQLObjectType({
  name: 'Tag',
  description: 'A tag of blog posts or pages.',
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLInt),
    },
    slug: {
      type: new GraphQLNonNull(GraphQLString),
    },
    name: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
});

export default TagType;
