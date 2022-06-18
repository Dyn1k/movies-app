/* eslint-disable */

import React from 'react';

import './SearchPanel.css';
import { Input } from 'antd';

const SearchPanel = (props) => {
  return (
    <Input
      size="large"
      className="search-panel"
      placeholder="Type to search..."
      onChange={props.onSearch}
    />
  );
};

export default SearchPanel;
