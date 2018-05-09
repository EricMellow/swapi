import React from 'react';
import './Button.css';


const Button = ({name, handleButtonClick}) => {
  return (
    <button onClick={handleButtonClick}>{name}</button>
  );
};

export default Button;