import React from 'react';

import { Space } from 'antd';
import { MehOutlined } from '@ant-design/icons';

const NoMovies = () => (
  <Space direction="vertical" align="center" className="no-search">
    <MehOutlined style={{ fontSize: '32px' }} />
    Nothing was found
  </Space>
);

export default NoMovies;
