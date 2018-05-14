import React from 'react';
import './Vehicles.css';
import PropTypes from 'prop-types';

const Vehicle = ({ cardData, toggleFavorite }) => {
  let vehicleCards = [];
  if (cardData) {
    vehicleCards = cardData.map((vehicle, index) => {
      return (
        <div key={vehicle.name + index} className="card">
          <h3>{vehicle.name}</h3>
          <button className="fav" onClick={() => toggleFavorite(vehicle)}></button>
          <p>Model: {vehicle.model}</p>
          <p>Class: {vehicle.vehicleClass}</p>
          <p>Number of Passengers: {vehicle.numOfPassengers}</p>
        </div>
      )
    })

  }

  return (
    <div className="container">
      {vehicleCards.length === 0 && <div className="wait">Access code YT-1300. Retreiving your SWAPIBOX experience. Please Wait.</div>}
      {vehicleCards.length > 1 && vehicleCards}
    </div>
  );
};

Vehicle.propTypes = {
  cardData: PropTypes.array,
  toggleFavorite: PropTypes.func
};

export default Vehicle;