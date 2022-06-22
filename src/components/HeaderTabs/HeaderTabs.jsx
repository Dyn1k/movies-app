import React from 'react';

import { Menu } from 'antd';

import PropTypes from 'prop-types';

import './HeaderTabs.css';

const HeaderTabs = ({ onToggleTab }) => (
  <div className="menu-container">
    <Menu
      className="menu"
      mode="horizontal"
      defaultSelectedKeys={['searchTab']}
      overflowedIndicator={false}
      items={[
        { label: 'Search', key: 'searchTab' },
        { label: 'Rated', key: 'ratedTab' },
      ]}
      onClick={({ key }) => onToggleTab(key)}
    />
  </div>
);

HeaderTabs.propTypes = {
  onToggleTab: PropTypes.func.isRequired,
};

export default HeaderTabs;
