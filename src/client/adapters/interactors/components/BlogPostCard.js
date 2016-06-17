import bemmer from 'bemmer';
import React from 'react';

import BlogPost from '../../../../entities/BlogPost';
import RatioFixedPicture from './RatioFixedPicture';

const BlogPostCard = props => {
  const b = bemmer.createBuilder('blogPostCard', props.className);

  return (
    <div className={b()}>
      <div className={b('__inner')}>
        <RatioFixedPicture
          className={b('__inner__thumbnail')}
          src={props.blogPost.thumbnailImageURL}
          ratio={[8, 5]}
        />
      </div>
    </div>
  );
};

BlogPostCard.propTypes = {
  className: React.PropTypes.string,
  blogPost: React.PropTypes.instanceOf(BlogPost).isRequired,
};

export default BlogPostCard;
