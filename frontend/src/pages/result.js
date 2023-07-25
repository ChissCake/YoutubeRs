import React from 'react';
import { useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const Result = () => {
  // Use the useParams hook to access the searchTerm from the URL
  const { searchTerm } = useParams();
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
        Top 5 Search Result For: {searchTerm}
      </h1>
    </div>
  );
};

export default Result;