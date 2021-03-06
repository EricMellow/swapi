import React from 'react';
import './Crawl.css';
import PropTypes from 'prop-types';

const Crawl = (props) => {
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
          <p className="crawl-text">{crawlData[randomNumber].crawl}</p>
          <p className="crawl-text">Released {crawlData[randomNumber].release}</p>
        </div>
      </section>
    </div>
  );
};

Crawl.propTypes = {
  crawlData: PropTypes.array
};

export default Crawl;