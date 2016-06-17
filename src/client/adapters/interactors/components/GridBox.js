import bemmer from 'bemmer';
import React from 'react';

const GridBox = props => {
  const b = bemmer.createBuilder('gridBox', props.className);
  const items = props.children.map(child => (
    <div className={b('__inner__item', { [`${props.columns}col`]: true })}>
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

GridBox.propTypes = {
  className: React.PropTypes.string,
  columns: React.PropTypes.number,
  children: React.PropTypes.arrayOf(React.PropTypes.element).isRequired,
};

GridBox.defaultProps = {
  columns: 2,
};
