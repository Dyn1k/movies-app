import React, { Component } from 'react';

import { Rate } from 'antd';

import PropTypes from 'prop-types';

import MoviesService from '../../services/MoviesService';
import { GuestSessionConsumer } from '../../services/GuestSessionContext';
import SessionStorage from '../../services/SessionStorage';

import './UserRate.css';

class UserRate extends Component {
  constructor({ movieId }) {
    super();

    this.sessionStorage = new SessionStorage();
    this.moviesService = new MoviesService();

    this.state = {
      currentRate: !this.sessionStorage.getItem(movieId)
        ? 0
        : this.sessionStorage.getItem(movieId),
    };
  }

  rateFilm = (filmId, guestId, rate) => {
    const { movieId } = this.props;
    this.moviesService.rateMovie(filmId, guestId, rate);
    this.sessionStorage.setItem(filmId, rate);
    this.setState({ currentRate: this.sessionStorage.getItem(movieId) });
  };

  render() {
    const { movieId, userRate } = this.props;
    const { currentRate } = this.state;

    return (
      <GuestSessionConsumer>
        {(guestId) => (
          <Rate
            className="card-rate"
            count={10}
            disabled={!!userRate}
            value={userRate || currentRate}
            allowHalf
            onChange={(rate) => this.rateFilm(movieId, guestId, rate)}
          />
        )}
      </GuestSessionConsumer>
    );
  }
}

UserRate.defaultProps = {
  userRate: undefined,
};

UserRate.propTypes = {
  movieId: PropTypes.number.isRequired,
  userRate: PropTypes.number,
};

export default UserRate;
