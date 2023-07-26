import React from 'react';
import { useLocation } from 'react-router-dom';
import './result.css';

const SearchResultPage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchTerm = searchParams.get('query');
  const searchResults = [
    {
      id: 'videoId1',
      thumbnail: 'https://example.com/thumbnail1.jpg',
      channelName: 'Channel 1',
      subscribeAccount: '@CapstoneYouTubeRs',
    },
    {
      id: 'videoId2',
      thumbnail: 'https://example.com/thumbnail2.jpg',
      channelName: 'Channel 2',
      subscribeAccount: '@CapstoneYouTubeRs',
    },
    {
      id: 'videoId3',
      thumbnail: 'https://example.com/thumbnail3.jpg',
      channelName: 'Channel 3',
      subscribeAccount: '@CapstoneYouTubeRs',
    },
    {
      id: 'videoId4',
      thumbnail: 'https://example.com/thumbnail4.jpg',
      channelName: 'Channel 4',
      subscribeAccount: '@CapstoneYouTubeRs',
    },
    {
      id: 'videoId5',
      thumbnail: 'https://example.com/thumbnail5.jpg',
      channelName: 'Channel 5',
      subscribeAccount: '@CapstoneYouTubeRs',
    },
  ];

  return (
    <div className="search-results-container">
      <h1>Top 5 Search Results: {searchTerm}</h1>
      {searchResults.map((result) => (
        <div className="search-result-item" key={result.id}>
          <a href={`/channel/${result.id}`}>
          <img src={result.thumbnail} alt={result.channelName} />
          </a>
          <div className="result-details">
          <a href={`/channel/${result.id}`}>
            <h3>{result.channelName}</h3>
            </a>
            <a href={`/channel/${result.id}`}>
            <p>{result.subscribeAccount}</p>
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};


export default SearchResultPage;
