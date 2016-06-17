/* @flow */
import React from 'react';

class ListPostsRoute extends React.Component {
  constructor(props: Object) {
    super(props);
  }

  componentDidMount() {
    this.context.postsRepository.fetchAll();
  }

  render() {
    return (
      <div>
        posts!
      </div>
    );
  }
}

ListPostsRoute.contextTypes = {
  postsRepository: React.PropTypes.any,
};

export default ListPostsRoute;
