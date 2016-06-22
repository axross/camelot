import bemmer from 'bemmer';
import React from 'react';

type Props = {
  className: ?string,
  columns: number,
  children: Array<React.Component>;
}

const GridBox = (props: Props) => {
  const b = bemmer.createBuilder('gridBox', props.className);
  const items = props.children.map((child, i) => (
    <div
      className={b('__inner__item', { [`${props.columns}col`]: true })}
      key={i}
    >
      {child}
    </div>
  ));

  return (
    <div className={b()}>
      <div className={b('__inner')}>
        {items}
      </div>
    </div>
  );
};

GridBox.defaultProps = {
  columns: 2,
};

export default GridBox;
