import React from 'react';
import Favorites from './Favorites';
import { mockCleanedPeople } from '../../mockPeopleData';
import { shallow } from 'enzyme';

describe('People', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Favorites />);

  });

  it('should match the snapshot with no data', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should match the snapshot with correct people data', () => {
    const mockData = [{
      id: 'Mr. Test1',
      name: 'Mr Test',
      homeworld: 'Planet',
      species: 'being',
      population: 0,
      type: 'person'
    }];

    wrapper = shallow(<Favorites cardData={mockData} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('should match the snapshot with correst planet data', () => {
    const mockData = [{
      id: 'Mr. Planet1',
      name: 'Mr Planet',
      terrain: 'grass',
      population: 200,
      climate: 'nice',
      residents: ['thing1', 'thing2'],
      type: 'planet'
    }];

    wrapper = shallow(<Favorites cardData={mockData} />);

    expect(wrapper).toMatchSnapshot();
  });
  it('should match the snapshot with correst starship data', () => {
    const mockData = [{
      id: 'Mr. Ship1',
      name: 'Mr. Ship',
      model: 'Gisele',
      hyperdriveRating: 3,
      numOfPassengers: 2,
      type: 'ship'
    }];

    wrapper = shallow(<Favorites cardData={mockData} />);

    expect(wrapper).toMatchSnapshot();
  });
});