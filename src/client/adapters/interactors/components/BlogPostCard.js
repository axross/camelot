import bemmer from 'bemmer';
import React from 'react';

import BlogPost from '../../../../entities/BlogPost';
import RatioFixedPicture from './RatioFixedPicture';

type Props = {
  className: ?string;
  blogPost: BlogPost;
};

const BlogPostCard = (props: Props) => {
  const b = bemmer.createBuilder('blogPostCard', props.className);

  return (
    <article className={b()}>
      <div className={b('__inner')}>
        <RatioFixedPicture
          className={b('__inner__thumbnail')}
          src={props.blogPost.thumbnailImageURL}
          ratio={[2, 1]}
        />

        <h1 className={b('__inner__title')}>
          {props.blogPost.title}
        </h1>

        <div className={b('__inner__publishedAt')}>
          {props.blogPost.publishedAt.fromNow()}
        </div>
      </div>
    </article>
  );
};

export default BlogPostCard;
