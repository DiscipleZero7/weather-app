import "./styles.css";
import sunny from "./icons/sun.png";
import partlyCloudy from "./icons/partly-cloudy.png";
import cloudy from "./icons/cloudy.png"
import windy from "./icons/windy.png"
import thunderstorm from "./icons/lightning-bolt.png";
import snow from "./icons/snow.png";

let titleHeader = document.querySelector(".title-header");
const weatherInput = document.querySelector(".weather-input");
const weatherSubmitBtn = document.querySelector(".weather-submit-button");
const tempConverterBtn = document.querySelector(".temp-converter-button")
const weatherDataContainer = document.querySelector(".weather-data-container");
const loadingStatus = document.querySelector(".loading-status");
const daysOfTheWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
let selectedTemp = "F";
let forecastDisplay = false;
let lastSearch = "";
let unitType = "us";

function getWeather(location, unitType) {
    const loadingElement = document.createElement("h1");
    loadingElement.classList.add("loading-text");
    loadingElement.textContent = "Loading...";
    loadingStatus.appendChild(loadingElement);

    fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/next6days?unitGroup=${unitType}&key=S8W2PXA35LL8XYZZWWCAA4289&contentType=json`)
    .then((response) => {
        if (!response.ok) {
            return null;
        }
        return response.json()
    })
    .then((response) => {
        weatherDataContainer.innerHTML = "";
        response.days.forEach((e) => {
            const weatherCard = document.createElement("div");

            const weatherDay = document.createElement("h3");
            const weatherIcon = document.createElement("img");
            const weatherTemp = document.createElement("h2");
            const weatherHighLow = document.createElement("p");
  
            weatherCard.classList.add("weather-card");
            weatherDay.classList.add("weather-day");
            weatherIcon.classList.add("weather-icon");
            weatherTemp.classList.add("weather-temp");
            weatherHighLow.classList.add("weather-high-low");

            weatherDay.textContent = daysOfTheWeek[new Date(e.datetime).getDay()];
            switch (e.icon) {
                case ("clear-day"):
                    weatherIcon.src = sunny;
                    break;

                case ("clear-night"):
                    // Need custom icon
                    weatherIcon.src = sunny;
                    break;

                case ("partly-cloudy-day"):
                    weatherIcon.src = partlyCloudy;
                    break;

                case ("partly-cloudy-night"):
                    // Need custom icon
                    weatherIcon.src = partlyCloudy;
                    break;

                case ("cloudy"):
                    weatherIcon.src = cloudy;
                    break;

                case ("rain"):
                    weatherIcon.src = thunderstorm;
                    break;

                case ("snow"):
                    weatherIcon.src = snow;
                    break;

                case ("fog"):
                    // Need custom icon
                    weatherIcon.src = cloudy;
                    break;

                case ("wind"):
                    weatherIcon.src = windy;
                    break;
            }
            weatherTemp.textContent = e.temp.toFixed(0) + "°" + selectedTemp[0];

            weatherHighLow.textContent = `${e.tempmax.toFixed(0)}° / ${e.tempmin.toFixed(0)}°`;

            weatherCard.appendChild(weatherDay);
            weatherCard.appendChild(weatherIcon);
            weatherCard.appendChild(weatherTemp);
            weatherCard.appendChild(weatherHighLow);

            weatherDataContainer.appendChild(weatherCard);
        })
        forecastDisplay = true;
        lastSearch = response.address;
    })
    .finally(() => {
        loadingElement.remove();
    })
    .catch(() => {
        alert("Invalid input/location")
    })
}

weatherSubmitBtn.addEventListener(("click"), (button) => {
    button.preventDefault();
    getWeather(weatherInput.value, unitType);
    titleHeader.textContent = `What's the Weather in ${weatherInput.value}?`;
});

tempConverterBtn.addEventListener("click", () => {
    if (unitType === "us") {
        unitType = "uk";
        selectedTemp = "C";
    } else {
        unitType = "us";
        selectedTemp = "F";
    }

    if (forecastDisplay === true) {
        getWeather(lastSearch, unitType);
    }
})

//REFACTOR