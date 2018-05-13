import React from 'react';
import Planets from "./Planets.js";
import { shallow } from "enzyme";
import { mockedCleanedPlanets } from '../../mockPlanetData';

describe('Planets', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Planets />);
  });

  it('should match the snapshot with no data', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should match the snapshot with good data', () => {
    const mockData = mockedCleanedPlanets;
    wrapper = shallow(<Planets cardData={mockData} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('should match the snapshot with error data', () => {
    const mockErrorData = [{
      terrain: "Something went wrong",
      name: "Oh no!",
      population: "No data",
      climate: ":(",
      residents: "No data"
    }];
    wrapper = shallow(<Planets cardData={mockErrorData} />);

    expect(wrapper).toMatchSnapshot();
  });
});