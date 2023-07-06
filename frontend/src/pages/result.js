import React from 'react';

const Result = ({ searchTerm }) => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <h1>
        Search Results for: <span>{searchTerm}</span>
      </h1>
    </div>
  );
};

export default Result;