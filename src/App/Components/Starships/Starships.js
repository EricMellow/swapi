import React from 'react';
import './Starships.css';

const Starships = ({cardData}) => {
  let starshipCards = [];
  if (cardData) {
    starshipCards = cardData.map((starship, index) => {
      return (
        <div key={starship.name + index} className="card">
          <h3>{starship.name}</h3>
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

export default Starships;