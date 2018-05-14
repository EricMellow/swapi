import React from 'react';
import './Starships.css';
import PropTypes from 'prop-types';

const Starships = ({ cardData, toggleFavorite }) => {
  let starshipCards = [];
  if (cardData) {
    starshipCards = cardData.map((starship, index) => {
      return (
        <div key={starship.name + index} className="card">
          <h3>{starship.name}</h3>
          <button className="fav" onClick={() => toggleFavorite(starship)}></button>
          <p>Model: {starship.model}</p>
          <p>Hyperdrive Rating: {starship.hyperdriveRating}</p>
          <p>Number of Passengers: {starship.numOfPassengers}</p>
        </div>
      )
    })

  }

  return (
    <div className="container">
      {starshipCards.length === 0 && <div className="wait">Access code YT-1300. Retreiving your SWAPIBOX experience. Please Wait.</div>}
      {starshipCards.length > 1 && starshipCards}
    </div>
  );
};

Starships.propTypes = {
  cardData: PropTypes.array,
  toggleFavorite: PropTypes.func
};

export default Starships;