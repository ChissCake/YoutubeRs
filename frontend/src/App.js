import React, { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route, useNavigate, BrowserRouter } from 'react-router-dom';
import Home from './pages';
import Result from './pages/result';
import About from './pages/about';
import Events from './pages/events';
import SignUp from './pages/signup';

function App() {
  const image = {
    iamgeUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/YouTube_full-color_icon_%282017%29.svg/159px-YouTube_full-color_icon_%282017%29.svg.png?2021101507481',
    imageSize: 100,
    width: 120,
  };

  const history = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const search = (e) => {
    e.preventDefault();
    console.log('Search term:', searchTerm);
  };

  return (
    
      <div>
      
        <Navbar />
        <Routes>
          <Route path='/about' element={<About />} />
          <Route path='/events' element={<Events />} />
          <Route path='/sign-up' element={<SignUp />} />
          <Route path="/result" element={<Result searchTerm={searchTerm}/>} />
        </Routes>
         

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
            <button onClick={()=> history("/result")}>Search</button>
          </from>
        </div>
      </div>
    
  );
}

export default App;
