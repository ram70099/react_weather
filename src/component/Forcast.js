import React from 'react';
import { Sun, Moon, Cloud, CloudRain, CloudLightning } from 'lucide-react';

const iconMapping = {
  sun: Sun,
  cloud: Cloud,
  'cloud-rain': CloudRain,
  'cloud-lightning': CloudLightning,
};

const Forecast = ({ forecast, onSelectForecast }) => {
  return (
    <div className="forecast">
      <h3>7-Day Forecast</h3>
      <div className="forecast-grid">
        {forecast.map((day, index) => {
          const ForecastIcon = iconMapping[day.icon];
          return (
            <div
              className="forecast-card"
              key={index}
              onClick={() => onSelectForecast(day)}
              style={{ cursor: 'pointer' }}
            >
              <p className="forecast-date">{day.date}</p>
              <div className="forecast-icon">
                {ForecastIcon && <ForecastIcon style={{ width: '3rem', height: '3rem' }} />}
              </div>
              <div className="forecast-temps">
                <div className="temp-item">
                  <Sun className="icon-yellow" />
                  <span className="day-temp">{day.dayTemp}°</span>
                </div>
                <div className="temp-item">
                  <Moon className="icon-blue" />
                  <span className="night-temp">{day.nightTemp}°</span>
                </div>
              </div>
              <p className="forecast-description">{day.description}</p>
              {/* Additional Weather Information */}
              <div className="forecast-details">
                <div className="detail-item">
                  <span className="detail-label">Humidity:</span>
                  <span className="night-temp">{day.humidity}%</span>
                </div>
                
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Forecast;
