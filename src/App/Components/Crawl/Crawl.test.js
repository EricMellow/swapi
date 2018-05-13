import React from "react";
import Crawl from './Crawl';
import { mockCrawl, mockCleanedCrawl } from "../../mockCrawlData.js";
import { shallow } from "enzyme";

describe('Crawl', () => {
  let wrapper;

  beforeEach(() => {
    const mockData = mockCleanedCrawl;
    wrapper = shallow(<Crawl crawlData={mockData}/>);
    const randomNumber = 2;
  });

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});