import React from 'react';

import { Rate } from 'antd';

import PropTypes from 'prop-types';

import MoviesService from '../../services/MoviesService';
import { GuestSessionConsumer } from '../../services/GuestSessionContext';

import './UserRate.css';

const UserRate = ({ movieId }) => {
  const moviesService = new MoviesService();

  const rateFilm = (filmId, guestId, rate) =>
    moviesService.rateMovie(filmId, guestId, rate);

  return (
    <GuestSessionConsumer>
      {(guestId) => (
        <Rate
          className="card-rate"
          count={10}
          allowHalf
          onChange={(rate) => rateFilm(movieId, guestId, rate)}
        />
      )}
    </GuestSessionConsumer>
  );
};

UserRate.propTypes = {
  movieId: PropTypes.number.isRequired,
};

export default UserRate;
