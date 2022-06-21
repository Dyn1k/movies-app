import React from 'react';

import PropTypes from 'prop-types';

import { Tag } from 'antd';
import { MoviesServiceConsumer } from '../MoviesServiceContext';

import './Genres.css';

const Genres = ({ genres: genreIds }) => (
  <MoviesServiceConsumer>
    {(genres) => (
      <div className="card-categories">
        {genres.map(({ id, name }) => {
          if (id === genreIds.find((gId) => gId === id)) {
            return (
              <Tag key={id} color="default">
                {name}
              </Tag>
            );
          }
          return null;
        })}
      </div>
    )}
  </MoviesServiceConsumer>
);

Genres.defaultProps = {
  genres: [],
};

Genres.propTypes = {
  genres: PropTypes.arrayOf(PropTypes.number),
};

export default Genres;
