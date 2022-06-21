import React, { Component } from 'react';

import { debounce } from 'lodash';
import { Layout } from 'antd';
import 'antd/dist/antd.min.css';
import './App.css';

import MoviesService from '../../services/MoviesService';

import SearchPanel from '../SearchPanel';
import MovieList from '../MovieList';
import Loader from '../Loader';
import NoInternetConnection from '../NoInternetConnection';
import ErrorIndicator from '../ErrorIndicator';
import ListPagination from '../ListPagination';
import HeaderTabs from '../HeaderTabs';

import { MoviesServiceProvider } from '../MoviesServiceContext';

class App extends Component {
  constructor(props) {
    super(props);
    this.moviesService = new MoviesService();
    this.genres = null;

    this.state = {
      loading: true,
      error: false,
    };

    this.debouncedSearch = debounce((criteria) => {
      if (criteria.target.value.replace(/\s/g, '').length !== 0) {
        this.setPreloadStates();
        this.requestMovies(criteria.target.value);
      }
    }, 1000);

    this.getGenres();
  }

  componentDidMount() {
    this.requestMovies('return');
  }

  onSearch = (e) => {
    this.debouncedSearch(e);
  };

  onError = (err) => {
    this.setState({
      error: true,
      errorMessage: err.message,
      loading: false,
      totalResults: 0,
      movies: [],
    });
  };

  onChangePage = (pageNumber) => {
    const { currentSearch } = this.state;
    this.setPreloadStates();
    this.requestMovies(currentSearch, pageNumber);
  };

  setPreloadStates = () => {
    this.setState({
      loading: true,
      error: false,
    });
  };

  requestMovies = (name, num = 1) => {
    this.moviesService
      .getMovies(name, num)
      .then((movies) =>
        this.setState(() => ({
          currentSearch: name,
          movies: movies.results,
          totalResults: movies.total_results,
          currentPage: movies.page,
          loading: false,
        }))
      )
      .catch(this.onError);
  };

  getGenres = () => {
    this.moviesService
      .getGenres()
      .then((r) => {
        this.genres = r.genres;
      })
      .catch(this.onError);
  };

  render() {
    const { movies, totalResults, currentPage, loading, error, errorMessage } =
      this.state;

    const hasData = !(loading || error);

    const errorText = error ? <ErrorIndicator error={errorMessage} /> : null;
    const loader = loading ? <Loader /> : null;
    const content = hasData ? <MovieList movies={movies} /> : null;
    const pagination = movies ? (
      <ListPagination
        totalItems={totalResults}
        page={currentPage}
        onChangePage={this.onChangePage}
      />
    ) : null;

    return (
      <Layout className="container">
        <HeaderTabs />
        <SearchPanel onSearch={this.onSearch} />
        <NoInternetConnection />
        {errorText}
        {loader}
        <MoviesServiceProvider value={this.genres}>
          {content}
        </MoviesServiceProvider>
        {pagination}
      </Layout>
    );
  }
}

export default App;
