// stores user's search bar input
const userInput = document.getElementById("city-search");
// stores search button
const searchBtn = document.getElementById("search-btn");


// stores api key for weather api
const apiKey = "5dec7b6debd352b0f0b1900bde30e10b";


// function to get city coordinates
async function getCoordinates(cityName) {
    // stores url for geocoding api
    const apiUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${apiKey}`;

    try {
        // make request to geocoding api endpoint using fetch
        const response = await fetch(apiUrl);
        const data = await response.json();

        // extract the latitude and longitude from api response 
        const { lat, lon } = data[0];

        // return coordinates
        return { lat, lon };
    } catch (error) {
        console.log('Error in fetching coordinates:', error);
    }
};

// function to fetch weather data from weather api
async function getWeatherData(cityName) {
    try {
        const { lat, lon } = await getCoordinates(cityName);
         // stores url for weather api
        const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;

        const response = await fetch(apiUrl);
        const data = await response.json();
        // process data and update the ui
        // For example:
        // const temperature = data.main.temp;
        // const description = data.weather[0].description;

        // update ui with weather data
        // document.getElementById('temperature').textContent = temperature;
        // document.getElementById('description').textContent = description;

        // test api
        console.log(data)

    } catch (error) {
        console.log('Error in fetching weather data:', error);
    }
};

// test api
getWeatherData('Chicago')

// function to handle city submission
const handleBtn = (event) => {
    event.preventDefault();
    const city = userInput.value;
    getWeatherData(city);
};

// add event listener to search button
searchBtn.addEventListener('submit', handleBtn);