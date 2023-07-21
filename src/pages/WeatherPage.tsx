import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";

const WeatherPage: React.FC = () => {
  const cityName = React.useRef();

  const [city, setCity] = useState<any>(null);

  async function getWeather() {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName.current.value}&appid=042b2ee2c83661dfb42ab95b64d38260&lang=ru&units=metric`
      );

      const templateData = response.data;

      setCity(templateData);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="col-lg-9">
        <h1>weather</h1>
        <input type="text" placeholder="Введите город" ref={cityName} />
        <button onClick={getWeather}>Узнать погоду</button>
        {city && (
          <div className="weatherInfo mt-3">
            <p className="text-start">Город: {city.name}</p>
            <p className="text-start">
              Температура: {Math.ceil(city.main.temp)}&deg;
            </p>
            <p className="text-start">
              Ощущается как:
              {Math.ceil(city.main.feels_like)}&deg;
            </p>
            <p className="text-start">
              Описание: {city.weather[0].description}
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default WeatherPage;
