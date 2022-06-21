import React from 'react';

import { Input } from 'antd';
import PropTypes from 'prop-types';

import './SearchPanel.css';

const SearchPanel = ({ onSearch }) => (
  <Input
    size="large"
    className="search-panel"
    placeholder="Type to search..."
    onChange={onSearch}
  />
);

SearchPanel.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default SearchPanel;
