/* @flow */
import Post from '../../../entities/BlogPost';

class BlogPostsRepository {
  graphqlClient: any;

  constructor(graphqlClient: any) {
    this.graphqlClient = graphqlClient;
  }

  fetchAll() {
    this.graphqlClient.query(`
      {
        posts {
          id
          slug
          title
          markdown
          thumbnailImageUrl
          isFeatured
          publishedAt
          tags {
            id
            slug
            name
          }
        }
      }
    `)
      .then(result => {
        console.log(result);

        const posts = result.posts.map(item => Post.fromJSON(item));
      })
      .catch(err => {
        console.error(err);
      });
  }
}

export default BlogPostsRepository;
