/* @flow */
import React from 'react';

class NotFoundRoute extends React.Component {
  render() {
    return (
      <div>
        yayyay

        <span onClick={() => this.context.router.push('/posts')}>
          goto posts
        </span>
      </div>
    );
  }
}

NotFoundRoute.contextTypes = {
  router: React.PropTypes.any,
};

export default NotFoundRoute;
