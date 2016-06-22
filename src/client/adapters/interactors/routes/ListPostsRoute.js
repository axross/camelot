/* @flow */
import bemmer from 'bemmer';
import React from 'react';
import { Link } from 'react-router';
import BlogPost from '../../../../entities/BlogPost';
import BlogPostCard from '../components/BlogPostCard';
import GridBox from '../components/GridBox';

type Props = {
  className: ?string;
}

class ListPostsRoute extends React.Component {
  constructor(props: Props) {
    super(props);

    this.state = {
      blogPosts: [],
    };
  }

  state: {
    blogPosts: Array<BlogPost>;
  };

  componentDidMount() {
    this.context.blogPostsRepository.getAll()
      .then(blogPosts => {
        this.setState({
          blogPosts,
        });
      });
  }

  render() {
    const b = bemmer.createBuilder('listPostsRoute', this.props.className);

    const blogPostCards = this.state.blogPosts.concat(this.state.blogPosts, this.state.blogPosts, this.state.blogPosts, this.state.blogPosts).map(blogPost => (
      <Link
        to={`/posts/${blogPost.slug}`}
        key={blogPost.slug}
      >
        <BlogPostCard
          className={b('__posts__item')}
          blogPost={blogPost}
        />
      </Link>
    ));

    return (
      <div className={b()}>
        <div className={b('__posts')}>
          <GridBox>
            {blogPostCards}
          </GridBox>
        </div>
      </div>
    );
  }
}

ListPostsRoute.contextTypes = {
  blogPostsRepository: React.PropTypes.any,
  router: React.PropTypes.any,
};

export default ListPostsRoute;
