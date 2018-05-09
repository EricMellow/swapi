import React from 'react';
import Button from '../Button/Button.js';
import './ButtonContainer.css'

const ButtonContainer = ({getPeople, getPlanets, getStarships}) => {
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
        handleButtonClick={getStarships}
      />
      <Button
        name={'Vehicles'}
        handleButtonClick={1}
      />
    </div>
);
};

export default ButtonContainer;