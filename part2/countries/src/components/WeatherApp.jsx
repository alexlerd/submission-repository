// WeatherApp component for fetching and diplaying weather data
import React, { useState, useEffect } from "react";
import axios from "axios";

const WeatherApp = ({ capital }) => {
  const [temperature, setTemperature] = useState(null);
  const [windSpeed, setWindSpeed] = useState(null);

  useEffect(() => {
    // Use environment variable for API key
    const apiKey = process.env.REACT_APP_OPENWEATHERMAP_API_KEY;

    // Make API request
    axios
      .get(
        `http://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${apiKey}&units=metric`
      )
      .then((response) => {
        // Update state with weather data
        setTemperature(response.data.main.temp);
        setWindSpeed(response.data.wind.speed);
      })
      .catch((error) => {
        console.error("Error fetching weather data: ", error);
      });
  }, [capital]); // Dependency array

  // Render weather data
  return (
    <div>
      <h2>Weather in {capital}</h2>
      <p>
        <strong>Temperature:</strong> {temperature}°C
      </p>
      <p>
        <strong>Wind:</strong> {windSpeed} m/s
      </p>
    </div>
  );
};

export default WeatherApp;
