import React from "react";

const WeatherEffects = ({ condition }) => {
  if (condition.includes("rain")) {
    return (
      <div className="rain absolute top-0 left-0 w-full h-full pointer-events-none">
        {Array.from({ length: 100 }).map((_, i) => (
          <div
            key={i}
            className="raindrop"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 1}s`,
              height: `${5 + Math.random() * 10}px`,
            }}
          ></div>
        ))}
      </div>
    );
  }

  if (condition.includes("snow")) {
    return (
      <div className="snow absolute top-0 left-0 w-full h-full pointer-events-none">
        {Array.from({ length: 100 }).map((_, i) => (
          <div
            key={i}
            className="snowflake"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              width: `${2 + Math.random() * 6}px`,
              height: `${2 + Math.random() * 6}px`,
            }}
          ></div>
        ))}
      </div>
    );
  }

  return null;
};

export default WeatherEffects;
