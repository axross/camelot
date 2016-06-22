import test from 'ava';
import React from 'react';
import { render } from 'enzyme';
import createContextInjector from '../createContextInjector';

test.cb('createContextInjector(diContainer) returns ContextInjector applied diContainer as context', t => {
  t.plan(3);

  const BAR = Symbol('BAR');
  const mockFunc = () => {};
  const ContextInjector = createContextInjector({
    foo: 'yeah',
    bar: BAR,
    baz: mockFunc,
  });

  class SomeComponent extends React.Component {
    constructor(props, context) {
      super(props, context);
    }

    render() {
      t.is(this.context.foo, 'yeah');
      t.is(this.context.bar, BAR);
      t.is(this.context.baz, mockFunc);
      t.end();

      return null;
    }
  }

  SomeComponent.contextTypes = {
    foo: React.PropTypes.any,
    bar: React.PropTypes.any,
    baz: React.PropTypes.any,
  };

  render(
    <ContextInjector>
      <SomeComponent />
    </ContextInjector>
  );
});
