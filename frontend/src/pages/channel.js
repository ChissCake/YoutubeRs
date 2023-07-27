/* eslint-disable jsx-a11y/alt-text */
// ChannelPage.js
import React, { useState, useEffect } from 'react';
import './channelPage.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const ChannelPage = () => {
  //const { channelId } = useParams();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const channelId = searchParams.get('channel_id');
  const channelName = searchParams.get('channel_name');
  const channelPFP = searchParams.get('img');
  
  // Replace this static content with actual data fetched from an API or other source
  const [videos, setVideos] = useState([]);
  const [channel, setChannel] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingVideos, setLoadingVideos] = useState(true);

  const getVideos = async () =>{
    try {
      const response = await axios.get(`/list-videos?channel_id=${channelId}`);
      console.log("It fetched the data")
      const jsonData = response.data.data
      setVideos(jsonData)
      setLoadingVideos(false)
      console.log(JSON.stringify(jsonData))
    } catch (error) {
      console.log("error fetching channels:", error);
      setLoadingVideos(false)
    }
  }

  

  const getChannel = async () =>{
    try {
      const response = await axios.get(`/channel-stats?channel_id=${channelId}`);
      console.log("It fetched the data")
      const jsonData = response.data.data
      setChannel(jsonData.items[0])
      setLoading(false)
      console.log(JSON.stringify(jsonData))
      
    } catch (error) {
      console.log("error fetching channels:", error);
      setLoading(false)
    }
  }

  useEffect(() => {
    getVideos();
    getChannel();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  const channelData = {  
    channelName: channelId,
    thumbnail: 'https://example.com/thumbnail1.jpg',
    subscribeAccount: '@CapstoneYouTubeRs',
    description: 'Welcome to Channel 1! This is a sample channel page for Channel 1.',
    reviews: 100, 
    
  };


// Filter stuff

  const [filters, setFilters] = useState({
    relevance: true, // Filter by relevance (default: true)
    mostReviewed: false, // Filter by most reviewed (default: false)
  });

  const toggleFilter = (filterName) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: !prevFilters[filterName],
    }));
  };

  const filteredChannels = Object.values(channelData).filter((channel) => {
    if (filters.relevance) {
      // Apply relevance filter (if checked)
      return true; // You can add more specific relevance conditions here
    }
    if (filters.mostReviewed) {
      // Apply most reviewed filter (if checked)
      return channel.reviews > 0; // Only show channels with reviews (you can customize the condition)
    }
    return true; // Show all channels if no filters are checked
  });

  return (
    <div className="channel-container">
      

    {/* <div>
      <h1>channel name</h1>
      <img src={channel.snippet.thumbnails.default.url} alt={channel.snippet.title} />
      <p></p>
      <p>{channel.snippet.description}</p>
    </div> */}
      {loading ? ( // Show loading message or spinner while waiting for data
        <div>Loading...</div>
      ) : channel ? ( // Check if channel data is available
        <div>
          <h1>{channelName}</h1>
          <img src={channelPFP} />
          <p>Sub Count: {channel.statistics.subscriberCount}</p>
        </div>
      ) : ( // Channel data not available (e.g., no channel found with the given ID)
        <div>Channel not found</div>
      )}

      <div className="filter-section">
        <label>
          <input
            type="checkbox"
            checked={filters.relevance}
            onChange={() => toggleFilter('relevance')}
          />
          Filter by Relevance
        </label>

        <label>
          <input
            type="checkbox"
            checked={filters.mostReviewed}
            onChange={() => toggleFilter('mostReviewed')}
          />
          Filter by Most Reviewed
        </label>
      </div>
      
      <div style={{ marginBottom: '50px' }}></div>
      <div className="sample-pictures-container">
        {loadingVideos ? ( // Show loading message or spinner while waiting for videos data
          <div>Loading videos...</div>
        ) : (
          <div className="grid-container">
            {videos.items.map((video) => (
              <div key={video.snippet.title} className="grid-item">
                <img src={video.snippet.thumbnails.default.url} />
                <p>{video.snippet.title}</p>
              </div>
            ))}
            
          </div>
        )}


        {/* {videos.map((video) => (
          <div key={video.id} className="grid-item">
            <img src={video.snippet.thumbnails.default.url} />
            <p>Likes: 1</p>
            <p>Total Views: 1</p>
          </div>
        ))} */}
      </div>
    </div>
  );
};

export default ChannelPage;
