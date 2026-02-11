# Weather Man

A full-stack weather application that lets users search for any city and view current conditions plus a 5-day / 3-hour forecast. Built with **React** on the frontend and **Express** on the backend, powered by the [OpenWeatherMap API](https://openweathermap.org/api).

## Features

- **City Search** – Search bar with input validation and form handling
- **Current Weather** – Temperature, feels-like, condition, humidity, and wind speed
- **5-Day Forecast** – 3-hour interval predictions grouped by day in a responsive grid
- **Weather Icons** – Emoji-based icons mapped to weather conditions
- **Skeleton Loading** – Card-shaped skeleton loaders during data fetching
- **Error Handling** – Contextual messages for city-not-found, rate limits, and API failures with retry support
- **Responsive Design** – Works on mobile, tablet, and desktop

## Tech Stack

| Layer    | Technology                                                        |
| -------- | ----------------------------------------------------------------- |
| Frontend | React 19, Vite 7, Tailwind CSS 4                                 |
| Backend  | Node.js, Express 5, Axios                                        |
| API      | [OpenWeatherMap](https://openweathermap.org/) (free tier)         |

## Project Structure

```
weather-man/
├── backend/
│   └── src/
│       ├── index.js              # Express server entry point
│       ├── routes/weather.js     # GET /api/weather, GET /api/forecast
│       ├── services/weatherService.js  # OpenWeatherMap calls + data normalization
│       └── middleware/
│           ├── validate.js       # City name & coordinate validation
│           └── errorHandler.js   # Maps upstream errors to clean responses
├── frontend/
│   └── src/
│       ├── api/weatherApi.js     # Axios client for backend communication
│       ├── components/
│       │   ├── SearchBar.jsx     # City input + search button
│       │   ├── WeatherCard.jsx   # Current weather display
│       │   ├── ForecastList.jsx  # 5-day forecast grid
│       │   ├── Skeleton.jsx      # Loading skeleton loaders
│       │   └── ErrorMessage.jsx  # Error state with retry
│       └── config/condition.js   # Weather condition → emoji icon map
└── Readme.md
```

## Prerequisites

- **Node.js** v18 or higher
- **npm** v9 or higher
- An **OpenWeatherMap API key** (free tier works)

## Getting an API Key

1. Go to [openweathermap.org](https://openweathermap.org)
2. Click **Get API Key** button and then Sign in or create a free account
3. Go to **My API Keys** in your account dashboard
4. Copy your key — it will be used in the backend `.env` file

## Setup & Installation

### 1. Clone the repository

```bash
git clone https://github.com/karanyadavv/weather-man.git
cd weather-man
```

### 2. Set up the backend

```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` directory:

```env
PORT=3001
WEATHER_API_KEY=your_openweathermap_api_key_here
WEATHER_API_URL=https://api.openweathermap.org/data/2.5
```

Start the backend:

```bash
npm run dev
```

The server runs at `http://localhost:3001`.

### 3. Set up the frontend

Open a new terminal:

```bash
cd frontend
npm install
npm run dev
```

The app runs at `http://localhost:5173` (or the next available port).

> The Vite dev server proxies `/api` requests to `http://localhost:3001`, so both servers must be running.

## API Endpoints

| Method | Endpoint              | Query Params          | Description             |
| ------ | --------------------- | --------------------- | ----------------------- |
| GET    | `/api/weather`        | `city` or `lat`+`lon` | Current weather         |
| GET    | `/api/forecast`       | `city`                | 5-day / 3-hour forecast |
| GET    | `/api/health`         | —                     | Health check            |

### Example Response – `/api/weather?city=London`

```json
{
  "location": { "city": "London", "country": "GB" },
  "current": {
    "tempC": 12.5,
    "feelsLikeC": 10.2,
    "condition": "Clouds",
    "humidity": 72,
    "windKph": 18.4,
    "updatedAt": "2026-02-11T18:00:00.000Z"
  }
}
```

## Assumptions & Limitations

- **Free tier limits** – OpenWeatherMap's free plan allows 60 calls/minute and 1,000,000 calls/month. There is no caching layer, so every search makes two API calls (weather + forecast).
- **Forecast granularity** – The free tier only provides 3-hour interval forecasts (not hourly). Daily summaries are not available; the app groups the 3-hour entries by day.
- **Temperature units** – All temperatures are in **Celsius** (metric). There is currently no toggle for Fahrenheit.
- **No geolocation** – The app searches by city name only in the UI. The backend supports lat/lon queries but the frontend does not use this yet.
- **No persistent state** – Search results are not cached or saved. Refreshing the page clears all data.
