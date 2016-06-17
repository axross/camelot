/* @flow */
import React from 'react';

const createContextInjector = (diContainer: Object): any => {
  const childContextTypes = {};
  const childContext = {};

  for (const key of Object.keys(diContainer)) {
    childContextTypes[key] = React.PropTypes.any;
    childContext[key] = diContainer[key];
  }

  class ContextInjector extends React.Component {
    constructor(props: Object) {
      super(props);
    }

    getChildContext() {
      return childContext;
    }

    render() {
      return this.props.children;
    }
  }

  ContextInjector.childContextTypes = childContextTypes;

  return ContextInjector;
};

export default createContextInjector;
