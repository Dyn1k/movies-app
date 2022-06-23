import React from 'react';

import PropTypes from 'prop-types';

import { Layout } from 'antd';
import Movie from '../Movie';

const Movies = ({ movies }) => (
  // <List
  //   grid={{
  //     gutter: [36, 16],
  //     column: 2,
  //     // xs: 1,
  //     // sm: 1,
  //     // md: 2,
  //     // lg: 2,
  //     // xl: 2,
  //     // xxl: 2,
  //   }}
  //   className="movies-list"
  //   dataSource={movies}
  //   renderItem={(item) => (
  //     <List.Item>
  //       <Movie movie={item} />
  //     </List.Item>
  //   )}
  // />
  <Layout className="movies-list">
    {movies.map((item) => (
      <Movie key={item.id} movie={item} />
    ))}
  </Layout>
);

Movies.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default Movies;
