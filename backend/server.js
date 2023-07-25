// Understanding YouTube api
// https://github.com/ThioJoe/YT-Spammer-Purge/wiki/Understanding-YouTube-API-Quota-Limits

// Libraries and constants
require('dotenv').config();

//MongoDB
//require("./database").connect();

const {google} = require('googleapis');
const express = require("express");
const app = express();
const port = 3000;
// const baseUrl = "https://www.googleapis.com/youtube/v3"
const YouTube = google.youtube({
    version: 'v3',
    auth: process.env.APIKEY,  
});

// example request link https://www.googleapis.com/youtube/v3/search?key=apiKey&type=video&part=snippet&q=test

// Basic get call
app.get('/', (req, res) => {
    res.send('API looking good.');
});

app.get('/search-with-googleapis', async (req, res, next) => {
    try {
        const searchQuery = req.query.search_query;

        const response = await YouTube.search.list({
            part: "snippet",
            q: searchQuery,
            type: 'channel',
            maxResults: 25,
        });
        // Raw Json
        res.send(response);

        // Break down to description
        // const description = response.data.items.map((item) => item.snippet.description);
        // res.send(description);

        // Break down to just titles
        //const titles = response.data.items.map((item) => item.snippet.title);
        //res.send(titles);

    } catch (err) {
        next(err);
    };
});

// Comments
app.get('/comments-with-googleapis', async (req, res, next) => {
    try {

        const response = await YouTube.commentThreads.list({
            part: "snippet",
            videoId: "OVBn43UZ04c",
            maxResults: 50,
        });
        // Raw Json
        res.send(response);
    } catch (err) {
        next(err);
    };
});

// Making sure server works
app.listen(port, () => {
    console.log("App is running.");
});


app.get('/channels-with-googleapis', async (req, res, next) => {
    try {
        const channelQ = req.query.channel_query;

        const response = await YouTube.channels.list({
            part: "statistics",
            forUsername: channelQ,
        });

        res.send(response);



    } catch (err) {
        next(err);
    };
});

app.get('/playlists-with-googleapis', async (req, res, next) => {
    try {
        const playlistQ = req.query.playlist_query;

        const response = await YouTube.playlists.list({
            part: "snippet",
            channelId: playlistQ,
            maxResults: 50,
        });

        res.send(response)

        // const titles = response.data.items.map((item) => item.snippet.title);
        // res.send(titles);

    } catch (err) {
        next(err);
    };
});

app.get('/commentThreads-with-googleapis', async (req, res, next) => {
    try {
        const ctQ = req.query.ct_query;

        const response = await YouTube.commentThreads.list({
            part: "snippet",
            videoId: ctQ,
            maxResults: 100,
        });

        //res.send(response)

        const comments = response.data.items.map((item) => item.snippet.topLevelComment.snippet.textOriginal);
        res.send(comments);

    } catch (err) {
        next(err);
    };
});

