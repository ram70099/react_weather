import React from 'react';

const WeatherDetails = ({ weatherData }) => (
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
    </div>
  </div>
);

export default WeatherDetails;
