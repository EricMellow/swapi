import React from "react";
import Crawl from './Crawl';
import { mockCleanedCrawl } from "../../mockCrawlData.js";
import { shallow } from "enzyme";

describe('Crawl', () => {
  let wrapper;

  beforeEach(() => {
    const mockData = mockCleanedCrawl;
    wrapper = shallow(<Crawl crawlData={mockData}/>);
  });

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});