import axios from "axios"
import { useState, useEffect} from 'react'

const Weather = ({country}) => {
    const [weather, setWeather] = useState([]);
    const [main, setMain] = useState([]);
    const [wind, setWind] = useState([]);
    const latitude = country.capitalInfo.latlng[0];
    const longitude = country.capitalInfo.latlng[1];
    const weatherCallString = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.REACT_APP_API_KEY}`;
    const weatherGetter = () => {
        axios.get(weatherCallString).then(response => { 
            setWeather(response.data.weather);
            setMain(response.data.main);
            setWind(response.data.wind);
        }

        )
    }
    const getWeatherIcon = (weath => {
        const id = weath.id;
        const icon = weath.icon;
        const url = `http://openweathermap.org/img/wn/${icon}@2x.png`;
        const key = country.name.common + id;
        return <img key={key} src={url} width= "200px" height = "200px" alt={weath.description}/>
    })
    useEffect(weatherGetter, []);
    const temperature = main.temp - 273.15;
    const pressure = main.pressure;
    const humidity = main.humidity;
    const windSpeed = wind.speed;

    return (
        <div>
            <div>temperature {temperature.toFixed(2)} Celcius</div>
            {weather.map(getWeatherIcon)}
            <div>wind {windSpeed} m/s</div>
            <div>pressure {pressure} hPa</div>
            <div>humidity {humidity} %</div> 
        </div>
    )
}

export default Weather