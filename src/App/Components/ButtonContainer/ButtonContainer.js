import React from 'react';
import Button from '../Button/Button.js';
import './ButtonContainer.css'

const ButtonContainer = ({getPeople, getPlanets}) => {
  return (
    <div className='btn-container'>
      <Button 
        name={'People'}
        handleButtonClick={getPeople}
      />
      <Button
        name={'Planets'}
        handleButtonClick={getPlanets}
      />
      <Button
        name={'Starships'}
        handleButtonClick={1}
      />
      <Button
        name={'Vehicles'}
        handleButtonClick={1}
      />
    </div>
);
};

export default ButtonContainer;