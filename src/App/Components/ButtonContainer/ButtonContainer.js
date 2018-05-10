import React from 'react';
import Button from '../Button/Button.js';
import './ButtonContainer.css';
import { NavLink, Route } from 'react-router-dom';

const ButtonContainer = ({getPeople, getPlanets, getStarships, getVehicles}) => {
  return (
    <div className='btn-container'>
      <NavLink to='/people' className="button" onClick={() => getPeople()}>People</NavLink>
      <NavLink to='/planets' className="button">Planets</NavLink>
      <NavLink to='/vehicles' className="button">Vehicles</NavLink>
      <NavLink to='/starships' className="button">Starships</NavLink>
    </div>
  );
};

export default ButtonContainer;