import test from 'ava';
import bindDispatch from '../bindDispatch';

test('bindDispatch() applies a dispatch function to action', t => {
  t.plan(3);

  const mockAction = {
    foo: arg => ({ thisIs: 'foo', arg }),
    bar: arg => ({ thisIs: 'bar', arg }),
    baz: arg => ({ thisIs: 'baz', arg }),
  };
  const mockDispatch = arg => arg;

  const binded = bindDispatch(mockAction, mockDispatch);

  t.deepEqual(binded.foo('qux'), { thisIs: 'foo', arg: 'qux' });
  t.deepEqual(binded.bar('quux'), { thisIs: 'bar', arg: 'quux' });
  t.deepEqual(binded.baz('corge'), { thisIs: 'baz', arg: 'corge' });
});
