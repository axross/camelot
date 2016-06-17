/* @flow */
import bemmer from 'bemmer';
import React from 'react';

import AuthorProfile from './components/AuthorProfile';

const Root = (props: Object) => {
  const b = bemmer.createBuilder('root');

  return (
    <div className={b()}>
      <AuthorProfile className={b('__author')} />

      <div className={b('__wrapped')}>
        {props.children}
      </div>
    </div>
  );
};

export default Root;
