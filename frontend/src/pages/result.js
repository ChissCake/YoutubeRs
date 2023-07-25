import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Result = () => {
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const apiKey = 'YOUR_YOUTUBE_API_KEY';
        const response = await axios.get(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&q=YOUR_SEARCH_QUERY&type=video&key=${apiKey}&maxResults=5`
        );
        setSearchResults(response.data.items);
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    };

    fetchSearchResults();
  }, []);

  return (
    <div>
      <h1>Top 5 Search Results:</h1>
      {searchResults.map((result) => (
        <div key={result.id.videoId}>
          <img src={result.snippet.thumbnails.default.url} alt={result.snippet.title} />
          <h3>{result.snippet.title}</h3>
          <p>{result.snippet.channelTitle}</p>
        </div>
      ))}
    </div>
  );
};

export default Result;
