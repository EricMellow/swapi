import React from 'react';
import Button from '../Button/Button.js';
import './ButtonContainer.css'

const ButtonContainer = (props) => {
  return (
    <div className='btn-container'>
      <Button 
        name={'People'}
        callFunction={1}
      />
      <Button
        name={'Planets'}
        callFunction={1}
      />
      <Button
        name={'Starships'}
        callFunction={1}
      />
      <Button
        name={'Vehicles'}
        callFunction={1}
      />
    </div>
);
};

export default ButtonContainer;