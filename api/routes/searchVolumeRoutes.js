const express = require('express');
const searchVolumeController = require('../controllers/searchVolumeController');

const router = express.Router();

router.post('/search-volume', searchVolumeController.searchVolume);

module.exports = router;
