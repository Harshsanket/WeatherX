import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useWeatherApi from "./hooks/useWeatherApi";

const App = () => {
  const [cityName, setCityName] = useState("");
  const [getData, setGetData] = useState();
  const [isCelsius, setIsCelsius] = useState(true);

  const {
    currentTemp,
    humidity,
    city,
    description,
    minTemp,
    maxTemp,
    pressure,
    iconID,
    feelslike,
    windSpeed,
    visibility,
  } = useWeatherApi(getData);

  const bar = () => {
    setGetData(cityName);
    setCityName("");
  };

  const toggleTemperatureUnit = () => {
    setIsCelsius((prevIsCelsius) => !prevIsCelsius);
  };

  const toFahrenheit = (celsius) => {
    return (celsius * 9) / 5 + 32;
  };

  return (
    <>
      <div
        id="Header"
        className="w-full text-white sm:h-72 h-56 pt-2 pl-2 text-center flex flex-col justify-end pb-12"
      >
        <a href="#" className="sm:text-8xl text-5xl font-bold">
          WeatherX
        </a>
      </div>
      <div className="justify-center w-full text-center flex">
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <div className="flex flex-col w-full max-w-sm items-center space-y-2">
            <div className="flex w-full items-center space-x-2">
              <Input
                type="text"
                placeholder="Search by city name ..."
                value={cityName}
                onChange={(e) => setCityName(e.target.value)}
                className="border border-black rounded p-2 text-black h-10 sm:w-80 sm:h-12"
              />
              <Button
                type="submit"
                onClick={bar}
                variant
                className="bg-green-500 h-10 sm:h-12 sm:w-auto p-2 text-lg"
              >
                Submit
              </Button>
            </div>
            {currentTemp && (
              
              <Button
                onClick={toggleTemperatureUnit}
                className="bg-blue-800 self-center"
              >
                {isCelsius ? "Switch to °F" : "Switch to °C"}
              </Button>
            )}
          </div>
        </form>
      </div>

      {city && (
        <div className="sm:flex justify-center mr-4 ml-4">
          <div className=" border border-white mt-6 p-2 rounded-xl sm:w-1/2">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-3xl font-bold justify-center items-center">
                  {city}
                </p>
                <p className="text-2xl justify-center items-center">
                  {description}
                </p>
              </div>
              {iconID && (
                <div>
                  <p className="bg-transparent rounded-full w-16">
                    <img src={iconID} alt="Weather Icon" />
                  </p>
                </div>
              )}
            </div>

            {/* Display temp */}
            {currentTemp && feelslike && (
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-3xl font-bold justify-center items-center">
                    {isCelsius ? `${currentTemp}°C` : `${toFahrenheit(currentTemp)}°F`}
                  </p>
                  <p className="text-lg">Feels like {isCelsius ? `${feelslike}°C` : `${toFahrenheit(feelslike)}°F`}</p>
                </div>
                <div>
                  <p>H {isCelsius ? `${maxTemp}°C` : `${toFahrenheit(maxTemp)}°F`}</p>
                  <p>L {isCelsius ? `${minTemp}°C` : `${toFahrenheit(minTemp)}°F`}</p>
                </div>
              </div>
            )}

            {/* Rest */}
            {humidity && pressure && windSpeed && (
              <div className="flex justify-between items-center ">
                <div>
                  <p>Humidity</p>
                  <p>Pressure</p>
                  <p>Windspeed</p>
                  <p>Visibility</p>
                </div>
                <div>
                  <p>{humidity}%</p>
                  <p>{pressure} hPa</p>
                  <p>{windSpeed} km/h</p>
                  <p>{visibility} km</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default App;
