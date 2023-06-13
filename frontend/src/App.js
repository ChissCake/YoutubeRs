import React, { useState } from 'react';
import './App.css';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const image = {
    iamgeUrl: 'https://yt3.googleusercontent.com/584JjRp5QMuKbyduM_2k5RlXFqHJtQ0qLIPZpwbUjMJmgzZngHcam5JMuZQxyzGMV5ljwJRl0Q=s176-c-k-c0x00ffffff-no-rj',
    imageSize: 220,
  }
  
  const search = (e) => {
    e.preventDefault();
    console.log('Search term:', searchTerm);
  };


  return (
    <div>
   
      <h1 >YouTubeRs</h1>
    
      <img
        src = {image.iamgeUrl}
        style={{
            width: image.imageSize,
            height: image.imageSize
         }}

      ></img>
      <from onsubmit = {search}>
        <input 
            type = "text"
            value = {searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search..."
        ></input>
        <button type="submit">Search</button>
      </from>
    </div>
  );
}

export default App;
