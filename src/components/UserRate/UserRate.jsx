import React from 'react';

import { Rate } from 'antd';

import './UserRate.css';

const UserRate = () => <Rate className="card-rate" count={10} allowHalf />;

export default UserRate;
