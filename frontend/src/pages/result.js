import React from 'react';

import axios from 'axios';
import {useEffect, useState} from 'react';
import { useLocation } from 'react-router-dom';
import './result.css';

const SearchResultPage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchTerm = searchParams.get('query');

  const [channels, setChannels] = useState([]);

  const getChannels = async () =>{
    try {
      const response = await axios.get(`/search-with-googleapis?search_query=${searchTerm}`);
      console.log("It fetched the data")
      const jsonData = response.data.data.items
      setChannels(jsonData)
      console.log(JSON.stringify(response.data.data))
    } catch (error) {
      console.log("error fetching channels:", error);
    }
  }


  useEffect(() => {
    getChannels();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return (
    <div className="search-results-container">
      <h1>Top 5 Search Results: {searchTerm}</h1>
      {channels.map((result) => 
        (
        <div className="search-result-item" key={result.snippet.channelId}>
          <a href={`/channel?channel_id=${result.snippet.channelId}`}>
            <img src={result.snippet.thumbnails.default.url} alt={result.snippet.title} />
          </a>
          <div className="result-details">
            <a href={`/channel?channel_id=${result.snippet.channelId}&channel_name=${result.snippet.title}&img=${result.snippet.thumbnails.default.url}`}>
              <h3 >{result.snippet.title}</h3>
            </a>
            <a href={`/channel?channel_id=${result.snippet.channelId}`}>
              <p>{"Subcount"}</p>
            </a>
          </div>
        </div>
      ))}
    
    
      
    </div>
  );
};




export default SearchResultPage;
