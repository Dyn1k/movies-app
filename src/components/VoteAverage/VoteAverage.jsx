import React from 'react';

import PropTypes from 'prop-types';

import './VoteAverage.css';

const VoteAverage = ({ vote }) => {
  const rateColor = (rate) => {
    let borderColor = 'vote-average';
    if (rate < 3) borderColor += '_red';
    if (rate >= 3 && rate < 5) borderColor += '_orange';
    if (rate >= 5 && rate < 7) borderColor += '_yellow';
    if (rate >= 7) borderColor += '_green';
    return borderColor;
  };

  return (
    <div className={`vote-average ${rateColor(vote)}`}>
      <span className="vote-average__rate">{vote}</span>
    </div>
  );
};

VoteAverage.propTypes = {
  vote: PropTypes.number.isRequired,
};

export default VoteAverage;
