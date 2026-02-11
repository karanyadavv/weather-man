import { useState } from 'react';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import ForecastList from './components/ForecastList';
import { getCurrentWeather, getForecast } from './api/weatherApi';
import './App.css';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (city) => {
    setLoading(true);
    setError(null);
    try {
      const [weather, forecast] = await Promise.all([
        getCurrentWeather(city),
        getForecast(city),
      ]);
      setWeatherData(weather);
      setForecastData(forecast);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch weather data');
      setWeatherData(null);
      setForecastData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center mt-10 px-4 py-12">
      <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-2 tracking-tight">
        Weather Man
      </h1>
      <p className="text-gray-800/50 mb-8 text-base">
        Search any city to get the latest weather
      </p>
      <SearchBar onSearch={handleSearch} />

      {loading && (
        <p className="mt-8 text-gray-500 animate-pulse">Loading…</p>
      )}

      {error && (
        <p className="mt-8 text-red-500 text-sm">{error}</p>
      )}

      <WeatherCard data={weatherData} />
      <ForecastList data={forecastData} />
    </div>
  );
}

export default App;
