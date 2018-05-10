import React from 'react';
import './People.css';

const People = ({cardData}) => {
  let peopleCards = [];
  if (cardData){
    peopleCards = cardData.map((person, index) => {
      return (
        <div key={person.name + index}>
          <h3>{person.name}</h3>
          <p>Species: {person.species}</p>
          <p>Homeworld: {person.homeworld}</p>
          <p>Homeworld Pop.: {person.population}</p>
        </div>
      )
    })

  }

  return (
    <div>
      {peopleCards.length > 1 && peopleCards}
    </div>
  );
};

export default People;