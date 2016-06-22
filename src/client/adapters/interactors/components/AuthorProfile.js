import bemmer from 'bemmer';
import React from 'react';

type Props = {
  className: ?string;
};

const AuthorProfile = (props: Props) => {
  const b = bemmer.createBuilder('authorProfile', props.className);

  return (
    <div className={b()}>
      <div className={b('__inner')}>
        <div className={b('__inner__image')} />

        <div className={b('__inner__name')}>
          Kohei Asai
        </div>

        <div className={b('__inner__screenname')}>
          @axross
        </div>

        <div className={b('__inner__bio')}>
          Web Application Developer.<br />
          I into React, Flowtype, Query Language,<br />
          Application Architecture and Texas Hold'em.
        </div>
      </div>
    </div>
  );
};

export default AuthorProfile;
