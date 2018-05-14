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

  // it('should call toggleFavorite with the correct parameters when the button is clicked', () => {
  //   const mockData = [{
  //     id: "LukeSkywalker1",
  //     name: "Luke Skywalker",
  //     homeworld: "Test",
  //     species: "Human",
  //     population: 300000,
  //     type: 'person'
  //   }];
  //   const mockToggle = jest.fn();
    
  //   wrapper = shallow(<People cardData={mockData} toggleFavorite={mockToggle}/>);
    
  //   wrapper.instance().toggleFavorite()

  //   expect(toggleFavorite).toHaveBeenCalledWith(mockData);

  // });
});