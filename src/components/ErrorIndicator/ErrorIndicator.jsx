import React from 'react';

import PropTypes from 'prop-types';
import { Alert } from 'antd';

import './ErrorIndicator.css';

const ErrorIndicator = (props) => {
  const { error } = props;

  return (
    <div className="error-indicator">
      <Alert
        message="Something has gone terribly wrong"
        description={error}
        type="error"
      />
    </div>
  );
};

export default ErrorIndicator;

ErrorIndicator.propTypes = {
  error: PropTypes.string.isRequired,
};
