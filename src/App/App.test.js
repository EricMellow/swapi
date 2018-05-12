import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { shallow, mount } from 'enzyme';
import mockCrawl from './mockCrawlData.js';
import { mockShip } from './mockStarshipData.js';
import { mockVehicles } from './mockVehiclesData';
import { mockPeople, mockCleanedPeople} from './mockPeopleData';

describe('App', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<App />);
  });

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should start with a default state of empty arrays', () => {
    const expected = {
      crawlData: [],
      cardData: [],
      favorites: []
    };

    expect(wrapper.state()).toEqual(expected);
  });

  describe('getCrawl', () => {
    let wrapper;

    beforeEach(() => {
      wrapper= shallow(<App />);
      wrapper.componentDidMount = jest.fn();
      const mockCrawlData = mockCrawl;
      window.fetch = jest.fn().mockImplementation(() => Promise.resolve({ json: () => Promise.resolve(mockCrawlData), status: 200}));
    });

    it('should call fetch with the correct params and set the fetch to the crawlData in state', async () => {
      const expected = [{ "crawl": "Opening Crawl Test", "episode": 4, "release": "1977-05-25", "title": "A New Hope" }];

      await wrapper.instance().getCrawl();

      expect(wrapper.state('crawlData')).toEqual(expected);
    });

    it('should set the crawlData in state to a single error message object if the fetch status is not 200', async () => {
      window.fetch = jest.fn().mockImplementation(() => Promise.resolve({json: jest.fn(), status: 408}));
      const expected = [{
        crawl: "We're so sorry, but something has gone incredibly wrong and we weren't able to fetch the data. :(",
        episode: 'Oh no!',
        release: "Just now",
        title: "Error"
      }];

      await wrapper.instance().getCrawl();

      expect(wrapper.state('crawlData')).toEqual(expected);
    });

    it('should set the crawlData in state to a single error message object if the fetch fails', async () => {
      window.fetch = jest.fn().mockImplementation(() => Promise.reject( new Error('Fetch Failed')));
      const expected = [{
        crawl: "We're so sorry, but something has gone incredibly wrong and we weren't able to fetch the data. :(",
        episode: 'Oh no!',
        release: "Just now",
        title: "Error"
      }];

      await wrapper.instance().getCrawl();
      expect(wrapper.state('crawlData')).toEqual(expected);
    });
  });

  describe('getStarships', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = shallow(<App />);
      wrapper.componentDidMount = jest.fn();
      const mockShipData = mockShip;
      window.fetch = jest.fn().mockImplementation(() => Promise.resolve({json: () => Promise.resolve(mockShipData), status: 200}))
    });

    it('should call fetch with the correct params and set the fetch to the cardData in state', async () => {
      const expected = [{ "hyperdriveRating": "2.0", "model": "Executor-class star dreadnought", "name": "Executor", "numOfPassengers": "38000" }]

      await wrapper.instance().getStarships();

      expect(wrapper.state('cardData')).toEqual(expected);
    });

    it('should set cardData in state with a single error message object if the fetch status is not 200', async () => {
      window.fetch = jest.fn().mockImplementation(() => Promise.resolve({json: jest.fn(), status: 408}))
      const expected = [{
        hyperdriveRating: ":(",
        model: "Something went wrong",
        name: "Oh no!",
        numOfPassengers: "No data"
      }];

      await wrapper.instance().getStarships();

      expect(wrapper.state('cardData')).toEqual(expected);
    });

    it('should set cardData in state with a single error message object if the fetch fails', async () => {
      window.fetch = jest.fn().mockImplementation(() => Promise.reject(new Error('Test Fetch')));
      const expected = [{
        hyperdriveRating: ":(",
        model: "Something went wrong",
        name: "Oh no!",
        numOfPassengers: "No data"
      }];

      await wrapper.instance().getStarships();

      expect(wrapper.state('cardData')).toEqual(expected);
    });
  });

  describe('getVehicles', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = shallow(<App />)
      wrapper.componentDidMount = jest.fn();
      const mockVehiclesData = mockVehicles;
      window.fetch = jest.fn().mockImplementation(() => Promise.resolve({json: () => Promise.resolve(mockVehiclesData), status: 200}))
    });

    it('should call fetch with the correct params and set the fetch data to cardData in state', async () => {
      const expected = [{
        model: "Digger Crawler", 
        name: "Sand Crawler", 
        numOfPassengers: "30", 
        vehicleClass: "wheeled"}];

      await wrapper.instance().getVehicles();

      expect(wrapper.state('cardData')).toEqual(expected);
    });

    it('should set cardData in state with a single error message object if the response status is not 200', async () => {
      window.fetch = jest.fn().mockImplementation(() => Promise.resolve({json: jest.fn(), status: 408}));
      const expected = [{
        model: "Something went wrong",
        name: "Oh no!",
        numOfPassengers: "No data",
        vehicleClass: ":("
      }];

      await wrapper.instance().getVehicles();

      expect(wrapper.state('cardData')).toEqual(expected)
    });

    it('should set cardData in state with a single error message object if the fetch fails', async () => {
      window.fetch = jest.fn().mockImplementation(() => Promise.reject( new Error('This is my test error')));
      const expected = [{
        model: "Something went wrong",
        name: "Oh no!",
        numOfPassengers: "No data",
        vehicleClass: ":("
      }];

      await wrapper.instance().getVehicles();

      expect(wrapper.state('cardData')).toEqual(expected);
    });
  });

  describe('getPeople', () => {
    let wrapper;

    beforeEach(() => {
      window.fetch = jest.fn().mockImplementation(() => Promise.resolve({json: () => Promise.resolve(mockPeople), status: 200}));
      wrapper = shallow(<App />)
      wrapper.componentDidMount = jest.fn();
      const mockData = mockPeople;

    });

    it('should call getHomeworld with the correct parameters', async () => {
      wrapper.getSpecies = jest.fn();
      const spy = jest.spyOn(wrapper.instance(), 'getHomeworld');
      
      const expected = [{ 
        homeworld: "https://swapi.co/api/planets/1/", 
        name: "Luke Skywalker", 
        population: 0, 
        species: "https://swapi.co/api/species/1/" }];

      await wrapper.instance().getPeople();

      expect(spy).toHaveBeenCalledWith(expected);
    });

    it('should call getSpecies with the correct parameters', async () => {
      const spy = jest.spyOn(wrapper.instance(), 'getSpecies');

      const expected = [{
        homeworld: undefined,
        name: "Luke Skywalker",
        population: undefined,
        species: "https://swapi.co/api/species/1/"
      }];

      await wrapper.instance().getPeople();

      expect(spy).toHaveBeenCalledWith(expected);
    });

    it('should set cardData in state to a single error message object if the fetch fails', async () => {
      window.fetch = jest.fn().mockImplementation(() => Promise.reject( new Error('Test error')));
      const expected = [{
        homeworld: ":(",
        name: "Oh no!",
        population: "No data",
        species: "Something went wrong"
      }];

      await wrapper.instance().getPeople();

      expect(wrapper.state('cardData')).toEqual(expected);
    });

    it('should set cardData in state to a single error message object if the fetch response status is not 200', async () => {
      window.fetch = jest.fn().mockImplementation(() => Promise.resolve({json: jest.fn(), status: 408}));
      const expected = [{
        homeworld: ":(",
        name: "Oh no!",
        population: "No data",
        species: "Something went wrong"
      }];

      await wrapper.instance().getPeople();

      expect(wrapper.state('cardData')).toEqual(expected)
    });
  });

  describe('getSpecies', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = shallow(<App />)
      const mockData = mockCleanedPeople
      window.fetch = jest.fn().mockImplementation(() => Promise.resolve({json: () => Promise.resolve(mockCleanedPeople), status: 200}))
    })
    
    it('should call fetch with the correct parameters', async () => {
      const mockSpeciesData = mockPeople.results;
      const expected = ['https://swapi.co/api/species/1/'];

      await wrapper.instance().getSpecies(mockSpeciesData);

      expect(window.fetch).toHaveBeenCalledWith(expected);

    });

    it('should return an error object when the fetch call is unsuccessful', async () => {
      window.fetch = jest.fn().mockImplementation(() => Promise.reject(new Error('Oopsies!')));
      const expected = {
        homeworld: ":(",
        name: "Oh no!",
        population: "No data",
        species: "Something went wrong"
      };

      const actual = await wrapper.instance().getSpecies();

      expect(actual).toEqual(expected);
    });

    it('should return an error object when the fetch call returns a response with a status that is not 200', async () => {
      window.fetch = jest.fn().mockImplementation(() => Promise.resolve({json: jest.fn(), status: 408}));
      const expected = {
        homeworld: ":(",
        name: "Oh no!",
        population: "No data",
        species: "Something went wrong"
      };

      const actual = await wrapper.instance().getSpecies();

      expect(actual).toEqual(expected);
    })
  });

  describe('getHomeworld', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = shallow(<App />)
      const mockData = mockCleanedPeople
      window.fetch = jest.fn().mockImplementation(() => Promise.resolve({ json: () => Promise.resolve(mockCleanedPeople), status: 200 }))
    })

    it('should call fetch with the correct parameters', async () => {
      const mockSpeciesData = mockPeople.results;
      const expected = ['https://swapi.co/api/species/1/'];

      await wrapper.instance().getHomeworld(mockSpeciesData);

      expect(window.fetch).toHaveBeenCalledWith(expected);

    });

    it('should return an error object when the fetch call is unsuccessful', async () => {
      window.fetch = jest.fn().mockImplementation(() => Promise.reject(new Error('Oopsies!')));
      const expected = {
        homeworld: ":(",
        name: "Oh no!",
        population: "No data",
        species: "Something went wrong"
      };

      const actual = await wrapper.instance().getHomeworld();

      expect(actual).toEqual(expected);
    });

    it('should return an error object when the fetch call returns a response with a status that is not 200', async () => {
      window.fetch = jest.fn().mockImplementation(() => Promise.resolve({ json: jest.fn(), status: 408 }));
      const expected = {
        homeworld: ":(",
        name: "Oh no!",
        population: "No data",
        species: "Something went wrong"
      };

      const actual = await wrapper.instance().getSpecies();

      expect(actual).toEqual(expected);
    })
  });
});
