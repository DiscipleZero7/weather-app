import "./styles.css";

const weatherInput = document.querySelector(".weather-input");
const weatherSubmitBtn = document.querySelector(".weather-submit-button");
const weatherDataContainer = document.querySelector(".weather-data-container");

function getWeather(location) {
    fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/next7days?unitGroup=us&key=S8W2PXA35LL8XYZZWWCAA4289&contentType=json`)
    .then((response) => {
        if (!response.ok) {
            console.warn("Please enter a valid location.");
            return null;
        }
        return response.json()
    })
    .then((response) => {
        console.log(response.days)
        response.days.forEach((e) => {
            const weatherCard = document.createElement("div");
            weatherCard.innerText = `${e.datetime}: ${e.temp}`;
            weatherDataContainer.appendChild(weatherCard);
        })
    }).catch(() => {
        console.error("Invalid input/location");
    })
}



weatherSubmitBtn.addEventListener(("click"), (button) => {
    button.preventDefault();
    getWeather(weatherInput.value);
});

console.log(weatherDataContainer)