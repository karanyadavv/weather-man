const axios = require('axios');

const API_KEY = process.env.WEATHER_API_KEY;
const BASE_URL = process.env.WEATHER_API_URL;

/**
 * Fetch current weather and normalize the response.
 * @param {object} params — { q: 'London' } or { lat: 51.5, lon: -0.12 }
 */
async function getCurrentWeather(params) {
    const { data } = await axios.get(`${BASE_URL}/weather`, {
        params: { ...params, appid: API_KEY, units: 'metric' },
    });

    return {
        location: {
            city: data.name,
            country: data.sys.country,
        },
        current: {
            tempC: data.main.temp,
            feelsLikeC: data.main.feels_like,
            condition: data.weather[0].main,
            humidity: data.main.humidity,
            windKph: +(data.wind.speed * 3.6).toFixed(1), // m/s → km/h
            updatedAt: new Date(data.dt * 1000).toISOString(),
        },
    };
}

/**
 * Fetch 5-day / 3-hour forecast and normalize the response.
 * @param {object} params — { q: 'London' }
 */
async function getForecast(params) {
    const { data } = await axios.get(`${BASE_URL}/forecast`, {
        params: { ...params, appid: API_KEY, units: 'metric' },
    });

    return {
        location: {
            city: data.city.name,
            country: data.city.country,
        },
        forecast: data.list.map((item) => ({
            time: new Date(item.dt * 1000).toISOString(),
            tempC: item.main.temp,
            condition: item.weather[0].main,
        })),
    };
}

module.exports = { getCurrentWeather, getForecast };
