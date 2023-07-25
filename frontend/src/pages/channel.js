import React from 'react';

const Channel = () => {
  return (
    <div className="channel-page">
      <header className="channel-header">
        <div className="channel-avatar">
          <img src="channel-avatar.jpg" alt="Channel Avatar" />
        </div>
        <div className="channel-info">
          <h1 className="channel-name">My Awesome Channel</h1>
          <p className="channel-description">Welcome to my channel! Here you'll find amazing content on various topics.</p>
          <ul className="channel-stats">
            <li>
              <span className="stat-label">Subscribers:</span> <span className="stat-value">100,000</span>
            </li>
            <li>
              <span className="stat-label">Videos:</span> <span className="stat-value">500</span>
            </li>
            <li>
              <span className="stat-label">Views:</span> <span className="stat-value">10,000,000</span>
            </li>
          </ul>
        </div>
      </header>
      <section className="channel-content">
        <h2 className="section-title">Latest Videos</h2>
        <div className="video-list">
          <div className="video-item">
            <img src="video-thumbnail1.jpg" alt="Video Thumbnail" />
            <h3 className="video-title">Video 1</h3>
            <p className="video-description">Description of Video 1</p>
          </div>
          <div className="video-item">
            <img src="video-thumbnail2.jpg" alt="Video Thumbnail" />
            <h3 className="video-title">Video 2</h3>
            <p className="video-description">Description of Video 2</p>
          </div>
          {/* Add more video items */}
        </div>
      </section>
    </div>
  );
};

export default Channel;