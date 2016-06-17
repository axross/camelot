/* @flow */
import {
  GraphQLInt,
  GraphQLList,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from 'graphql';
import BlogPostType from './types/BlogPostType';
import TagType from './types/TagType';

const Schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: {
      blogPosts: {
        type: new GraphQLList(BlogPostType),
        args: {
          slug: {
            type: GraphQLString,
          },
          page: {
            type: GraphQLInt,
          },
          limit: {
            type: GraphQLInt,
          },
        },
        resolve(di, args) {
          if (args.slug) {
            return di.blogPostsRepository.getBySlug(args.slug)
              .then(post => {
                if (post === null) return [];

                return [post];
              });
          }

          return di.blogPostsRepository.getAll({
            page: args.page,
            limit: args.limit,
          });
        },
      },
      tags: {
        type: new GraphQLList(TagType),
        resolve(di, args) {
          if (args.slug) {
            return di.tagsRepository.getBySlug(args.slug)
            .then(tag => {
              if (tag === null) return [];

              return [tag];
            });
          }

          return di.tagsRepository.getAll();
        },
      },
    },
  }),
});

export default Schema;
