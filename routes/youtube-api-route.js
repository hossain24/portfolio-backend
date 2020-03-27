const router = require('express').Router();
const fetch = require('node-fetch');

router.get('/', (req, res, next) => {
    const url = 'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=PLS3XGZxi7cBXDgyMOkFIYf8GwjqLFC_Ku&maxResults=50';
    fetch(`${url}&key=${process.env.GOOGLE_API_KEY}`)
        .then(res => res.json())
        .then(json => {
            res.json(json.items)
        });
});

module.exports = router;