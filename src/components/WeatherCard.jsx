import React from "react";
import { WiDaySunny, WiCloudy, WiRain, WiSnow, WiMoonNew} from "react-icons/wi";

const WeatherCard = ({ weather }) => {
  const main = weather.weather[0].main.toLowerCase();
  const isDay = new Date().getHours() >= 6 && new Date().getHours() < 18;

  const renderIcon = () => {
    if (main.includes("cloud")) return <WiCloudy size={80} />;
    if (main.includes("rain")) return <WiRain size={80} />;
    if (main.includes("snow")) return <WiSnow size={80} />;
    if (main.includes("clear")) return isDay ? <WiDaySunny size={80} /> : <WiMoonNew  size={80} />;
    return <WiDaySunny size={80} />;
  };

  return (
    <div className="flex flex-col items-center text-white">
      {renderIcon()}
      <h2 className="text-3xl font-bold mt-2">{weather.name}</h2>
      <p className="text-xl capitalize">{weather.weather[0].description}</p>
      <p className="text-5xl font-extrabold mt-2">{Math.round(weather.main.temp)}°C</p>
    </div>
  );
};

export default WeatherCard;
