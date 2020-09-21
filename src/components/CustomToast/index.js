import React from 'react';

import cx from 'classnames';
import PropTypes from 'prop-types';
import { ReactComponent as SuccessIcon } from 'resources/images/green-check.svg';
import { ReactComponent as InfoIcon } from 'resources/images/info_icon.svg';
import { ReactComponent as ErrorIcon } from 'resources/images/red-stop.svg';
import { ReactComponent as WarningIcon } from 'resources/images/warning-icon.svg';

import style from './style.module.scss';

const CustomToast = ({ children, appearance, onDismiss, transitionState }) => {
  return (
    <div
      className={cx(style.container, {
        [style.exited]: transitionState === 'exited',
        [style.entering]: transitionState === 'entering',
        [style.entered]: transitionState === 'entered',
        [style.exiting]: transitionState === 'exiting',
      })}
    >
      <div className={style.iconContainer}>
        {appearance === 'success' && (
          <SuccessIcon className={cx(style.statusIcon, style.success)} />
        )}
        {appearance === 'error' && <ErrorIcon className={cx(style.statusIcon, style.error)} />}
        {appearance === 'warning' && (
          <WarningIcon className={cx(style.statusIcon, style.warning)} />
        )}
        {appearance === 'info' && <InfoIcon className={cx(style.statusIcon, style.info)} />}
      </div>
      <div className={style.inner}>{children}</div>
      <div className={cx(style.closeContainer)} onClick={onDismiss}>
        &times;
      </div>
    </div>
  );
};

CustomToast.propTypes = {
  appearance: PropTypes.string,
  onDismiss: PropTypes.func,
  transitionState: PropTypes.string,
};

export default CustomToast;
