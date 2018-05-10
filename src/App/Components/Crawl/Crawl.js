import React from 'react';
import './Crawl.css';

const Crawl = (props) => {
  console.log(props)
  const {crawlData} = props;
  let randomNumber = Math.floor(Math.random() * ((6 - 0) +1)) + 0;
  return (
    <div>
      <section className="crawl-container">
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
};

export default Crawl;