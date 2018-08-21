import React from 'react';
import PropTypes from 'prop-types';
import Style from './style.css';

const Button = ({ btnModal, onClick, children }) => (
  <button
    type="submit"
    className={btnModal ? Style.btnModal : Style.button}
    onClick={onClick}
  >
    {children}
  </button>
);

Button.propTypes = {
  btnModal: PropTypes.bool,
  onClick: PropTypes.func,
  children: PropTypes.element.isRequired,
};

Button.defaultProps = {
  btnModal: false,
  onClick: () => null,
};

export default Button;
