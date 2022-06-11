// /* eslint-disable */

import React from 'react';

import { Layout } from 'antd';
import 'antd/dist/antd.min.css';

import MovieList from '../MovieList';

import './App.css';

const App = () => (
  <Layout className="container">
    <MovieList />
  </Layout>
);

export default App;
