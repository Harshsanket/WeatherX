import React, {useEffect, useState} from 'react'
const APIKEY = '651c7eabe00c145232b959f58d5196b3'

const useWeatherApi = (cityName) => {
    const [currentTemp, setCurrentTemp] = useState();
    const [humidity, setHumidity] = useState()
    const [city, setCity] =useState()
    const [description, setDescription] = useState()
    const [minTemp , setMinTemp] = useState() 
    const [maxTemp, setMaxTemp] = useState()
    const [pressure, setPressure] =useState()
    const [iconID, setIconID] = useState()
    const [feelslike, SetFeelsLike] = useState()
    
    //fetching data from the api 
    useEffect(()=>{

        const getWeatherData = async () => {
            try{
                const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${APIKEY}`
                
                let response = await fetch(url)
                let data = await response.json()
                console.log(data);

                //setting data from api into variable
                const mainTemp = Math.floor(Math.round(data.main.temp) / 10)
                const minTemp = Math.floor(Math.round(data.main.temp_min) / 10)
                const maxTemp = Math.ceil(Math.round(data.main.temp_max) / 10)
                const currentHumidity = data.main.humidity
                const currentPressure = data.main.pressure
                const getIcon = data.weather[0].icon
                const getFeelsLike = Math.round(data.main.feels_like) /10 
                setCurrentTemp(`${mainTemp}°C`);
                setHumidity(`${currentHumidity}%`);
                setCity(data.name);
                setDescription(data.weather[0].description);
                setMinTemp(`${minTemp}°C`);
                setMaxTemp(`${maxTemp}°C`);
                setPressure(`${currentPressure} hPa`);
                SetFeelsLike(`${getFeelsLike}`)
                setIconID(` https://openweathermap.org/img/wn/${getIcon}.png`)
            }catch(error){
                const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${APIKEY}`
                let response = await fetch(url)
                let data = await response.json()
                setCity(data.message);
                setCurrentTemp('');
                setHumidity('');
                setDescription('');
                setMinTemp(``);
                setMaxTemp(``);
                setPressure(``);
                SetFeelsLike(``)
                setIconID()
                console.log('Error:', error)}
        }
        if (cityName) {
            getWeatherData();
        }
    },[cityName])
  
    return {currentTemp, humidity, city, description, minTemp, maxTemp, pressure, iconID,feelslike}
}
    
   

    
    
  



export default useWeatherApi