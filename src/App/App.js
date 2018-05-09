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

  getPeople = async () => {
    const response = await fetch('https://swapi.co/api/people');
    const peopleData = await response.json();
    const cleanedPeopleData = peopleCleaner(peopleData);
    console.log(cleanedPeopleData);
  }

  getPlanets = async () => {
    const response = await fetch('https://swapi.co/api/planets');
    const planetData = await response.json();
    const cleanedPlanetData = planetsCleaner(planetData);
    const allPlanetsInfo = await this.getResidents(cleanedPlanetData);
    console.log(allPlanetsInfo)
  }

  getResidents = (planetData) => {
    const residentsInfo = planetData.map(planet => {
      // debugger;
      let residentNames = planet.residents.map(resident => {
        let name = this.fetchResident(resident);
        return name;
      })
      // console.log(residentNames)
    return {...planet, residents: residentNames}
    })
    return Promise.all(residentsInfo);
  }

  fetchResident = async (resident) => {
    const response = await fetch(resident);
    const residentData = await response.json();
    // console.log(residentData.name)
    return residentData.name;
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
          <button>View Favorites {this.state.favorites.length}</button>
        </header>
        <ButtonContainer 
          getPeople={this.getPeople}
          getPlanets={this.getPlanets}
        />
        <CardContainer 
          crawlData={this.state.crawlData}
          people={this.state.people} 
          planets={this.state.planets}/>
      </div>
    );
  }
}

export default App;
