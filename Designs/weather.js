

const getWeather = () => {
    fetch('http://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=44c5cfc6920c2d5142919775ca620271')
        .then((response) => {
            return response.json()
        })
        .then((json) => {
            console.log(json)

            const apiResponseCondition = json.weather[0].description
            const apiResponseTemperature = Math.round(json.main.temp)
            const apiResponseSunriseHour = new Date (json.sys.sunrise * 1000).getHours()
            const apiResponseSunriseMinute = new Date (json.sys.sunrise * 1000).getMinutes()
            const apiResponseSunriseSecond = new Date (json.sys.sunrise * 1000).getSeconds()
            const apiResponseSunsetHour = new Date (json.sys.sunset * 1000).getHours()
            const apiResponseSunsetMinute = new Date (json.sys.sunset * 1000).getMinutes()
            const apiResponseSunsetSecond = new Date (json.sys.sunset * 1000).getSeconds()


            /*console.log(apiResponseCondition)
            console.log(apiResponseTemperature)*/

            const conditionToday = document.getElementById("condition-temperature")
            conditionToday.innerHTML = apiResponseCondition + " | " + apiResponseTemperature + " °C"
            const sunriseToday = document.getElementById("sunrise-today")
            sunriseToday.innerHTML = "sunrise " + apiResponseSunriseHour + ":" + apiResponseSunriseMinute + ":" + apiResponseSunriseSecond
            const sunsetToday = document.getElementById("sunset-today")
            sunsetToday.innerHTML = "sunset " + apiResponseSunsetHour + ":" + apiResponseSunsetMinute + ":" + apiResponseSunsetSecond

            const weatherIcon = document.getElementById("weather-icon")
            const resultWeatherToday = /*getWeatherToday(apiResponseCondition) "Rainy"*/ "Sunny" //"Cloudy"
            weatherIcon.src = selectIcon(resultWeatherToday)

            const weatherBackground = document.getElementById("weather-background")
            weatherBackground.style.background = selectBackgroundColor(resultWeatherToday)

            selectFontColor(resultWeatherToday)

            const recoHeader = document.getElementById("reco-header")
            recoHeader.innerHTML = selectRecoHeader(resultWeatherToday)
            
            
        })
        .catch((err) => {
            console.log('Caught error:', err)
        })
}
getWeather()

const getWeatherToday = (apiResponseCondition) => {
    console.log(apiResponseCondition)
    if (apiResponseCondition === "clear sky" || apiResponseCondition === "few clouds" ) {
        var weatherToday = "Sunny"
        return weatherToday
    } else if (apiResponseCondition === "scattered clouds"  || apiResponseCondition === "broken clouds" || apiResponseCondition === "mist") {
        var weatherToday = "Cloudy"
        return weatherToday
    } else if (apiResponseCondition === "shower rain" || apiResponseCondition ==="rain" || apiResponseCondition ==="thunderstorm" || apiResponseCondition === "snow") {
        var weatherToday = "Rainy"
        return weatherToday
    }
}

const selectIcon = (weatherToday) => {
    console.log(weatherToday)
    if (weatherToday === "Sunny") {
        return icon = "./design-2/icons/noun_Sunglasses_2055147.svg" 
    } else if (weatherToday === "Cloudy") {
        return icon = "./design-2/icons/noun_Cloud_1188486.svg"
    } else {
        return icon = "./design-2/icons/noun_Umbrella_2030530.svg"
    }
    
}

const selectBackgroundColor = (weatherToday) => {
    if (weatherToday === "Sunny") {
        return backgroundColor = "#F7E9B9" 
    } else if (weatherToday === "Cloudy") {
        return backgroundColor = "#F4F7F8"
    } else {
        return text = "#A3DEF7"
    }
}

const selectFontColor = (weatherToday) => {
    if (weatherToday === "Sunny") {
        document.body.style.color = "#2A5510"
    } else if (weatherToday === "Cloudy") {
        document.body.style.color = "#F47775"
    } else {
        document.body.style.color = "#164A68"
    }
}

const selectRecoHeader = (weatherToday) => {
    console.log(weatherToday)
    if (weatherToday === "Sunny") {
        return text = "Get your sunnies on. Stockholm is looking rather great today."
    } else if (weatherToday === "Cloudy") {
        return text = "Light a fire and get cosy. Stockholm is looking grey today."
    } else {
        return text = "Don't forget your umbrella. It's wet in Stockholm today."
    }
}

const container = document.getElementById("five-day-forecast")

const getFiveDayForecast = () => {
    fetch('http://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=44c5cfc6920c2d5142919775ca620271')
        .then((response) => {
            return response.json()
        })
        .then((json) => {
            console.log(json)

            json.list.forEach((element) => {
                container.innerHTML += ` <td> ${element.dt_txt} </td>  <td>${element.main.temp} </td>` //${json.main.temp_min} ${json.main.temp_max}</p>`
            })
        })
        .catch((err) => {
            console.log('Caught error:', err)
        })
}
getFiveDayForecast ()