/* @flow */
import { createStore, combineReducers } from 'redux';
import exampleReducer from './reducers/exampleReducer';

const reducers = {
  example: exampleReducer,
};

const create = (initialState: Object): Object => {
  const combined = combineReducers(reducers);

  return createStore(combined, initialState);
};

export default create;
