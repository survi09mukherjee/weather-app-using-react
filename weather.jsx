import React, { useState } from 'react';
import "../App.css"
const WeatherApp = () => {
  const [location, setLocation] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const apiKey = '54702605c8e8d2fe756eaa5b13c3f9c3';
  const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

  const fetchWeatherData = async () => {
    try {
      const response = await fetch(`${apiUrl}?q=${location}&appid=${apiKey}`);
      const data = await response.json();

      if (response.ok) {
        setWeatherData(data);
      } else {
        console.error('Failed to fetch weather data:', data.message);
        setWeatherData(null);
      }
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setWeatherData(null);
    }
  };

  return (
    <div className="weather-app">
      <h1>Weather App </h1>
      <div className="input-container">
        <input
          type="text"
          placeholder="Enter location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <button onClick={fetchWeatherData}>Get Weather</button>
      </div>

      {weatherData && (
        <div className="weather-info">
          <h2>{weatherData.name}, {weatherData.sys.country}</h2>
          <p>{weatherData.weather[0].description}</p>
          <p>Temperature: {weatherData.main.temp} &#8451;</p>
          <p>Humidity: {weatherData.main.humidity}%</p>
        </div>
      )}
    </div>
  );
};

export default WeatherApp;
