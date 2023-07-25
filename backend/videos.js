// Libraries and constants
const asyncHandler = require('express-async-handler')
require('dotenv').config();
//require('dotenv').config({path:'../.env'})
//require("dotenv").config({ path: __dirname + `/../.env.test` }); 


const {google} = require('googleapis');
const express = require("express");
const app = express();
const port = 3000;
// const baseUrl = "https://www.googleapis.com/youtube/v3"
const YouTube = google.youtube({
    version: 'v3',
    auth: process.env.APIKEY,  
});

// Basic get call
app.get('/', (req, res) => {
    res.send('API looking good.');
});

// Making sure server works
app.listen(port, () => {
    console.log("App is running.");
});

function toDictionary (titles, channelIDs) {
    let dict = {}
    for (let i = 0; i < titles.length; i++) {
        dict[titles[i]] = channelIDs[i];
    }
    return dict
}



app.get('/search-with-googleapis', asyncHandler(async (req, res, next) => {
    let searchQuery = req.query.search_query;
    let response = await YouTube.search.list({
        part: "snippet",
        q: searchQuery,
        type: 'channel',
        maxResults: 5,
    });
        
    // Break down to just titles
    const titles = response.data.items.map((item) => item.snippet.title);
    const channelIDs = response.data.items.map((item) => item.snippet.channelId)
    let channels = toDictionary(titles, channelIDs)
    res.send(channels)
}));

app.get('/channel-videos', asyncHandler(async (req, res, next) => {

    const channelID = req.query.channel_id;
    const response = await YouTube.search.list({
        part: "snippet",
        channelId: channelID,
        type: 'video',
        maxResults: 50,
        order: 'rating',
    });
        
    const titles = response.data.items.map((item) => item.snippet.title);
    res.send(titles)

}));

app.get('/videos-stats', asyncHandler(async (req, res, next) => {

    const videoID = req.query.video_id;
    const response = await YouTube.videos.list({
        part: "statistics",
        id: videoID,
    });
        
    res.send(response)

}));


// http://localhost:3000/comment-threads?video_id=bGBYKAspeZw
app.get('/comment-threads', asyncHandler(async (req, res, next) => {

    const videoID = req.query.video_id;
    const response = await YouTube.commentThreads.list({
        part: "snippet",
        videoId: videoID,
        maxResults: 100,
        order: "relevance",
    });

    

    const comment = response.data.items.map((item) => item.snippet.topLevelComment.snippet.textOriginal);
    const commenterChannel = response.data.items.map((item) => item.snippet.topLevelComment.snippet.authorDisplayName);
    const channelComment = toDictionary(comment, commenterChannel);
    
    var secondCall = require('./sentiment.js');
    var sum = 0;
    for (let i = 1; i < 100; i++){
        res.write(comment[i] + "\n");
        sum = sum + secondCall(comment[i]);
    }
    console.log(sum);
    //res.send(response)

}));