import React, { useState, useEffect } from 'react';
import './styles/styles.css';
import { Search, MapPin } from 'lucide-react';
import Forecast from './component/Forcast'; // Import the Forecast component

const apiKey = '13a8763e58314907b5571443250601';

function App() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isDay, setIsDay] = useState(true);

  const defaultCity = 'Ludhiana';

  const getWeather = async (city) => {
    if (!city) {
      setError('Please enter a city name.');
      return;
    }
    setLoading(true);
    setError('');
    setWeatherData(null);
    setForecast([]);

    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=8&aqi=no`
      );
      if (!response.ok) {
        throw new Error(`City not found. Status: ${response.status}`);
      }
      const data = await response.json();

      const {
        location: { name },
        current: { temp_c: temp, feelslike_c, humidity, wind_kph: windSpeed, condition, is_day },
        forecast: { forecastday },
      } = data;

      setWeatherData({
        location: name,
        temperature: temp,
        feelsLike: feelslike_c,
        description: condition.text,
        icon: condition.icon,
        humidity,
        windSpeed,
      });

     

      setForecast(
        forecastday.slice(1).map((day) => ({
          date: new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' }),
          dayTemp: day.day.maxtemp_c,
          nightTemp: day.day.mintemp_c,
          description: day.day.condition.text,
          humidity: humidity,
          icon: day.day.condition.icon, // Placeholder; map API icons to lucide icons if needed
        }))
      );
      setIsDay(is_day);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (event) => {
    event.preventDefault();
    if (city) {
      getWeather(city);
      setCity('');
    }
  };

  const handleForecastClick = (day) => {
    setWeatherData({
      location: weatherData.location,
      temperature: day.dayTemp,
      feelsLike: weatherData.feelsLike,
      description: day.description,
      icon: day.icon, // Use the forecast's icon URL
      humidity: weatherData.humidity,
      windSpeed: weatherData.windSpeed,
    });
    setIsDay(true);
  };

  useEffect(() => {
    getWeather(defaultCity);
  }, []);

  return (
    <div className={`container ${isDay ? 'day' : 'night'}`}>
      <header className="header">
        <div className="title-wrapper">
          <MapPin className="icon-sky" />
          <h1 className="title">Weather Dashboard</h1>
        </div>
        <form className="search-form" onSubmit={handleSearch}>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Search for a city..."
            className="search-input"
          />
          <button type="submit" className="search-button">
            <Search className="icon-sky" />
          </button>
        </form>
      </header>

      {loading && <p className="loading">Loading...</p>}
      {error && <p className="error-message">{error}</p>}

      {weatherData && (
        <>
           <div className="weather-grid">
    {/* Current Weather Card */}
    <div className="weather-card">
      <div className="current-weather">
        <div>
          <h2 className="location">{weatherData.location}</h2>
          <p className="description">{weatherData.description}</p>
          <div className="temperature">{weatherData.temperature}°</div>
        </div>
        <div className="weather-icon">
          {weatherData.icon && (
            <img
              src={weatherData.icon}
              alt={weatherData.description}
              className="icon-large"
            />
          )}
        </div>
      </div>
    </div>

    {/* Weather Details Card */}
    <div className="weather-card weather-details">
      <h3>Weather Details</h3>
      <div className="details-grid">
        <div className="detail-item">
          <span className="detail-label">Humidity</span>
          <span className="detail-value">{weatherData.humidity}%</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Wind Speed</span>
          <span className="detail-value">{weatherData.windSpeed} km/h</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Feels Like</span>
          <span className="detail-value">{weatherData.feelsLike}°</span>
        </div>
      </div>
    </div>
  </div>
          <Forecast forecast={forecast} onSelectForecast={handleForecastClick} />
        </>
      )}
    </div>
  );
}

export default App;
