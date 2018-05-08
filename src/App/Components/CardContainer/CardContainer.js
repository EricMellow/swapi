import React from 'react';
import './CardContainer.css';

const CardContainer = (props) => {
  const {crawlData, people, planets} = props;
  if (!people.length && !planets.length) {
    let randomNumber = Math.floor(Math.random() * ((6 - 0) +1)) + 0;
    return (
      <div>
        <div className="fade"></div>
        <section className="star-wars">
          <div className="crawl">
            <div className="title">
              <h1>Episode {crawlData[randomNumber].episode}</h1>
              <h1>{crawlData[randomNumber].title}</h1>
            </div>
            <p>{crawlData[randomNumber].crawl}</p>
            <p>Released {crawlData[randomNumber].release}</p>
          </div>
        </section>
      </div>
    );
  }
};

export default CardContainer;