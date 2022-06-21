import React from 'react';

const { Provider: MoviesServiceProvider, Consumer: MoviesServiceConsumer } =
  React.createContext();

export { MoviesServiceConsumer, MoviesServiceProvider };
