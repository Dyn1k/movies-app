import React from 'react';

import { Menu } from 'antd';

import './HeaderTabs.css';

const HeaderTabs = () => (
  <div className="menu-container">
    <Menu
      className="menu"
      mode="horizontal"
      defaultSelectedKeys={['Search']}
      overflowedIndicator={false}
      items={[
        { label: 'Search', key: 'Search' },
        { label: 'Rated', key: 'Rated' },
      ]}
    />
  </div>
);

export default HeaderTabs;
