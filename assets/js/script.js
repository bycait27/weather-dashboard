// stores user's search bar input
const userInput = document.getElementById("city-search");
// stores search button
const searchBtn = document.getElementById("search-btn");
// stores user's input fro search bar into a city parameter
let city = userInput.value;
// stores api key for weather api
const apiKey = "5dec7b6debd352b0f0b1900bde30e10b";

// stores url for weather api
const queryUrl = "http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=apiKey";

// function for fetching weather
function getForecast(city) {
    let response = fetch(queryUrl);
    response.json();
}

searchBtn.addEventListener("click", function(event) {
    getForecast(userInput.value);
    let forecastElement = document.getElementById("forecast");
    forecastElement.innerHTML = getForecast(userInput.value)
});

// function fetchData() {
//     fetch(`api.openweathermap.org/data/2.5/weather?q=${city}&appid=apiKey`)
//     .then(function(response) {
//         return response.json();
//     })


// .then(function(data) {
//     console.log(data);
//     let forecastElement = document.getElementById("forecast");
//     forecastElement.innerHTML = "";
// });
// };

// searchBtn.addEventListener("click", fetch(queryUrl));
