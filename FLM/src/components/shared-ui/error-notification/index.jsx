import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../../svg';
import Icons from '../../svg/icons';
import Style from './style.css';

const ErrorNotification = ({ message, children }) => (
  <div className={Style.container}>
    <Icon icon={Icons.ERROR} />
    <h3 className={Style.text}>{message}</h3>
    {children}
  </div>
);

ErrorNotification.propTypes = {
  message: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default ErrorNotification;
