import React from 'react';
import PropTypes from 'prop-types';
import Style from './style.css';

const Icon = ({ icon }) => (
  <svg className={Style.svg} viewBox="0 0 24 24">
    <path d={icon} />
  </svg>
);

Icon.propTypes = {
  icon: PropTypes.string.isRequired,
};

export default Icon;
