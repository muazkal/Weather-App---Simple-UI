const locationSearchInput = document.querySelector('#locationSearchInput');
const searchButton = document.querySelector('#searchButton');
const searchError = document.querySelector('.searchError');

// Initialize search input value
let locationSearch;

// Weather Outputs

const cityOutput = document.querySelector(".cityOutput");
const countryOutput = document.querySelector(".countryOutput");

const dateTimeOutput = document.querySelector(".dateTimeOutput");

const lowTempOutput = document.querySelector(".lowTempOutput");
const currentTempOutput = document.querySelector(".currentTempOutput");
const highTempOutput = document.querySelector(".highTempOutput");

const feelsLikeOutput = document.querySelector(".feelsLikeOutput");
const windOutput = document.querySelector(".windOutput");
const humidityOutput = document.querySelector(".humidityOutput");
const precipitationOutput = document.querySelector(".precipitationOutput");

// Farenheit and Celcius toggles
const fToggle = document.querySelector(".fToggle");
const cToggle = document.querySelector(".cToggle");

// Default screenload
window.addEventListener("load", () => {
    defaultWeatherOutput();

})

// Update weather info based on search
searchButton.addEventListener("click", async (event) => {
    event.preventDefault();
   
    if (currentUnit === "F") {
        fahrenheitOutput();
    } else {
        celciusOutput();
    }

})

// Get current weather information api
async function getCurrentWeatherInfo(location) {
    try {
        const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=9163248c1e0e484ca79192951260403&q=${location}&aqi=no`)

        // Invalid search error-handling
        if (!response.ok) {
            showError("Location not found");
            return;
        }

        const data = await response.json();
        return data
    } catch (error) {
        console.error("Error fetching weather: ",error);
    }
}

// Get forecast weather information api
async function getForecastWeatherInfo(location) {
    try {
        const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=9163248c1e0e484ca79192951260403&q=${location}&days=1&aqi=no&alerts=no`)

        // Invalid search error-handling
        if (!response.ok) {
            showError("Location not found");
            return;
        }

        const data = await response.json();
        return data
    } catch (error) {
        console.error("Error fetching weather: ",error);
    }
}

// Get location date and time information api
async function getRealLocationTime(location) {
    try {
        const response = await fetch(`https://api.weatherapi.com/v1/timezone.json?key=9163248c1e0e484ca79192951260403&q=${location}`)

        // Invalid search error-handling
        if (!response.ok) {
            showError("Location not found");
            return;
        } else {
            removeError()
        }

        const data = await response.json();
        return data
    } catch (error) {
        console.error("Error fetching weather: ",error);
    }
}



// On-load default weather output function
async function defaultWeatherOutput() {
   
    locationSearchInput.value = "San Diego";
    if (localStorage.getItem("Unit") === "F") {
        fahrenheitOutput();
        fToggle.classList.add("active");
        cToggle.classList.remove("active");
        cToggle.classList.add("unactive");
        currentUnit = "F";
    } else {
        celciusOutput();
        cToggle.classList.add("active");
        fToggle.classList.remove("active");
        fToggle.classList.add("unactive");
        currentUnit = "C"
    }

}


// F temperature format output
async function fahrenheitOutput() {
     locationSearch = locationSearchInput.value;
    const currentWeatherInfo = await getCurrentWeatherInfo(locationSearch);
    const forecastWeatherInfo = await getForecastWeatherInfo(locationSearch);
    const currentLocalTime = await getRealLocationTime(locationSearch);

    if (!currentWeatherInfo || !forecastWeatherInfo || !currentLocalTime) {
        return;
    }

    removeError();

    // City details Update
    cityOutput.textContent = currentWeatherInfo.location.name;
    countryOutput.textContent = currentWeatherInfo.location.country; 

    // Temp levels update
    lowTempOutput.textContent = forecastWeatherInfo.forecast.forecastday[0].day.mintemp_f + "°";
    currentTempOutput.textContent = currentWeatherInfo.current.temp_f + "°";
    highTempOutput.textContent = forecastWeatherInfo.forecast.forecastday[0].day.maxtemp_f + "°";

    // Time and date update
    
    const locationTimeGet = new Date(currentLocalTime.location.localtime);
    const timeFormatted = locationTimeGet.toLocaleDateString("en-US", {
        weekday: "long",
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true
    }).replace(",", " •")
    

    dateTimeOutput.textContent = timeFormatted;


    // Weather metrics update
    feelsLikeOutput.textContent = currentWeatherInfo.current.feelslike_f + "°";
    windOutput.textContent = currentWeatherInfo.current.wind_mph;
    humidityOutput.textContent = currentWeatherInfo.current.humidity + "%";
    precipitationOutput.textContent = forecastWeatherInfo.forecast.forecastday[0].day.daily_will_it_rain + "%";
}


// C temperature format output
async function celciusOutput() {
     locationSearch = locationSearchInput.value;
    const currentWeatherInfo = await getCurrentWeatherInfo(locationSearch);
    const forecastWeatherInfo = await getForecastWeatherInfo(locationSearch);
    const currentLocalTime = await getRealLocationTime(locationSearch);
    
    if (!currentWeatherInfo || !forecastWeatherInfo || !currentLocalTime) {
        return;
    }

    removeError();


    // City details Update
    cityOutput.textContent = currentWeatherInfo.location.name;
    countryOutput.textContent = currentWeatherInfo.location.country; 

    // Temp levels update
    lowTempOutput.textContent = forecastWeatherInfo.forecast.forecastday[0].day.mintemp_c + "°";
    currentTempOutput.textContent = currentWeatherInfo.current.temp_c + "°";
    highTempOutput.textContent = forecastWeatherInfo.forecast.forecastday[0].day.maxtemp_c + "°";

    // Time and date update
    
    const locationTimeGet = new Date(currentLocalTime.location.localtime);
    const timeFormatted = locationTimeGet.toLocaleDateString("en-US", {
        weekday: "long",
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true
    }).replace(",", " •")
    

    dateTimeOutput.textContent = timeFormatted;


    // Weather metrics update
    feelsLikeOutput.textContent = currentWeatherInfo.current.feelslike_c + "°";
    windOutput.textContent = currentWeatherInfo.current.wind_mph;
    humidityOutput.textContent = currentWeatherInfo.current.humidity + "%";
    precipitationOutput.textContent = forecastWeatherInfo.forecast.forecastday[0].day.daily_will_it_rain + "%";
}

// F and C Toggles functionality
let currentUnit = "F";

fToggle.addEventListener("click", () => {
    if (currentUnit === "F") return;
    fToggle.classList.add("active");
    cToggle.classList.remove("active");
    cToggle.classList.add("unactive");

    currentUnit = "F";
    localStorage.setItem("Unit", "F");

    fahrenheitOutput()

})

cToggle.addEventListener("click", () => {
    cToggle.classList.add("active");
    fToggle.classList.remove("active");
    fToggle.classList.add("unactive");

    currentUnit = "C"
    localStorage.setItem("Unit", "C");

    celciusOutput();
})

// Invalid search error handling

function showError(message) {
    searchError.textContent = message;

}

function removeError() {
    searchError.textContent = "";
}