import React, { Component } from 'react';
// /* eslint-disable */
import { debounce } from 'lodash';
import { Layout } from 'antd';
import 'antd/dist/antd.min.css';
import './App.css';

import SearchPanel from '../SearchPanel';
import MovieList from '../MovieList';
import MoviesService from '../../services/MoviesService';
import Loader from '../Loader';
import NoInternetConnection from '../NoInternetConnection';
import ErrorIndicator from '../ErrorIndicator';
import ListPagination from '../ListPagination';

class App extends Component {
  constructor(props) {
    super(props);
    this.moviesService = new MoviesService();

    this.state = {
      loading: true,
      errorObj: {
        errorFlag: false,
        errorText: '',
      },
    };

    this.debouncedSearch = debounce((criteria) => {
      if (criteria.target.value.replace(/\s/g, '').length !== 0) {
        this.setState({
          loading: true,
          errorObj: {
            errorFlag: false,
          },
        });
        this.moviesService
          .getMoviesBySearch(criteria.target.value)
          .then((movies) => {
            this.setState({
              movies: {
                currentSearch: criteria.target.value,
                moviesArray: movies.results,
                totalResults: movies.total_results,
                currentPage: 1,
              },
              loading: false,
            });
          })
          .catch(this.onError);
      }
    }, 1000);
  }

  onSearch = (e) => {
    this.debouncedSearch(e);
  };

  onError = (err) => {
    this.setState({
      errorObj: {
        errorFlag: true,
        errorText: err.message,
      },
      loading: false,
      movies: {
        moviesArray: [],
        totalResults: 0,
      },
    });
  };

  onChangePage = (pageNumber) => {
    const { movies } = this.state;

    this.setState({
      loading: true,
      errorObj: {
        errorFlag: false,
      },
    });
    this.moviesService
      .getSearchPage(movies.currentSearch, pageNumber)
      .then((movi) =>
        this.setState(() => ({
          movies: {
            currentSearch: movies.currentSearch,
            moviesArray: movi.results,
            totalResults: movi.total_results,
            currentPage: movi.page,
          },
          loading: false,
        }))
      )
      .catch(this.onError);
  };

  render() {
    const { movies, loading, errorObj } = this.state;
    const { errorFlag, errorText } = errorObj;

    const hasData = !(loading || errorFlag);

    const errorMessage = errorFlag ? (
      <ErrorIndicator error={errorText} />
    ) : null;
    const loader = loading ? <Loader /> : null;
    const content = hasData ? <MovieList movies={movies.moviesArray} /> : null;
    const pagination = movies ? (
      <ListPagination
        totalItems={movies.totalResults}
        page={movies.currentPage}
        onChangePage={this.onChangePage}
      />
    ) : null;

    return (
      <Layout className="container">
        <SearchPanel onSearch={this.onSearch} />
        <NoInternetConnection />
        {errorMessage}
        {loader}
        {content}
        {pagination}
      </Layout>
    );
  }
}

export default App;
