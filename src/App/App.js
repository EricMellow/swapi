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
    if (!this.state.crawlData.length) {
      this.getCrawl();
    }
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
    const peopleWithHomeworldData = await this.getHomeworld(cleanedPeopleData);
    const people = await this.getSpecies(peopleWithHomeworldData);
    await this.setState( { people } );
  }

  getSpecies = (species) => {
    const speciesInfo = species.map(async genus => {
      const url = genus.species;
      const response = await fetch(url);
      const species = await response.json();
      return {...genus, species: species.name};
    });
    return Promise.all(speciesInfo);
  }

  getHomeworld = (people) => {
    const homeworldInfo = people.map(async person => {
      const url = person.homeworld;
      const response = await fetch(url);
      const homeworld = await response.json();
      return {...person, homeworld: homeworld.name, population: homeworld.population}
    });
    return Promise.all(homeworldInfo);
  }

  getPlanets = async () => {
    const response = await fetch('https://swapi.co/api/planets');
    const planetData = await response.json();
    const cleanedPlanetData = planetsCleaner(planetData);
    const planets = await this.getResidents(cleanedPlanetData);
    this.setState( { planets } );
  }

  getResidents = (planetData) => {
    const residentsInfo = planetData.map(async planet => {
      let residentNames = await this.fetchResidents(planet.residents);
      return {...planet, residents: residentNames};
    });
    return Promise.all(residentsInfo);
  }

  fetchResidents = (residents) => {
    const names = residents.map(async resident => {
      const response = await fetch(resident);
      const residentData = await response.json();
      return residentData.name;
    });
    return Promise.all(names);
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
          <button className="favorites-btn">View Favorites {this.state.favorites.length}</button>
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
