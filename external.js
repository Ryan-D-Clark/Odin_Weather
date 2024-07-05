import { format } from "https://esm.sh/date-fns/format.mjs";
let forecastContainer = document.getElementById("forecast-container")
let content = document.getElementById("content")
let stats = document.getElementById("stats")

let getWeather = async location => {
    let response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=a9b60755967f4dd89df195402240107&days=8&q=${location}`)
    let data = await response.json()
    let weatherDays = data["forecast"]["forecastday"]
    let todaysWeather = weatherDays[0]
    console.log(todaysWeather)
    weatherDays.splice(0,1)
    console.log(weatherDays)
    for(let day in weatherDays){
        console.log("Testing", weatherDays[day]["day"]["condition"])
        let forecast = document.createElement("div")
        forecast.classList.add("forecast-item")

        let forecastDay = document.createElement("div")
        forecastDay.classList.add("day")
        forecastDay.innerText = format(weatherDays[day]["date"], 'EEEE')
        forecast.appendChild(forecastDay)

        let forecastHigh = document.createElement("div")
        forecastHigh.classList.add("high")
        forecastHigh.innerText = `${weatherDays[day]["day"]["maxtemp_c"]} °C`
        forecast.appendChild(forecastHigh)

        let forecastLow = document.createElement("div")
        forecastLow.classList.add("low")
        forecastLow.innerText = `${weatherDays[day]["day"]["mintemp_c"]} °C`
        forecast.appendChild(forecastLow)

        let forecastImage = document.createElement("img")
        forecastImage.classList.add("image")
        forecastImage.src = `${weatherDays[day]["day"]["condition"]["icon"]}`
        forecast.appendChild(forecastImage)

        forecastContainer.appendChild(forecast)
    }
}

getWeather("Hull")