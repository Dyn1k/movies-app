import React, { Component } from 'react';
/* eslint-disable */
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
import { GuestSessionProvider } from '../../services/GuestSessionContext';

class App extends Component {
  constructor(props) {
    super(props);
    this.moviesService = new MoviesService();
    this.genres = null;

    this.state = {
      // searchTab: true,
      ratedTab: false,
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
    this.moviesService.createGuestSession().then((r) =>
      this.setState({
        guestId: r.guest_session_id,
      })
    );

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

  onToggleTabs = (tab) => {
    this.setPreloadStates();
    if (tab === 'ratedTab') {
      this.moviesService
        .getRatedMovies(this.state.guestId)
        .then((r) =>
          this.setState({
            movies: r.results,
            totalResults: r.total_results,
            currentPage: r.page,
            ratedTab: true,
            searchTab: false,
            loading: false,
          })
        )
        .catch(this.onError);
    }
    if (tab === 'searchTab') {
      this.requestMovies(this.state.currentSearch);
      this.setState({
        ratedTab: false,
        searchTab: true,
      });
    }
  };

  render() {
    const {
      movies,
      totalResults,
      currentPage,
      loading,
      error,
      errorMessage,
      guestId,
      ratedTab,
    } = this.state;

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
        <HeaderTabs
          onClick={this.getRatedMovies}
          onToggleTab={this.onToggleTabs}
        />
        {!ratedTab ? <SearchPanel onSearch={this.onSearch} /> : null}
        <NoInternetConnection />
        {errorText}
        {loader}
        <MoviesServiceProvider value={this.genres}>
          <GuestSessionProvider value={guestId}>{content}</GuestSessionProvider>
        </MoviesServiceProvider>
        {pagination}
      </Layout>
    );
  }
}

export default App;
