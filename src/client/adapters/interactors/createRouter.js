/* @flow */
import React from 'react';
import { IndexRedirect, Route, Router } from 'react-router';
import { connect } from 'react-redux';

import NotFoundRoute from './routes/NotFoundRoute';
import ListPostsRoute from './routes/ListPostsRoute';

import Root from './Root';

const createRouter = (history: Object): Object => {
  const connected = {
    Root: connect(state => ({
      example: state.example,
    }))(Root),
  };

  return (
    <Router
      history={history}
    >
      <Route
        component={connected.Root}
        path="/"
      >
        <IndexRedirect to="/posts" />

        <Route
          component={ListPostsRoute}
          path="/posts"
        />

        <Route
          component={NotFoundRoute}
          path="/*"
        />
      </Route>
    </Router>
  );
};

export default createRouter;
