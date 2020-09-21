import React from 'react';

import cx from 'classnames';

import style from './style.module.scss';

const MenuItem = ({ item, isActive = false }) => {
  return (
    <div className={cx(style.menuItem, { [style.active]: isActive })}>
      {item.icon}
      <span>{item.name}</span>
    </div>
  );
};

export default MenuItem;
