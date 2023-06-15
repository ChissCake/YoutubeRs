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
    iamgeUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/YouTube_full-color_icon_%282017%29.svg/159px-YouTube_full-color_icon_%282017%29.svg.png?2021101507481',
    imageSize: 100,
    width: 120,
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
       <div className="home-page">

       <div className="youtube-text">YourTubeRs</div>
      
    
      
      
      <img
        src = {image.iamgeUrl}
        style={{
            width: image.width,
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
      

    </div>
  );
}

export default App;
