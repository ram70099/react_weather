
// services/weatherService.js
export const getWeather = async (city) => {
  const apiKey = '13a8763e58314907b5571443250601';

  if (!city) {
    throw new Error('Please enter a city name.');
  }

  const response = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=7&aqi=no`
  );

  if (!response.ok) {
    throw new Error(`City not found. Status: ${response.status}`);
  }

  const data = await response.json();

  const {
    location: { name },
    current: { temp_c: temp, humidity, wind_kph: windSpeed, condition, is_day },
    forecast: { forecastday },
  } = data;

  const weatherData = {
    location: name,
    temperature: temp,
    description: condition.text,
    icon: condition.icon,
    humidity,
    windSpeed,
  };

  const forecast = forecastday.map((day) => ({
    date: new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' }),
    dayTemp: day.day.maxtemp_c,
    nightTemp: day.day.mintemp_c,
    description: day.day.condition.text,
    icon: 'cloud', // Placeholder; update if needed
  }));

  return { weatherData, forecast, isDay: is_day };
};
