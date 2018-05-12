import React, { Component } from 'react';
import './App.css';
import { peopleCleaner, planetsCleaner, filmsCleaner, shipsCleaner, vehiclesCleaner } from '../cleaners.js';
import ButtonContainer from './Components/ButtonContainer/ButtonContainer.js';
import Crawl from './Components/Crawl/Crawl.js';
import People from './Components/People/People.js';
import Planets from './Components/Planets/Planets.js';
import Vehicles from './Components/Vehicles/Vehicles.js';
import Starships from './Components/Starships/Starships.js';
import { NavLink, Route, Link } from 'react-router-dom';

class App extends Component {
  constructor() {
    super(); 
    this.state = {
      crawlData: [],
      cardData: [],
      favorites: []
    };
  }
  
  componentDidMount() {
    if (!this.state.crawlData.length) {
      this.getCrawl();
    }
  }

  getCrawl = async () => {
    try {
      const response = await fetch('https://swapi.co/api/films');
      if (response.status !== 200) {
        throw new Error('Status Error');
      }
      const crawlData = await response.json();
      this.setState({
        crawlData: filmsCleaner(crawlData)
      });
    }
    catch (error) {
      this.setState({
        crawlData: [{
          crawl: "We're so sorry, but something has gone incredibly wrong and we weren't able to fetch the data. :(",
          episode: 'Oh no!',
          release: "Just now",
          title: "Error"
        }]
      });
    }
  };

  getStarships = async () => {
    try {
      const response = await fetch('https://swapi.co/api/starships');
      if (response.status !== 200) {
        throw new Error('Status Error');
      }
      const starships = await response.json();
      this.setState({
        cardData: shipsCleaner(starships)
      });
    }
    catch (error) {
      this.setState({
        cardData: [{ 
          hyperdriveRating: ":(", 
          model: "Something went wrong", 
          name: "Oh no!", 
          numOfPassengers: "No data" }]
      });
    }
  }

  getVehicles = async () => {
    try {
      const response = await fetch('https://swapi.co/api/vehicles');
      if (response.status !== 200) {
        throw new Error('Status Error');
      }
      const vehicles = await response.json();
      this.setState({
        cardData: vehiclesCleaner(vehicles)
      });
    }
    catch (error){
      this.setState({
        cardData: [{
          model: "Something went wrong",
          name: "Oh no!",
          numOfPassengers: "No data",
          vehicleClass: ":("
        }]
      });
    }
  }

  getPeople = async () => {
    try {
      const response = await fetch('https://swapi.co/api/people');
      if (response.status !== 200) {
        throw new Error('Status Error');
      }
      const peopleData = await response.json();
      const cleanedPeopleData = peopleCleaner(peopleData);
      const peopleWithHomeworldData = await this.getHomeworld(cleanedPeopleData);
      const people = await this.getSpecies(peopleWithHomeworldData);
      this.setState({
        cardData: people
      });
    }
    catch (error) {
      this.setState({
        cardData: [{
          homeworld: ":(",
          name: "Oh no!",
          population: "No data",
          species: "Something went wrong"
        }]
      });
    }
  }

  getSpecies = (species) => {
    try {
      const speciesInfo = species.map(async genus => {
        const url = genus.species;
        const response = await fetch(url);
        if (response.status !== 200) {
          throw new Error('Status Error');
        }
        const species = await response.json();
        return {...genus, species: species.name};
      });
      return Promise.all(speciesInfo);
    }
    catch (error) {
      return {
        homeworld: ":(",
        name: "Oh no!",
        population: "No data",
        species: "Something went wrong"
      };
    }
  }

  getHomeworld = (people) => {
    const homeworldInfo = people.map(async person => {
      const url = person.homeworld;
      const response = await fetch(url);
      const homeworld = await response.json();
      return {...person, homeworld: homeworld.name, population: homeworld.population};
    });
    return Promise.all(homeworldInfo);
  }

  getPlanets = async () => {
    const response = await fetch('https://swapi.co/api/planets');
    const planetData = await response.json();
    const cleanedPlanetData = planetsCleaner(planetData);
    const planets = await this.getResidents(cleanedPlanetData);
    this.setState({
      cardData: planets
    });
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
          <button className="button">View Favorites {this.state.favorites.length}</button>
        </header>
        <ButtonContainer 
          getPeople={this.getPeople}
          getPlanets={this.getPlanets}
          getStarships={this.getStarships}
          getVehicles={this.getVehicles}
        />
        <Route exact path='/' render={ () => (
          <Crawl crawlData={this.state.crawlData} />
        )} />
        <Route exact path='/people' render={ () => {
          return <People cardData={this.state.cardData} />;
        }} />
        <Route exact path='/planets' render={() => {
          return <Planets cardData={this.state.cardData} />;
        }} />
        <Route exact path='/vehicles' render={() => {
          return <Vehicles cardData={this.state.cardData} />;
        }} />
        <Route exact path='/starships' render={() => {
          return <Starships cardData={this.state.cardData} />;
        }} />
      </div>
    );
  }
}

export default App;
