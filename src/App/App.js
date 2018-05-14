import React, { Component } from 'react';
import './App.css';
import { 
  peopleCleaner, 
  planetsCleaner, 
  filmsCleaner, 
  shipsCleaner, 
  vehiclesCleaner } 
  from '../cleaners.js';
import ButtonContainer from './Components/ButtonContainer/ButtonContainer.js';
import Crawl from './Components/Crawl/Crawl.js';
import People from './Components/People/People.js';
import Planets from './Components/Planets/Planets.js';
import Vehicles from './Components/Vehicles/Vehicles.js';
import Starships from './Components/Starships/Starships.js';
import Favorites from './Components/Favorites/Favorites.js';
import { NavLink, Route } from 'react-router-dom';

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

  clearData() {
    this.setState({
      cardData: []
    });
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
    } catch (error) {
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
    this.clearData();
    try {
      const response = await fetch('https://swapi.co/api/starships');
      if (response.status !== 200) {
        throw new Error('Status Error');
      }
      const starships = await response.json();
      this.setState({
        cardData: shipsCleaner(starships)
      });
    } catch (error) {
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
    this.clearData();
    try {
      const response = await fetch('https://swapi.co/api/vehicles');
      if (response.status !== 200) {
        throw new Error('Status Error');
      }
      const vehicles = await response.json();
      this.setState({
        cardData: vehiclesCleaner(vehicles)
      });
    } catch (error){
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
    this.clearData();
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
    } catch (error) {
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
    } catch (error) {
      return {
        homeworld: ":(",
        name: "Oh no!",
        population: "No data",
        species: "Something went wrong"
      };
    }
  }

  getHomeworld = (people) => {
    try {
      const homeworldInfo = people.map(async person => {
        const url = person.homeworld;
        const response = await fetch(url);
        if (response.status !== 200) {
          throw new Error('Status Error');
        }
        const homeworld = await response.json();
        return {...person, homeworld: homeworld.name, population: homeworld.population};
      });
      return Promise.all(homeworldInfo);
    } catch (error) {
      return {
        homeworld: ":(",
        name: "Oh no!",
        population: "No data",
        species: "Something went wrong"
      };
    }
  }

  getPlanets = async () => {
    this.clearData();
    try {
      const response = await fetch('https://swapi.co/api/planets');
      if (response.status !== 200) {
        throw new Error('Status Error');
      }
      const planetData = await response.json();
      const cleanedPlanetData = planetsCleaner(planetData);
      const planets = await this.getResidents(cleanedPlanetData);
      this.setState({
        cardData: planets
      });
    } catch (error) {
      this.setState({
        cardData: [{
          name: "Oh no!",
          climate: "Something went wrong",
          terrain: ":(",
          population: "No data",
          residents: 'No data'
        }]
      });
    }
  }

  getResidents = (planetData) => {
    const residentsInfo = planetData.map(async planet => {
      try {
        let residentNames = await this.fetchResidents(planet.residents);
        return {...planet, residents: residentNames};
      } catch (error) {
        return ({
          name: "Oh no!",
          climate: "Something went wrong",
          terrain: ":(",
          population: "No data",
          residents: 'No data'
        });
      }
    });
    return Promise.all(residentsInfo);
  }

  fetchResidents = (residents) => {
    const names = residents.map(async resident => {
      try {
        const response = await fetch(resident);
        const residentData = await response.json();
        return residentData.name;
      } catch (error) {
        return ({
          name: "Oh no!",
          climate: "Something went wrong",
          terrain: ":(",
          population: "No data",
          residents: 'No data'
        });
      }
    });
    return Promise.all(names);
  }

  toggleFavorite = (cardInfo) => {
    const findCard = this.state.favorites.map(favorite => {
      return favorite.id === cardInfo.id;
    });
    if (this.state.favorites.length === 0) {
      this.setState({
        favorites: [...this.state.favorites, cardInfo]
      });
    }
    if (!findCard.includes(true)) {
      this.setState({
        favorites: [...this.state.favorites, cardInfo]
      });
    } 
    if (findCard.includes(true)) {
      const newFavorites = this.state.favorites.filter(favorite => {
        return favorite.id !== cardInfo.id;
      });
      this.setState({
        favorites: newFavorites
      });
    }
  }

  render() {
    if (!this.state.crawlData.length) {
      return (
        <p className="access">Access code YT-1300. Retreiving your SWAPIBOX experience. Please Wait.</p>
      );
    }
    return (
      <div className="background">
        <header className="App-header">
          <h1 className="App-title">SWAPI UNIVERSE</h1>
          <NavLink 
            to='/favorites' 
            className="button"
          >View Favorites {this.state.favorites.length}
          </NavLink>
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
          return <People 
            toggleFavorite={this.toggleFavorite}
            cardData={this.state.cardData}
          />;
        }} />
        <Route exact path='/planets' render={() => {
          return <Planets 
            toggleFavorite={this.toggleFavorite}
            cardData={this.state.cardData} 
          />;
        }} />
        <Route exact path='/vehicles' render={() => {
          return <Vehicles 
            toggleFavorite={this.toggleFavorite}
            cardData={this.state.cardData} 
          />;
        }} />
        <Route exact path='/starships' render={() => {
          return <Starships 
            toggleFavorite={this.toggleFavorite}
            cardData={this.state.cardData}
          />;
        }} />
        <Route exact path='/favorites' render={() => {
          return <Favorites
            toggleFavorite={this.toggleFavorite}
            favorites={this.state.favorites}
          />;
        }} />
      </div>
    );
  }
}

export default App;
