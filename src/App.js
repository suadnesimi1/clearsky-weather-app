import React, { useState } from "react";
import axios from "axios";
import WeatherCard from "./components/WeatherCard";
import ForecastCard from "./components/ForecastCard";
import WeatherEffects from "./components/WeatherEffects";

const API_KEY = "0867accd62fba21cb2fce680fc92119d";

function App() {
  const [location, setLocation] = useState("");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);

  const fetchWeather = async () => {
    try {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${API_KEY}`
      );
      setWeather(res.data);

      const forecastRes = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast/daily?q=${location}&cnt=7&units=metric&appid=${API_KEY}`
      );
      setForecast(forecastRes.data.list);
    } catch (error) {
      alert("Location not found!");
    }
  };

  const getLocalHour = () => {
    if (!weather) return 12;
    const utcTime = new Date().getTime() + new Date().getTimezoneOffset() * 60000;
    const localTime = new Date(utcTime + weather.timezone * 1000);
    return localTime.getHours();
  };

  const getBackground = () => {
    if (!weather) return "bg-blue-400";
    const main = weather.weather[0].main.toLowerCase();
    const hour = getLocalHour();
    const isDay = hour >= 6 && hour < 18;

    if (main.includes("cloud")) return isDay ? "cloudy-bg" : "cloudy-night-bg";
    if (main.includes("rain")) return isDay ? "rainy-bg" : "rainy-night-bg";
    if (main.includes("snow")) return isDay ? "snowy-bg" : "snowy-night-bg";
    if (main.includes("clear")) return isDay ? "sunny-bg" : "night-bg";

    return "bg-blue-400";
  };

  return (
    <div className={`min-h-screen flex flex-col items-center justify-start p-4 relative ${getBackground()} transition-all duration-1000`}>
      {weather && <WeatherEffects condition={weather.weather[0].main.toLowerCase()} />}

      <h1 className="text-5xl font-extrabold mb-8 drop-shadow-lg text-white">ClearSky</h1>

      <div className="flex w-full max-w-md mb-8">
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Enter city"
          className="flex-grow p-3 rounded-l-xl text-black outline-none shadow-lg"
        />
        <button
          onClick={fetchWeather}
          className="bg-blue-600 p-3 rounded-r-xl shadow-lg hover:bg-blue-700 transition-colors"
        >
          Search
        </button>
      </div>

      {weather && (
        <div className="bg-white bg-opacity-20 backdrop-blur-md p-6 rounded-3xl shadow-xl w-full max-w-md flex flex-col items-center animate-fadeIn">
          <WeatherCard weather={weather} />
        </div>
      )}

      {forecast.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-4 md:grid-cols-7 gap-4 mt-8 w-full max-w-6xl animate-fadeIn">
          {forecast.map((day, index) => (
            <ForecastCard key={index} data={day} />
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
