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
const daysOfTheWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
let selectedTemp = "Fahrenheit";

function getWeather(location) {
    fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/next6days?unitGroup=us&key=S8W2PXA35LL8XYZZWWCAA4289&contentType=json`)
    .then((response) => {
        if (!response.ok) {
            console.warn("Please enter a valid location.");
            return null;
        }
        return response.json()
    })
    .then((response) => {
        console.log(response)
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
            weatherTemp.textContent = (convertTemp(selectedTemp, e.temp)).toFixed(0) + "°" + selectedTemp[0];

            //weatherHighLow.textContent = `${e.tempmax.toFixed(0)}° / ${e.tempmin.toFixed(0)}°`;
            weatherHighLow.textContent = `${convertTemp(selectedTemp, e.tempmax).toFixed(0)}° / ${convertTemp(selectedTemp, e.tempmin).toFixed(0)}°`;

            weatherCard.appendChild(weatherDay);
            weatherCard.appendChild(weatherIcon);
            weatherCard.appendChild(weatherTemp);
            weatherCard.appendChild(weatherHighLow);

            weatherDataContainer.appendChild(weatherCard);
        })
    }).catch(() => {
        console.error("Invalid input/location");
    })
}

function convertTemp(type, temp) {
    switch (type) {
        case("Fahrenheit"):
            return temp;
        
        case("Celsius"):
            return ((temp - 32) * 5/9);
    }
}

weatherSubmitBtn.addEventListener(("click"), (button) => {
    button.preventDefault();
    getWeather(weatherInput.value);
    titleHeader.textContent = `What's the Weather in ${weatherInput.value}?`;
});

tempConverterBtn.addEventListener("click", (button) => {
    button.preventDefault();

    if (selectedTemp === "Fahrenheit") {
        selectedTemp = "Celsius";
    } else {
        selectedTemp = "Fahrenheit";
    }

    console.log(`Selected Temp: ${selectedTemp}`)
    console.log(weatherDataContainer)
})

//REFACTOR