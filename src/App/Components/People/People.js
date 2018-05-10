import React from 'react';
import './People.css';

const People = ({cardData}) => {
  let peopleCards = [];
  if (cardData){
    peopleCards = cardData.map((person, index) => {
      return (
        <div key={person.name + index} className="card">
          <h3>{person.name}</h3>
          <p>Species: {person.species}</p>
          <p>Homeworld: {person.homeworld}</p>
          <p>Homeworld Population: {person.population}</p>
        </div>
      )
    })

  }

  return (
    <div className="container">
      {peopleCards.length > 1 && peopleCards}
    </div>
  );
};

export default People;