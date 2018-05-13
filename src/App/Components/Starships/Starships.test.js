import React from "react";
import Starships from "./Starships";
import { shallow } from "enzyme";
import { mockCleanedStarships } from '../../mockStarshipData';

describe('Starships', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Starships />);
  });

  it('should match the snapshot with no data', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should match the snapshot with good card data', () => {
    const mockData = mockCleanedStarships;
    wrapper = shallow(<Starships cardData={mockData}/>);

    expect(wrapper).toMatchSnapshot();
  });

  it('should match the snapshot with error data', () => {
    const mockError = [{
      hyperdriveRating: ":(",
      model: "Something went wrong",
      name: "Oh no!",
      numOfPassengers: "No data"
    }];
    wrapper = shallow(<Starships cardData={mockError} />);

    expect(wrapper).toMatchSnapshot();
  });


});