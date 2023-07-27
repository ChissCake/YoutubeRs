// Libraries and constants
const asyncHandler = require('express-async-handler')
require('dotenv').config();
//require('dotenv').config({path:'../.env'})
//require("dotenv").config({ path: __dirname + `/../.env.test` }); 

const cors = require('cors');
const {google} = require('googleapis');
const express = require("express");
const app = express();
const port = 8000;
// const baseUrl = "https://www.googleapis.com/youtube/v3"
const YouTube = google.youtube({
    version: 'v3',
    auth: process.env.APIKEY,  
});

app.use(cors());

// Basic get call
app.get('/', (req, res) => {
    res.send('API looking good.');
});

// Making sure server works
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

function toDictionary (titles, channelIDs) {
    let dict = {}
    for (let i = 0; i < titles.length; i++) {
        dict[titles[i]] = channelIDs[i];
    }
    return dict
}
// Use to find the 5 most likely channels
app.get('/search-with-googleapis', asyncHandler(async (req, res, next) => {
    let searchQuery = req.query.search_query; // Access the search term from the route parameters
    let response = await YouTube.search.list({
        part: "snippet",
        q: searchQuery,
        type: 'channel',
        maxResults: 5,
    });
    res.json(response)
}));

var secondCall = require('./sentiment.js');
app.get('/channel-videos', asyncHandler(async (req, res, next) => {
    const ratings = [];
    const channelID = req.query.channel_id;
    const channelResponse = await YouTube.search.list({
        part: "snippet",
        channelId: channelID,
        type: 'video',
        maxResults: 9,
        order: 'rating',
    });
        
    const titles = channelResponse.data.items.map((item) => item.snippet.title);
    const ids = channelResponse.data.items.map((item) => item.id.videoId);
    
    for(let c = 0; c < ids.length; c++){
        var videoID = ids[c];
        const video_stats = await YouTube.videos.list({
            part: "statistics",
            id: videoID,
        });
        const commentCount = video_stats.data.items.map((item) => item.statistics.commentCount);
        var sum = 0;
        if(commentCount[0] != null){
            var videoResponse = await YouTube.commentThreads.list({
                part: "snippet",
                videoId: videoID,
                maxResults: 100,
                order: "relevance",
            });

            var comment = videoResponse.data.items.map((item) => item.snippet.topLevelComment.snippet.textOriginal);

            for (let i = 1; i < comment.length; i++){
                sum = sum + secondCall(comment[i]);
            }
        }
        ratings.push([titles[c], ids[c], sum]);
    }
    ratings.sort(function (a, b)
    {
        if(a[2]<b[2]){
            return 1;
        } else {
            return -1;
        }
    });
    for(let v = 0; v < ids.length; v++){
        console.log(ratings[v]);
    }
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

}));


app.get('/list-videos', asyncHandler(async (req, res, next) => {
    const channelID = req.query.channel_id;
    const response = await YouTube.search.list({
        part: "snippet",
        channelId: channelID,
        type: 'video',
        maxResults: 9,
        order: 'rating',
    });

    res.json(response)

}));

app.get('/videos-stats', asyncHandler(async (req, res, next) => {
    const videoID = req.query.video_id;
    const response = await YouTube.videos.list({
        part: "snippet",
        id: videoID,
        maxResults: 9,
    });

    res.json(response)

}));

// Find information of specific profile from channelId
app.get('/channel-stats', asyncHandler(async (req, res, next) => {
    let channelID = req.query.channel_id; // Access the search term from the route parameters
    let response = await YouTube.channels.list({
        part: "statistics",
        id: channelID,
        maxResults: 10,
    });
        
    res.json(response)

    
}));
