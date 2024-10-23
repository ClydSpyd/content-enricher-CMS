// rssRoutes.js
const express = require('express');
const fetchRSSFeed = require('../utilities/rssParser');
const router = express.Router();

// Define the /api/rss route
router.get('/', async (req, res) => {
    const rssUrl = req.query.feed;

    try {
        const rssData = await fetchRSSFeed(rssUrl); 
        console.log("RSS Data: ", rssData);
        res.json(rssData); // Send the parsed feed as JSON
    } catch (error) {
        res.status(500).json({ error: error.message }); // Handle errors
    }
});

// Export the router so it can be used in server.js
module.exports = router;
