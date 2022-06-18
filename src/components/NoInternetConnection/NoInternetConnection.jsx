import React, { Component } from 'react';

import { Alert } from 'antd';

import './NoInternetConnection.css';

class NoInternetConnection extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hasInternet: true,
    };
  }

  componentDidMount() {
    window.addEventListener('online', () =>
      this.setState({
        hasInternet: true,
      })
    );

    window.addEventListener('offline', () =>
      this.setState({
        hasInternet: false,
      })
    );
  }

  render() {
    const { hasInternet } = this.state;

    return hasInternet ? null : (
      <Alert
        className="connection-error"
        message="No Internet Connection. Please try again later."
        type="warning"
      />
    );
  }
}

export default NoInternetConnection;
