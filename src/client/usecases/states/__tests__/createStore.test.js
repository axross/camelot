import test from 'ava';
import createStore from '../createStore';

test('createStore() returns a Store', t => {
  t.plan(4);

  const store = createStore({});

  t.true(typeof store.getState === 'function');
  t.true(typeof store.dispatch === 'function');
  t.true(typeof store.subscribe === 'function');
  t.true(typeof store.replaceReducer === 'function');
});

test('createStore(initialState) returns that initial state has been set', t => {
  t.plan(1);

  const store = createStore({
    example: 4,
  });

  t.is(store.getState().example, 4);
});
