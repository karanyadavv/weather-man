/**
 * Maps upstream Axios / OpenWeatherMap errors to clean client responses.
 */
function errorHandler(err, req, res, _next) {
    console.error('API Error:', err.message);

    // Axios error from OpenWeatherMap
    if (err.response) {
        const status = err.response.status;

        const messages = {
            401: 'Invalid API key — check your WEATHER_API_KEY',
            404: 'City not found',
            429: 'Rate limit exceeded — try again later',
        };

        return res.status(status).json({
            error: messages[status] || `Upstream error (${status})`,
        });
    }

    // Network error (no response received)
    if (err.request) {
        return res.status(502).json({
            error: 'Unable to reach weather provider',
        });
    }

    // Everything else
    res.status(500).json({
        error: 'Internal server error',
    });
}

module.exports = errorHandler;
