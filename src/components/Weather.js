import React from "react";
import './Weather.css'
import { FaTemperatureHigh, FaWind, FaTint } from "react-icons/fa";

const Weather= ({data}) => {
    return (
        <div 
        className="weather-container">
            <h2> {data.name}, {data.sys.country} </h2>
            <h3>
                {data.weather[0].description}
            </h3>
            <img src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} alt="weather icon" />
             <div
             className="temperature">
                 <FaTemperatureHigh />
                     {Math.round(data.main.temp)}°C
             </div>
             <div
             className="détails">
             <p>   <FaWind /> Wind :{data.wind.speed} m/s </p>
             <p>   <FaTint /> Humidity :{data.main.humidity}% </p>
             </div>
        </div>
    );
};
export default Weather;