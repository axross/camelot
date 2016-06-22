/* @flow */
import bemmer from 'bemmer';
import React from 'react';

type Props = {
  className: ?string;
  ratio: [number, number];
  src: string;
}

const RatioFixedPicture = (props: Props) => {
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

export default RatioFixedPicture;
