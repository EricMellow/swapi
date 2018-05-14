import React from "react";
import ButtonContainer from './ButtonContainer';
import { shallow } from "enzyme";
import { NavLink } from 'react-router';

describe('ButtonContainer', () => {

  it('should match the snapshot', () => {
    const wrapper = shallow(<ButtonContainer />);
    
    expect(wrapper).toMatchSnapshot();
  });
});