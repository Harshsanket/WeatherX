import React, { useEffect, useState } from "react";
const APIKEY = "651c7eabe00c145232b959f58d5196b3";

const useWeatherApi = (cityName) => {
  const [currentTemp, setCurrentTemp] = useState();
  const [humidity, setHumidity] = useState();
  const [city, setCity] = useState();
  const [description, setDescription] = useState();
  const [minTemp, setMinTemp] = useState();
  const [maxTemp, setMaxTemp] = useState();
  const [pressure, setPressure] = useState();
  const [iconID, setIconID] = useState();
  const [feelslike, SetFeelsLike] = useState();
  const [windSpeed, setWindSpeed] = useState()
  const [visibility, setVisibility] = useState()

  //fetching data from the api
  useEffect(() => {
    const getWeatherData = async () => {
      try {
        // getting latitude and longitude
        const geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=${APIKEY}`;
        const geoResponse = await fetch(geoUrl);
        const geoData = await geoResponse.json();
        const latitude = geoData[0].lat;
        const longitude = geoData[0].lon;
        //getting weather data
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${APIKEY}`;
        let response = await fetch(url);
        let data = await response.json();
        //setting data from api into variable
        setCurrentTemp(Math.floor(Math.round(data.main.temp - 273.15)));
        setHumidity(data.main.humidity);
        setCity(geoData[0].name);
        setDescription(data.weather[0].description);
        setMinTemp(Math.round(data.main.temp_min - 273.15));
        setMaxTemp(Math.round(data.main.temp_max - 273.15));
        setPressure(data.main.pressure);
        SetFeelsLike(Math.round(data.main.feels_like - 273.15));
        setWindSpeed(data.wind.speed)
        setVisibility(data.visibility / 1000)
        setIconID(
          ` https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
        );
       
      } catch (error) {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${APIKEY}`;
        let response = await fetch(url);
        let data = await response.json();
        setCity(data.message);
      }
    };
    if (cityName) {
      getWeatherData();
    }
  }, [cityName]);

  return {
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
  };
};

export default useWeatherApi;
