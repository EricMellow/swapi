import React from 'react';
import './Favorites.css';

const Favorites = ({ favorites, toggleFavorite }) => {
  let favoriteCards = [];
  if (favorites) {
    favoriteCards = favorites.map((favorite, index) => {
      let switchCase = favorite.type;
      console.log(switchCase)
      if (switchCase === 'ship') {
        switchCase = (
          <div key={favorite.name + index} className="card">
            <h3>{favorite.name}</h3>
            <button className="fav" onClick={() => toggleFavorite(favorite)}></button>
            <p>Model: {favorite.model}</p>
            <p>Hyperdrive Rating: {favorite.hyperdriveRating}</p>
            <p>Number of Passengers: {favorite.numOfPassengers}</p>
          </div>
        );
      } 
      if (switchCase === 'planet') {
        switchCase = (
          <div key={favorite.name + index} className="card">
            <h3>{favorite.name}</h3>
            <button className="fav" onClick={() => toggleFavorite(favorite)}></button>
            <p>Terrain: {favorite.terrain}</p>
            <p>Climate: {favorite.climate}</p>
            <p>Population: {favorite.population}</p>
            <p>Residents: {favorite.residents}</p>
          </div>
        );
      } 
      if (switchCase === 'vehicle') {
        switchCase = (
          <div key={favorite.name + index} className="card">
            <h3>{favorite.name}</h3>
            <button className="fav" onClick={() => toggleFavorite(favorite)}></button>
            <p>Model: {favorite.model}</p>
            <p>Class: {favorite.vehicleClass}</p>
            <p>Number of Passengers: {favorite.numOfPassengers}</p>
          </div>
        );
      } 
      if (switchCase === 'person') {
        switchCase = (
          <div key={favorite.name + index} className="card">
            <h3>{favorite.name}</h3>
            <button className="fav" onClick={() => toggleFavorite(favorite)}></button>
            <p>Species: {favorite.species}</p>
            <p>Homeworld: {favorite.homeworld}</p>
            <p>Homeworld Population: {favorite.population}</p>
          </div>
        );
      }
      return switchCase;
    });
  }

  return (
    <div className="container">
      {favoriteCards.length === 0 && <div className="wait">Access code YT-1300. No favorites found.</div>}
      {favoriteCards.length > 0 && favoriteCards}
    </div>
  );
};

export default Favorites;