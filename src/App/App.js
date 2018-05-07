import React, { Component } from 'react';
import './App.css';
import Button from './Components/Button/index.js';

class App extends Component {
  constructor() {
    super(); 
    this.state = {
      crawlData: []
    };
  }
  
  componentDidMount() {
    this.getCrawl();
  }
  
  catchError = () => {

  }

  getCrawl = () => {
    fetch('https://swapi.co/api/films')
      .then((response) => {
        response.json()
          .then((crawlData) => {
            this.setState({
              crawlData: this.crawlCleaner(crawlData)
            });
          }).catch(error => {
            this.catchError();
          });
      });
  }

crawlCleaner = (apiData) => {
  const crawls = apiData.results.map(film => film.opening_crawl)
  return crawls;
}

render() {
  return (
    <div className="background">
      <header className="App-header">
        <h1 className="App-title">SWAPI UNIVERSE</h1>
        <button></button>
      </header>
      <p className="App-intro">
        To get started, edit <code>src/App.js</code> and save to reload.
      </p>
    </div>
  );
}
}

export default App;
