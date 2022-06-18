import React from 'react';

import PropTypes from 'prop-types';

import Movies from './Movies';
import NoMovies from './NoMovies';

import './MovieList.css';

const MovieList = ({ movies }) =>
  movies.length ? <Movies movies={movies} /> : <NoMovies />;

MovieList.defaultProps = {
  movies: [],
};

MovieList.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.shape()),
};

export default MovieList;
