import React, {useState, useEffect} from 'react'

const CityCode = () => {
    const [data, setData] = useState({})
    useEffect(()=>{
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIKEY}`
        fetch = url
        .then((res) => res.json())
        .then((res) => setData(res[city]))
    
    },[cityName,lat,lon])
  return (
  )
}

export default CityCode