import React from 'react';
import './Button.css';


const Button = ({name, callFunction}) => {
  return (
    <button>{name}</button>
  );
};

export default Button;