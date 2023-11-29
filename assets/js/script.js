// store DOM elements
const userInput = document.getElementById("city-search");
const searchBtn = document.getElementById("search-btn");

// api key for weather api
const apiKey = "5dec7b6debd352b0f0b1900bde30e10b";

// function to show recent city searches
function showRecentCities() {
    // add function body
}

// function to get city coordinates
async function getCoordinates(cityName) {
    // url for geocoding api
    const apiUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${apiKey}`;

    try {
        // make request to geocoding api endpoint using fetch
        const response = await fetch(apiUrl);
        const data = await response.json();

        // extract the latitude and longitude from api response 
        const { lat, lon } = data[0];

        // return city coordinates
        return { lat, lon };
    } catch (error) {
        console.log('Error in fetching coordinates:', error);
    }
};

// function to fetchh and display current weather information
function displayCurrentWeather(cityName, currentData) {
    let currentDate = new Date(currentData.dt * 1000).toLocaleDateString('en-US');
    let iconUrl = `https://openweathermap.org/img/wn/${currentData.weather[0].icon}.png`;
    let temp = currentData.temp.day;
    let wind = currentData.wind_speed;
    let humidity = currentData.humidity;

    document.getElementById('city-name').textContent = `${cityName} ${currentDate}`;
    document.getElementById('today-temp').textContent = `Temp: ${temp} °F`;
    document.getElementById('today-wind').textContent = `Wind: ${wind} MPH`;
    document.getElementById('today-humidity').textContent = `Humidity: ${humidity} %`;



};

// function to fetch and display 5-day weather forecast
function displayWeatherForecast(forecastData) {
    // loop through each day of forecast
    for (let i = 0; i < forecastData.length; i++) {
        let date = new Date(forecastData[i].dt * 1000).toLocaleDateString('en-US');
        let iconUrl = `https://openweathermap.org/img/wn/${forecastData[i].weather[0].icon}.png`;
        let temp = forecastData[i].temp.day;
        let wind = forecastData[i].wind_speed;
        let humidity = forecastData[i].humidity;
    }
};

// function to fetch weather data from weather api
async function getWeatherData(cityName) {
    try {
        // retrieve coordinates from getCoordinates function
        const { lat, lon } = await getCoordinates(cityName);
         // stores url for weather api
        const apiUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=current,hourly,minutely,alerts&appid=${apiKey}&units=imperial`;

        // make request to weather api endpoint using fetch
        const response = await fetch(apiUrl);
        const data = await response.json();

        displayCurrentWeather(cityName, data.daily[0]);
        displayWeatherForecast(data.daily.slice(1, 6));
        
    } catch (error) {
        console.log('Error in fetching weather data:', error);
    }
};

// test api
getWeatherData('Chicago')

// function to handle city submission
const handleBtn = (event) => {
    event.preventDefault();
    const city = userInput.value.trim();
    getWeatherData(city);
};

// add event listener to search button
searchBtn.addEventListener('click', handleBtn);