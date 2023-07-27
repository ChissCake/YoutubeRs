// Libraries and constants
import axios from 'axios';
const asyncHandler = require('express-async-handler')
require('dotenv').config();
const {google} = require('googleapis');
const express = require("express");


const port = 3000;
const app = express();
const YouTube = google.youtube({
    version: 'v3',
    auth: process.env.APIKEY,  
});

const getChannels = asyncHandler(async (query) =>{
    const response = await axios.get("https://www.googleapis.com/youtube/v3/search?key=AIzaSyDHjhB55h7ecOjTv_IAEidzr5WOwd1cyQU&part=snippet&q="+{query}+"&type=channel&maxResults=5");
    await setChannels(response.data)

})

// asyncHandler(async (req, res, next) => {
//     let searchQuery = req.query.search_query;
//     let response = await YouTube.search.list({
//         part: "snippet",
//         q: searchQuery,
//         type: 'channel',
//         maxResults: 5,
//     });
        
//     // Break down to just titles
//     const titles = response.data.items.map((item) => item.snippet.title);
//     //const channelIDs = response.data.items.map((item) => item.snippet.channelId)
//     //let channels = toDictionary(titles, channelIDs)
//     res.send(titles)
// })