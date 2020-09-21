import React from 'react';

import cx from 'classnames';

import styles from './style.module.scss';

const Card = ({ children, className }) => {
  return <div className={cx(styles.container, className)}>{children}</div>;
};

export default Card;
