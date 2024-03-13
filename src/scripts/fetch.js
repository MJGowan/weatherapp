import { prod, dev } from "./environment.js";

let apiKey = "";

if (prod.isLive) {
    apiKey = prod.apiKey;
} else {
    apiKey = dev.apiKey;
}

async function Geocoding(input){
    let geoApi = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${input}&limit=1&appid=${apiKey}`);
    let geoData = await geoApi.json();

    let longitude = geoData[0].lon;
    let latitude = geoData[0].lat;

    return {longitude, latitude};
}

async function CurrentDay(longi, lati){
    let todayApi = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lati}&lon=${longi}&appid=${apiKey}&units=imperial`);
    let todayData = await todayApi.json();
    console.log(todayData);

    let location = `${todayData.name}, ${todayData.sys.country}`;
    let currentTemp = Math.round(todayData.main.temp);
    let maxTemp = Math.round(todayData.main.temp_max);
    let minTemp = Math.round(todayData.main.temp_min);
    let currentWeather = todayData.weather[0].description;
    let weatherIconCode = todayData.weather[0].icon;
    let weatherIconSrc = `https://openweathermap.org/img/wn/${weatherIconCode}@2x.png`

    return {location, currentTemp, maxTemp, minTemp, currentWeather, weatherIconSrc};
}

async function FiveDays(longi, lati){
    let fiveDayApi = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lati}&lon=${longi}&appid=${apiKey}&units=imperial`);
    let fiveDayData = await fiveDayApi.json();

    let positions = [];
    let daysInfo = [];

    for(let i = 0; i < fiveDayData.list.length; i++){
        let date = fiveDayData.list[i].dt_txt;
        if(date.includes("12:00:00")){
            positions.push(i);
        }
    }

    for(let i = 0; i < positions.length; i++){
        let num = positions[i];
        let fiveDateTime = fiveDayData.list[num].dt_txt;
        let fiveDateSplit = fiveDateTime.split(' ');
        let fiveDate = fiveDateSplit[0];
        let fiveTemp = Math.round(fiveDayData.list[num].main.temp);
        let fiveWeather = fiveDayData.list[num].weather[0].description;
        let fiveWeatherIconCode = fiveDayData.list[num].weather[0].icon;
        let fiveWeatherIconSrc = `https://openweathermap.org/img/wn/${fiveWeatherIconCode}@2x.png`;
        let obj = {fiveDate, fiveTemp, fiveWeather, fiveWeatherIconSrc};
        daysInfo.push(obj);
    }

    return {daysInfo};
}


export {Geocoding, CurrentDay, FiveDays};