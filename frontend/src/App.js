import React, { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';

import { BrowserRouter as Router, Routes, Route, useNavigate, BrowserRouter } from 'react-router-dom';

import Home from './pages/home';
import Result from './pages/result';
import About from './pages/about';
import Events from './pages/events';
import SignUp from './pages/signup';
import SignIn from './pages/signin';
import ChannelPage from './pages/channel';




function App() {



  return (
    
    
    <div>
     

      <Navbar />
    
      <Routes>
        <Route path='/about' element={<About />} />
        <Route path='/events' element={<Events />} />

        <Route path='/home' element={<Home />} />

        <Route path='/signin' element={<SignIn />} />

        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/result' element={<Result />} />
        <Route path="/channel/:channelId" element={<ChannelPage/>} />
      </Routes>
      </div>
     

 
    
    


);
}

export default App;