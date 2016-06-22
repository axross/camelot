/* @flow */
import BlogPost from '../../../entities/BlogPost';

class BlogPostsRepository {
  graphqlClient: any;

  constructor(graphqlClient: any) {
    this.graphqlClient = graphqlClient;
  }

  getAll(): Promise<BlogPost> {
    return this.graphqlClient.query(`
      {
        blogPosts {
          id
          slug
          title
          markdown
          thumbnailImageURL
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
      .then(({ blogPosts }) => blogPosts.map(item => BlogPost.fromJSON(item)))
      .catch(err => console.error(err));
  }

  getBySlug(slug: string): Promise<BlogPost> {
    return this.graphqlClient.query(`
      {
        blogPosts(slug: "${slug}") {
          id
          slug
          title
          markdown
          thumbnailImageURL
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
      .then(({ blogPosts }) => {
        if (blogPosts.length === 0) return null;

        return BlogPost.fromJSON(blogPosts[0]);
      })
      .catch(err => console.error(err));
  }
}

export default BlogPostsRepository;
