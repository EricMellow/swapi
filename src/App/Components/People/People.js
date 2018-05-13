import React from 'react';
import './People.css';

const People = ({ cardData, toggleFavorite}) => {
  let peopleCards = [];
  if (cardData){
    peopleCards = cardData.map((person, index) => {
      return (
        <div key={person.name + index} className="card">
          <h3>{person.name}</h3>
          <button className="fav" onClick={() => toggleFavorite(person)}></button>
          <p>Species: {person.species}</p>
          <p>Homeworld: {person.homeworld}</p>
          <p>Homeworld Population: {person.population}</p>
        </div>
      );
    });
  }

  return (
    <div className="container">
      {peopleCards.length === 0 && <div className="wait">Access code YT-1300. Retreiving your SWAPIBOX experience. Please Wait.</div>}
      {peopleCards.length > 1 && peopleCards}
    </div>
  );
};

export default People;