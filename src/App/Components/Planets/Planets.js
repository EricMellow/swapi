import React from 'react';
import './Planets.css';

const Planets = ({cardData}) => {
  let planetCards = [];
  if (cardData) {
    planetCards = cardData.map((planet, index) => {
      return (
        <div key={planet.name + index} className="card">
          <h3>{planet.name}</h3>
          <button className="fav"></button>
          <p>Terrain: {planet.terrain}</p>
          <p>Climate: {planet.climate}</p>
          <p>Population: {planet.population}</p>
          <p>Residents: {planet.residents}</p>
        </div>
      );
    });

  }

  return (
    <div className="container">
      {planetCards.length === 0 && <div className="wait">Access code YT-1300. Retreiving your SWAPIBOX experience. Please Wait.</div>}
      {planetCards.length > 1 && planetCards}
    </div>
  );
};

export default Planets;