import React from 'react';

const { Provider: GuestSessionProvider, Consumer: GuestSessionConsumer } =
  React.createContext();

export { GuestSessionConsumer, GuestSessionProvider };
