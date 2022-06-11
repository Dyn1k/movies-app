/* eslint-disable */

import React, { Component } from 'react';

import { List } from 'antd';

import Movie from '../Movie';

import MoviesService from '../../services/MoviesService';

const data = [
  {
    title: 'Title 1',
  },
  {
    title: 'Title 2',
  },
  {
    title: 'Title 3',
  },
  {
    title: 'Title 4',
  },
  {
    title: 'Title 5',
  },
  {
    title: 'Title 6',
  },
];

class MovieList extends Component {
  constructor(props) {
    super(props);
    this.moviesService = new MoviesService();

    this.state = {};
  }

  componentDidMount() {
    this.moviesService.getMoviesBySearch().then((movies) => {
      this.setState({
        movies: movies.results,
      });
    });
  }

  render() {
    return (
      <List
        grid={{
          gutter: [36, 16],
          column: 2,
        }}
        dataSource={this.state.movies}
        renderItem={(item) => (
          <List.Item>
            <Movie movie={item} />
          </List.Item>
        )}
      />
    );
  }
}

export default MovieList;
