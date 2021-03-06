import React from 'react';
import { Spin } from 'antd';

import './Loader.css';

const Loader = () => (
  <div className="loader">
    <Spin size="large" tip="Loading Data..." />
  </div>
);

export default Loader;
