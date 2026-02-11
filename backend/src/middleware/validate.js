const CITY_REGEX = /^[a-zA-Z\s\-.']+$/;
const MAX_CITY_LENGTH = 100;

/**
 * Validates the `city` query parameter.
 * - Must be a non-empty string
 * - Only letters, spaces, hyphens, dots, and apostrophes
 * - Max 100 characters
 */
function validateCity(req, res, next) {
    const { city } = req.query;

    if (!city || typeof city !== 'string' || city.trim().length === 0) {
        return res.status(400).json({
            error: 'Missing required query parameter: city',
        });
    }

    const trimmed = city.trim();

    if (trimmed.length > MAX_CITY_LENGTH) {
        return res.status(400).json({
            error: `City name must be ${MAX_CITY_LENGTH} characters or fewer`,
        });
    }

    if (!CITY_REGEX.test(trimmed)) {
        return res.status(400).json({
            error: 'City name contains invalid characters',
        });
    }

    // Normalize the city name on the request for downstream use
    req.query.city = trimmed;
    next();
}

/**
 * Validates `lat` and `lon` query parameters.
 * - Both must be present
 * - lat must be a number in [-90, 90]
 * - lon must be a number in [-180, 180]
 */
function validateCoords(req, res, next) {
    const { lat, lon } = req.query;

    if (lat === undefined || lon === undefined) {
        return res.status(400).json({
            error: 'Both lat and lon query parameters are required',
        });
    }

    const latitude = Number(lat);
    const longitude = Number(lon);

    if (Number.isNaN(latitude) || latitude < -90 || latitude > 90) {
        return res.status(400).json({
            error: 'lat must be a number between -90 and 90',
        });
    }

    if (Number.isNaN(longitude) || longitude < -180 || longitude > 180) {
        return res.status(400).json({
            error: 'lon must be a number between -180 and 180',
        });
    }

    next();
}

/**
 * Combined validator for the /api/weather endpoint.
 * Accepts EITHER `city` OR (`lat` & `lon`), but not neither.
 */
function validateWeatherQuery(req, res, next) {
    const { city, lat, lon } = req.query;

    // If city is provided, validate it
    if (city) {
        return validateCity(req, res, next);
    }

    // If coordinates are provided, validate them
    if (lat !== undefined || lon !== undefined) {
        return validateCoords(req, res, next);
    }

    // Neither was provided
    return res.status(400).json({
        error: 'Provide either a city name or lat/lon coordinates',
    });
}

module.exports = { validateCity, validateCoords, validateWeatherQuery };
