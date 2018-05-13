import React from "react";
import ButtonContainer from './ButtonContainer';
import { shallow } from "enzyme";

describe('ButtonContainer', () => {

  it('should match the snapshot', () => {
    const wrapper = shallow(<ButtonContainer />);
    
    expect(wrapper).toMatchSnapshot();
  });
});