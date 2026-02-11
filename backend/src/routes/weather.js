const express = require('express');
const router = express.Router();
const { getCurrentWeather, getForecast } = require('../services/weatherService');
/**
 * GET /api/weather?city=London
 * GET /api/weather?lat=51.5&lon=-0.12
 */
router.get('/weather', async (req, res, next) => {
    try {
        const { city, lat, lon } = req.query;
        const params = city ? { q: city } : { lat, lon };
        const data = await getCurrentWeather(params);
        res.json(data);
    } catch (err) {
        next(err);
    }
});

/**
 * GET /api/forecast?city=London
 */
router.get('/forecast', async (req, res, next) => {
    try {
        const data = await getForecast({ q: req.query.city });
        res.json(data);
    } catch (err) {
        next(err);
    }
});

module.exports = router;
