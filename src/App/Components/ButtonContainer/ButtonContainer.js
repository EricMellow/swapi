import React from 'react';
import Button from '../Button/Button.js';
import './ButtonContainer.css'

const ButtonContainer = ({getPeople, getPlanets, getStarships, getVehicles}) => {
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
        handleButtonClick={getVehicles}
      />
    </div>
);
};

export default ButtonContainer;