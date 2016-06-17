/* @flow */
import { Lokka } from 'lokka';
import { Transport } from 'lokka-transport-http';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { browserHistory } from 'react-router';
import withScroll from 'scroll-behavior';

import createStore from './usecases/states/createStore';
import createRouter from './adapters/interactors/createRouter';

import createContextInjector from './utilities/createContextInjector';
// import bindDispatch from './usecases/states/bindDispatch';
import BlogPostsRepository from './usecases/repositories/BlogPostsRepository';

const graphqlClient = new Lokka({
  transport: new Transport('/graphql'),
});

const store = createStore({});

const blogPostsRepository = new BlogPostsRepository(graphqlClient);

const diContainer = {
  blogPostsRepository,
};
const ContextInjector = createContextInjector(diContainer);
const history = withScroll(browserHistory);
const router = createRouter(history);

window.document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <ContextInjector>
      <Provider store={store}>
        {router}
      </Provider>
    </ContextInjector>,
    window.document.getElementById('app')
  );
});
