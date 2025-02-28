const express = require('express');
const router = express.Router();
const { validateArtistRequest, fetchArtistsInServiceRegion, getArtistReviews } = require('../controllers/ArtistController');
const { getFeaturedArtists } = require('../controllers/ArtistController');

router.get('/featured', getFeaturedArtists);
router.post('/fetch-artists', validateArtistRequest, fetchArtistsInServiceRegion);
router.get('/artist-reviews/:artistId', getArtistReviews);

module.exports = router;