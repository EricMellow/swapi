import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { shallow, mount } from 'enzyme';
import mockCrawl from './mockCrawlData.js';
import mockShip from './mockStarshipData.js';

describe('App', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<App />);
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

    it('should set the crawlData in state to a single error message object', async () => {
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

      expect(wrapper.state('cardData')).toEqual(expected)
    })
  });

});
