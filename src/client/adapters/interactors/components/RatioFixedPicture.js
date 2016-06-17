/* @flow */
import bemmer from 'bemmer';
import React from 'react';

const RatioFixedPicture = (props: Object) => {
  const b = bemmer.createBuilder('ratioFixedPicture', props.className);
  const style = {
    paddingTop: `${100 / props.ratio[0] * props.ratio[1]}%`,
    backgroundImage: `url(${props.src})`,
  };

  return (
    <div className={b()}>
      <div
        className={b('__inner')}
        style={style}
      />
    </div>
  );
};

RatioFixedPicture.propTypes = {
  className: React.PropTypes.string,
  ratio: React.PropTypes.arrayOf(
    React.PropTypes.number
  ).isRequired,
  src: React.PropTypes.string.isRequired,
};

export default RatioFixedPicture;
