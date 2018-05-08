import React, { Component } from 'react';
import './App.css';
import { peopleCleaner, planetsCleaner, filmsCleaner, shipsCleaner, vehiclesCleaner } from '../cleaners.js';
import ButtonContainer from './Components/ButtonContainer/ButtonContainer.js';
import CardContainer from './Components/CardContainer/CardContainer.js';

class App extends Component {
  constructor() {
    super(); 
    this.state = {
      crawlData: [],
      people: [],
      planets: [],
      starships: [],
      favorites: []
    };
  }
  
  componentDidMount() {
    this.getCrawl();
  }

  getCrawl = async () => {
    const response = await fetch('https://swapi.co/api/films');
    const crawlData = await response.json();
    this.setState({
      crawlData: filmsCleaner(crawlData)
    });
  };


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
          <button>View Favorites {this.state.favorites.length}</button>
        </header>
        <ButtonContainer />
        <CardContainer 
          crawlData={this.state.crawlData}
          people={this.state.people} 
          planets={this.state.planets}/>
      </div>
    );
  }
}

export default App;
