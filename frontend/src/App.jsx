import { useState, useRef } from 'react';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import ForecastList from './components/ForecastList';
import { WeatherCardSkeleton, ForecastSkeleton } from './components/Skeleton';
import ErrorMessage from './components/ErrorMessage';
import { getCurrentWeather, getForecast } from './api/weatherApi';
import './App.css';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const lastCityRef = useRef('');

  const handleSearch = async (city) => {
    lastCityRef.current = city;
    setLoading(true);
    setError(null);
    setWeatherData(null);
    setForecastData(null);
    try {
      const [weather, forecast] = await Promise.all([
        getCurrentWeather(city),
        getForecast(city),
      ]);
      setWeatherData(weather);
      setForecastData(forecast);
    } catch (err) {
      const status = err.response?.status;
      if (status === 404) {
        setError(`City "${city}" not found. Please check the spelling and try again.`);
      } else if (status === 429) {
        setError('Too many requests. Please wait a moment and try again.');
      } else {
        setError(err.response?.data?.error || 'Failed to fetch weather data. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleRetry = () => {
    if (lastCityRef.current) {
      handleSearch(lastCityRef.current);
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
        <>
          <WeatherCardSkeleton />
          <ForecastSkeleton />
        </>
      )}

      {error && <ErrorMessage message={error} onRetry={handleRetry} />}

      {!loading && !error && (
        <>
          <WeatherCard data={weatherData} />
          <ForecastList data={forecastData} />
        </>
      )}
    </div>
  );
}

export default App;
