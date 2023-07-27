// Libraries and constants
require('dotenv').config();
const {google} = require('googleapis');
const express = require("express");
const app = express();
const port = 8000;
const YouTube = google.youtube({
    version: 'v3',
    auth: process.env.APIKEY,  
});

//const cors = require("cors");
const asyncHandler = require('express-async-handler')
require('dotenv').config();


//app.use(cors());
//app.use(express.json());


app.get("/message", (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.get("/channel", (req, res) => {
    res.json({ message: "channels" });
  });

app.post("/channels", (req, res) => {
    const { package } = req.body
    console.log(package)
    if (!package){
        return res.status(400).send({status: 'failed'})
    }
    res.status(200).send({status: 'recieved'})
})

app.listen(port, () => {
  console.log(`Server is running on port 8000.`);
});


app.get('/search-with-googleapis', asyncHandler(async (req, res, next) => {
    let searchQuery = req.query.search_query
    let response = await YouTube.search.list({
        part: "snippet",
        q: searchQuery,
        type: 'channel',
        maxResults: 5,
    });
        
    // Break down to just titles
    const titles = response.data.items.map((item) => item.snippet.title);
    
    res.send({titles})
}));
