// ChannelPage.js
import React, { useState } from 'react';
import './channelPage.css';
import { useParams } from 'react-router-dom';

const ChannelPage = () => {
  const { channelId } = useParams();

  // Replace this static content with actual data fetched from an API or other source
  const channelData = {
    videoId1: {
      channelName: 'Channel 1',
      thumbnail: 'https://example.com/thumbnail1.jpg',
      subscribeAccount: '@CapstoneYouTubeRs',
      description: 'Welcome to Channel 1! This is a sample channel page for Channel 1.',
      reviews: 100, 
    },
    videoId2: {
      channelName: 'Channel 2',
      description: 'Welcome to Channel 2! This is a sample channel page for Channel 2.',
      reviews: 100, 
    },
    videoId3: {
      channelName: 'Channel 3',
      description: 'Welcome to Channel 3! This is a sample channel page for Channel 3.',
      reviews: 100, 
    },
    videoId4: {
      channelName: 'Channel 4',
      description: 'Welcome to Channel 4! This is a sample channel page for Channel 4.',
      reviews: 100, 
    },
    videoId5: {
      channelName: 'Channel 5',
      description: 'Welcome to Channel 5! This is a sample channel page for Channel 5.',
      reviews: 100, 
    },
  };

  const samplePictures = [
    {
      id: 'picture1',
      thumbnail: 'https://example.com/picture1.jpg',
      likes: 500,
      views: 15000,
    },
    {
      id: 'picture2',
      thumbnail: 'https://example.com/picture2.jpg',
      likes: 300,
      views: 7500,
    },

    {
      id: 'picture3',
      thumbnail: 'https://example.com/picture2.jpg',
      likes: 300,
      views: 7500,
    },

    {
      id: 'picture4',
      thumbnail: 'https://example.com/picture2.jpg',
      likes: 300,
      views: 7500,
    },

    {
      id: 'picture5',
      thumbnail: 'https://example.com/picture2.jpg',
      likes: 300,
      views: 7500,
    },

    {
      id: 'picture6',
      thumbnail: 'https://example.com/picture2.jpg',
      likes: 300,
      views: 7500,
    },

    {
      id: 'picture7',
      thumbnail: 'https://example.com/picture2.jpg',
      likes: 300,
      views: 7500,
    },
    {
      id: 'picture8',
      thumbnail: 'https://example.com/picture2.jpg',
      likes: 300,
      views: 7500,
    },

    {
      id: 'picture9',
      thumbnail: 'https://example.com/picture2.jpg',
      likes: 300,
      views: 7500,
    },

 
    
  ];

  const currentChannel = channelData[channelId] || {
    channelName: 'Unknown Channel',
    description: 'This channel information is not available.',
  };

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
      <h1>{currentChannel.channelName}</h1>
      
      <img src={currentChannel.thumbnail} alt={currentChannel.channelName} />
      <p>{currentChannel.subscribeAccount}</p>

      <p>{currentChannel.description}</p>

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
      <div className="grid-container">
        {samplePictures.map((picture) => (
          <div key={picture.id} className="grid-item">
            <img src={picture.thumbnail} alt={`Picture ${picture.id}`} />
            <p>Likes: {picture.likes}</p>
            <p>Total Views: {picture.views}</p>
          </div>
        ))}
      </div>
      </div>
    </div>
  );
};

export default ChannelPage;
