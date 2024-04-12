import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useWeatherApi from "./hooks/useWeatherApi";
const App = () => {
  const [cityName, setCityName] = useState("");
  const [getData, setGetData] = useState();
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
  } = useWeatherApi(getData);

  const bar = () => {
    setGetData(cityName);
    setCityName("");
  };

  return (
    <>
      <div className="flex flex-col justify-end  w-full h-40 sm:h-48  text-center">
        <p className="sm:text-6xl text-4xl font-bold">Weather App</p>
      </div>

      <div className="mt-4 justify-center w-full text-center flex">
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <div className="flex w-full max-w-sm items-center space-x-2">
            <Input
              type="text"
              placeholder="Search by city name ..."
              value={cityName}
              onChange={(e) => setCityName(e.target.value)}
              className="text-black"
            />
            <Button
              type="submit"
              onClick={bar}
              variant
              className="bg-green-500"
            >
              Submit
            </Button>
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
                <p className="text-2xl  justify-center items-center">
                  {description}
                </p>
              </div>
              {iconID && (
                <div>
                  <p className=" bg-white rounded-full">
                    <img src={iconID} alt="Weather Icon" />
                  </p>
                </div>
              )}
            </div>

            {/* //display temp */}
            {currentTemp && feelslike && (
              <div className="flex justify-between items-center mt-2">
                <div>
                  <p className="text-3xl font-bold justify-center items-center">
                    {currentTemp}
                  </p>
                  <p className="text-lg">feels like {feelslike}</p>
                </div>
                <div>
                  <p>H {maxTemp}</p>
                  <p>L {minTemp}</p>
                </div>
              </div>
            )}

            {/* rest */}
            {humidity && pressure && (
              <div className="flex justify-between items-center ">
                <div>
                  <p>Humidity</p>
                  <p>Pressure</p>
                </div>
                <div>
                  <p>{humidity}</p>
                  <p>{pressure}</p>
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
