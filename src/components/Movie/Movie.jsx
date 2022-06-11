/* eslint-disable */
import React, { Component } from 'react';

import TextTruncate from 'react-text-truncate';
import { format } from 'date-fns';
import { Layout, Tag, Image } from 'antd';

import './Movie.css';

class Movie extends Component {
  constructor(props) {
    super(props);

    this.state = {
      height: 0,
    };
  }

  componentDidMount() {
    const height = this.divElement.clientHeight;
    this.setState({ height });
  }

  a(e) {
    console.log(e.scrollHeight);
    return this.props.movie.overview;
  }
  render() {
    const { movie } = this.props;

    return (
      <Layout className="card-wrapper">
        <Image
          className="card-image"
          alt="example"
          src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
          preview={false}
        />
        <Layout className="card-body">
          <div className="card-title">{movie.original_title}</div>
          <div className="card-release-date">
            {movie.release_date
              ? format(new Date(movie.release_date), "MMMMMM d',' Y")
              : 'No date'}
          </div>

          <div className="card-categories">
            <Tag color="default">Action</Tag>
            <Tag color="default">Drama</Tag>
          </div>
          <div
            className="card-description"
            ref={(divElement) => {
              this.divElement = divElement;
            }}
          >
            <TextTruncate
              line={Math.floor(this.state.height / 22)}
              element="span"
              truncateText=" …"
              text={movie.overview}
            />
          </div>
        </Layout>
      </Layout>
    );
  }
}

export default Movie;
