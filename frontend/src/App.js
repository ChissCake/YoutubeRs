import React, { useState } from 'react';
import './App.css';
import Navbar from './components';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages';
import About from './pages/about';
import Events from './pages/events';
import Search from './pages/search';
import SignUp from './pages/signup';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const image = {
    iamgeUrl: 'https://yt3.googleusercontent.com/584JjRp5QMuKbyduM_2k5RlXFqHJtQ0qLIPZpwbUjMJmgzZngHcam5JMuZQxyzGMV5ljwJRl0Q=s176-c-k-c0x00ffffff-no-rj',
    imageSize: 100,
  }
  
  const search = (e) => {
    e.preventDefault();
    console.log('Search term:', searchTerm);
  };


  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' exact component={Home} />
          <Route path='/about' component={About} />
          <Route path='/events' component={Events} />
          <Route path='/search' component={Search} />
          <Route path='/sign-up' component={SignUp} />
        </Routes>
      </Router>
      <h1 >YourTubeRs</h1>
    
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
