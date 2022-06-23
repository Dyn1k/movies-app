import React, { Component } from 'react';

import PropTypes from 'prop-types';
import TextTruncate from 'react-text-truncate';
import { format } from 'date-fns';
import { Layout } from 'antd';

import NoPhoto from './empty-thumb.jpg';
import VoteAverage from '../VoteAverage';
import Genres from '../Genres';
import UserRate from '../UserRate';

import './Movie.css';

class Movie extends Component {
  constructor(props) {
    super(props);

    this.state = {
      height: 0,
    };
  }

  componentDidMount() {
    const height = this.divElement.clientHeight - 22;
    this.setState({ height });
  }

  render() {
    const { movie } = this.props;
    const { height } = this.state;
    return (
      <Layout className="card-wrapper">
        <img
          className="card-image"
          alt={movie.original_title}
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : NoPhoto
          }
        />
        <Layout className="card-body">
          <div className="titles-wrapper">
            <div className="title-vote-wrapper">
              <div className="card-title">
                {movie.original_title || 'No Title'}
              </div>
              <VoteAverage vote={movie.vote_average} />
            </div>
            <div className="card-release-date">
              {movie.release_date
                ? format(new Date(movie.release_date), "MMMMMM d',' Y")
                : 'No date'}
            </div>
            {movie.genre_ids ? <Genres genres={movie.genre_ids} /> : null}
          </div>
          <div
            className="card-description"
            ref={(divElement) => {
              this.divElement = divElement;
            }}
          >
            <TextTruncate
              line={Math.floor(height / 22)}
              element="span"
              text={movie.overview ? movie.overview : 'No description'}
            />
          </div>
          <UserRate movieId={movie.id} userRate={movie.rating} />
        </Layout>
      </Layout>
    );
  }
}

Movie.propTypes = {
  movie: PropTypes.shape().isRequired,
};

export default Movie;
