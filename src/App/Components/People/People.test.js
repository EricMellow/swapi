import React from 'react';
import People from './People';
import { mockCleanedPeople } from '../../mockPeopleData';
import { shallow } from 'enzyme';

describe('People', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<People />);
    
  });

  it('should match the snapshot with no data', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should match the snapshot with correct card data', () => {
    const mockPeopleData = mockCleanedPeople;
   
    wrapper = shallow(<People cardData={mockPeopleData} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('should match the snapshot with error data', () => {
    const mockErrorData = [{
      name: "Oh no!",
      homeworld: "Something went wrong",
      species: ":(",
      population: "No data"
    }];

    wrapper = shallow(<People cardData={mockErrorData} />);

    expect(wrapper).toMatchSnapshot();
  });
});