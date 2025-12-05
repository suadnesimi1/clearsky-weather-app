import React from "react";
import { WiDaySunny, WiCloudy, WiRain, WiSnow, WiMoonNew } from "react-icons/wi";

const ForecastCard = ({ data }) => {
  const date = new Date(data.dt * 1000);
  const main = data.weather[0].main.toLowerCase();
  const hour = 12; // simulate mid-day
  const isDay = hour >= 6 && hour < 18;

  const renderIcon = () => {
    if (main.includes("cloud")) return <WiCloudy size={40} />;
    if (main.includes("rain")) return <WiRain size={40} />;
    if (main.includes("snow")) return <WiSnow size={40} />;
    if (main.includes("clear")) return isDay ? <WiDaySunny size={40} /> : <WiMoonNew size={40} />;
    return <WiDaySunny size={40} />;
  };

  const getCardBackground = () => {
    if (main.includes("cloud")) return isDay ? "bg-white bg-opacity-20" : "bg-gray-800 bg-opacity-40";
    if (main.includes("rain")) return isDay ? "bg-blue-400 bg-opacity-30" : "bg-blue-900 bg-opacity-40";
    if (main.includes("snow")) return isDay ? "bg-white bg-opacity-30" : "bg-gray-200 bg-opacity-20";
    if (main.includes("clear")) return isDay ? "bg-yellow-400 bg-opacity-30" : "bg-purple-800 bg-opacity-40";
    return "bg-white bg-opacity-20";
  };

  return (
    <div className={`rounded-2xl shadow-lg p-4 flex flex-col items-center text-white transition-transform transform hover:scale-105 relative overflow-hidden ${getCardBackground()}`}>
      <p className="font-semibold">{date.toLocaleDateString("en-US", { weekday: "short" })}</p>
      {renderIcon()}
      <p className="mt-1 font-bold">{Math.round(data.temp.day)}°C</p>
      <p className="capitalize">{data.weather[0].main}</p>
    </div>
  );
};

export default ForecastCard;
