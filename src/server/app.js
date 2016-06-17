/* @flow */
import path from 'path';
import Axios from 'axios';
import Boom from 'boom';
import express from 'express';
import graphqlHTTP from 'express-graphql';
import createLRU from 'lru-cache';

import config from './configs/default';
import Schema from './Schema';
import BlogPostsRepository from './repositories/BlogPostsRepository';
import TagsRepository from './repositories/TagsRepository';

import handleForCrawler from './routes/handleForCrawler';

const app = express();
const axios = Axios.create({
  baseURL: 'https://axx.ghost.io/ghost/api',
  params: {
    client_id: 'ghost-frontend',
    client_secret: 'c132b1efbb54',
  },
});

axios.interceptors.response.use(
  (res) => res,
  (res) => Promise.reject(Boom.create(res.status, undefined, res))
);

const diContainer = {
  config,
  blogPostsRepository: new BlogPostsRepository({
    httpClient: axios,
    cache: createLRU({
      max: 20,
      maxAge: 1000 * 60 * 5,
    }),
    individualCache: createLRU({
      max: 50,
      maxAge: 1000 * 60 * 5,
    }),
  }),
  tagsRepository: new TagsRepository({
    httpClient: axios,
    cache: createLRU({
      max: 10,
      maxAge: 1000 * 60 * 5,
    }),
  }),
};

app.locals.di = diContainer;
app.set('views', path.resolve(__dirname, './templates'));
app.set('view engine', 'ejs');
app.use(express.static(path.resolve(__dirname, '../../public')));

app.use('/graphql', graphqlHTTP({
  schema: Schema,
  rootValue: diContainer,
  formatError: err => ({
    message: err.message,
    locations: err.locations,
    stack: err.stack,
  }),
  graphiql: true,
}));

app.get('/posts/:slug', handleForCrawler);

app.use((req, res) => res.render('index', {}));

app.listen(8000);
