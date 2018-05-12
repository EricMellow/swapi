import React from 'react';
import Vehicles from './Vehicles';
import { shallow } from 'enzyme';
import { mockCleanedVehicles } from '../../mockVehiclesData';

describe('Vehicles', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Vehicles />);

  });

  it('should match the snapshot with no data', () => {

    expect(wrapper).toMatchSnapshot();
  });

  it('should match the snapshot with good card data', () => {
    const mockData = mockCleanedVehicles;
    wrapper = shallow(<Vehicles cardData={mockData} />)

    expect(wrapper).toMatchSnapshot();
  });

  it('should match the snapshot with error data', () => {
    const mockError = [
      {
        model: "Something went wrong",
        name: "Oh no!",
        numOfPassengers: "No data",
        vehicleClass: ":("
      }
    ];
    wrapper = shallow(<Vehicles cardData={mockError}/>);

    expect(wrapper).toMatchSnapshot();

  });
});