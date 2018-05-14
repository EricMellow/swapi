import React from 'react';
import './ButtonContainer.css';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

const ButtonContainer = ({getPeople, getPlanets, getStarships, getVehicles}) => {
  return (
    <div className='btn-container'>
      <NavLink 
        to='/people' 
        className="button" 
        onClick={() => getPeople()}
      >People</NavLink>
      <NavLink 
        to='/planets' 
        className="button" 
        onClick={() => getPlanets()}
      >Planets</NavLink>
      <NavLink 
        to='/vehicles' 
        className="button" 
        onClick={() => getVehicles()}
      >Vehicles</NavLink>
      <NavLink 
        to='/starships' 
        className="button" 
        onClick={() => getStarships()}
      >Starships</NavLink>
    </div>
  );
};

ButtonContainer.propTypes = {
  getPeople: PropTypes.func,
  getPlanets: PropTypes.func,
  getStarships: PropTypes.func,
  getVehicles: PropTypes.func
};

export default ButtonContainer;