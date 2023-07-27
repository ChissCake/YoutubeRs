/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from 'react';
import './Home.css';
import { useNavigate } from 'react-router-dom';

function Home(){
   
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const image = {
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/YouTube_full-color_icon_%282017%29.svg/159px-YouTube_full-color_icon_%282017%29.svg.png?2021101507481',
        imageSize: 100,
        width: 120,
      };
    
    const search = (e) => {
        e.preventDefault();
        console.log('Search term:', searchTerm);
        navigate(`/result?query=${encodeURIComponent(searchTerm)}`);
      };

return (
        
        <div className = "home-page">
            
            <div className = "youtube-text">YoutubeRs</div>
            <img 
                src = {image.imageUrl}
                style={{
                    height:image.imageSize,
                    width:image.width
                

                }}
                ></img>
                <form onSubmit = {search}>
                     <input 
                        type = "text"
                        value = {searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search..."
                     ></input>
                 <button onClick={search} >Search</button>
                 </form>
        </div>
    );
     }
    
    export default Home;
  