import React from 'react';

import PropTypes from 'prop-types';

import { List } from 'antd';
import Movie from '../Movie';

const Movies = ({ movies }) => (
  <List
    grid={{
      gutter: [36, 16],
      column: 2,
    }}
    className="movies-list"
    dataSource={movies}
    renderItem={(item) => (
      <List.Item>
        <Movie movie={item} />
      </List.Item>
    )}
  />
);

Movies.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default Movies;
