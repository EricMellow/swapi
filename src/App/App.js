import React, { Component } from 'react';
import './App.css';
import Button from './Components/Button/Button.js';
import CardContainer from './Components/CardContainer/CardContainer.js';

class App extends Component {
  constructor() {
    super(); 
    this.state = {
      crawlData: [],
      people: [],
      planets: []
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
  const crawls = apiData.results.map(film => {
    return {title: film.title, episode: film.episode_id, crawl: film.opening_crawl}
  });
  return crawls;
}

render() {
  if (!this.state.crawlData.length) {
    return (
      <p>please wait</p>
    );
  }
  return (
    <div className="background">
      <header className="App-header">
        <h1 className="App-title">SWAPI UNIVERSE</h1>
        <button></button>
      </header>
      <CardContainer 
        crawlData={this.state.crawlData}
        people={this.state.people} 
        planets={this.state.planets}/>
    </div>
  );
}
}

export default App;
