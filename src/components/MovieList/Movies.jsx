import React from 'react';

import PropTypes from 'prop-types';
import Movie from '../Movie';

const Movies = ({ movies }) => (
  <div className="movies-list">
    {movies.map((item) => (
      <Movie key={item.id} movie={item} />
    ))}
  </div>
);

Movies.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default Movies;
