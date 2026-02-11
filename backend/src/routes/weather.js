const express = require('express');
const router = express.Router();
const { getCurrentWeather, getForecast } = require('../services/weatherService');
const { validateWeatherQuery, validateCity } = require('../middleware/validate');


/**
 * Limits to keep in mind
 * 	Hourly forecast: unavailable
 * 	Daily forecast: unavailable
 * 	Calls per minute: 60
 * 	3 hour forecast: 5 days
 */

/**
 * GET /api/weather?city=London
 * GET /api/weather?lat=51.5&lon=-0.12
 */
router.get('/weather', validateWeatherQuery, async (req, res, next) => {
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
router.get('/forecast', validateCity, async (req, res, next) => {
    try {
        const data = await getForecast({ q: req.query.city });
        res.json(data);
    } catch (err) {
        next(err);
    }
});

module.exports = router;
