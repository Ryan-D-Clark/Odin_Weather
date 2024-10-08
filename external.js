const searchBoxContainer = document.getElementById("search-box-container")
const searchButton = document.getElementById("search-button")
const searchBox = document.getElementById("search-box")


const informationContainer = document.getElementById("information-container")
const currentWeatherImage = document.getElementById("current-weather-image")
const currentWeatherDescription = document.getElementById("current-weather-description")
const currentWeatherTemperature = document.getElementById("current-weather-temperature")
const locationName = document.getElementById("location-name")

const forecastNextDayTitle = document.getElementById("forecast-next-day-title")
const forecastTomorrowImage = document.getElementById("forecast-tomorrow-image")
const forecastTomorrowHighTemp = document.getElementById("forecast-tomorrow-high-temp")
const forecastTomorrowLowTemp = document.getElementById("forecast-tomorrow-low-temp")

const forecastNextDayImage = document.getElementById("forecast-next-day-image")
const forecastNextDayHighTemp = document.getElementById("forecast-next-day-high-temp")
const forecastNextDayLowTemp = document.getElementById("forecast-next-day-low-temp")

const changeTypeButton = document.getElementById("change-type-button")

const backButton = document.getElementById("back-button")

let displayingC = true
const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

async function retrieveInformation(location, type){
    const response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=a9b60755967f4dd89df195402240107&q=${location}&days=3`)
    if(response.ok && response.status == 200){

        const weatherData = await response.json();
        searchBoxContainer.style.display = "none"
        informationContainer.style.display = "grid"

        locationName.textContent = weatherData["location"]["name"]
        currentWeatherImage.src = weatherData["current"]["condition"]["icon"]
        currentWeatherDescription.textContent = weatherData["current"]["condition"]["text"]
        currentWeatherTemperature.textContent = type ? weatherData["current"]["temp_f"] + '\u00B0' + "F" : weatherData["current"]["temp_c"] + '\u00B0' + "C"

        forecastTomorrowImage.src = weatherData["forecast"]["forecastday"]["1"]["day"]["condition"]["icon"]
        forecastTomorrowHighTemp.textContent = type ? weatherData["forecast"]["forecastday"]["1"]["day"]["maxtemp_f"]+ '\u00B0' + "F" : weatherData["forecast"]["forecastday"]["1"]["day"]["maxtemp_c"]+ '\u00B0' + "C"
        forecastTomorrowLowTemp.textContent = type ? weatherData["forecast"]["forecastday"]["1"]["day"]["mintemp_f"]+ '\u00B0' + "F" : weatherData["forecast"]["forecastday"]["1"]["day"]["mintemp_c"]+ '\u00B0' + "C"
        
        const forecastNextDayDate = new Date(weatherData["forecast"]["forecastday"]["2"]["date"])
        forecastNextDayTitle.textContent = daysOfWeek[forecastNextDayDate.getDay()]

        forecastNextDayImage.src = weatherData["forecast"]["forecastday"]["2"]["day"]["condition"]["icon"]
        forecastNextDayHighTemp.textContent = type ? weatherData["forecast"]["forecastday"]["2"]["day"]["maxtemp_f"]+ '\u00B0' + "F" : weatherData["forecast"]["forecastday"]["2"]["day"]["maxtemp_c"]+ '\u00B0' + "C"
        forecastNextDayLowTemp.textContent = type ? weatherData["forecast"]["forecastday"]["2"]["day"]["mintemp_f"]+ '\u00B0' + "F" : weatherData["forecast"]["forecastday"]["2"]["day"]["mintemp_c"]+ '\u00B0' + "C"
        console.log(weatherData)

    }
}


searchButton.addEventListener("click", () =>{
    retrieveInformation(searchBox.value)
})

searchBox.addEventListener("keypress", (event) => {
    if(event.key === "Enter"){
        event.preventDefault()
        searchButton.click()
    }
})

changeTypeButton.addEventListener("click", () =>{
    if(displayingC){
        retrieveInformation(searchBox.value, true)
        displayingC = false
        changeTypeButton.innerHTML = "°C / <b>°F</b>"
    }else if(!displayingC){
        retrieveInformation(searchBox.value)
        displayingC = true
        changeTypeButton.innerHTML = "<b>°C</b> / °F"

    }
})

backButton.addEventListener("click", () =>{
    searchBoxContainer.style.display = "block"
    searchBox.value = ""
    informationContainer.style.display = "none"

})
