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

// function to fetch weather data from weather api
async function getWeatherData(cityName) {
    try {
        // retrieve coordinates from getCoordinates function
        const { lat, lon } = await getCoordinates(cityName);
         // stores url for weather api
        const apiUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely,alerts&appid=${apiKey}&units=imperial`;

        // make request to weather api endpoint using fetch
        const response = await fetch(apiUrl);
        const data = await response.json();

        // get the current date
        // const currentDate = new Date();

        // // extract the day, month, and year
        // const day = currentDate.getDate();
        // const month = currentDate.getMonth() + 1;
        // const year = currentDate.getFullYear();
    
        // // format date to MM/DD/YYYY 
        // const formattedDate = `${month.toString().padStart(2, '0')}/${day.toString().padStart(2, '0')}/${year}`;

        // document.getElementById('city-name').textContent = `${data.city.name} ${formattedDate}`;
        // document.getElementById('today-temp').textContent = `Temp: ${data.list[0].main.temp} °F`;
        // document.getElementById('today-wind').textContent = `Wind: ${data.list[0].wind.speed} MPH`;
        // document.getElementById('today-humidity').textContent = `Humidity: ${data.list[0].main.humidity} %`;

        // process data and update the ui
        // const temp = data.list[0].main.temp;
        // const wind = data.wind.speed;
        // const humidity = data.main.humidity;

        // update ui with weather data
        // document.getElementById('today-temp').textContent = `Temp: ${temp} °F`;


        // const forecastArray = data.list;
        // const forecastGroup = 8;

        // for (let i = 0; i < forecastArray.length; i+= forecastGroup) {
        //     for (let j = 0; j < forecastGroup && i + j < forecastArray.length; j++) {
        //         const forecast = forecastArray[i + j];
        //         const main = forecast.main;

        //         const temp = main.temp;

        //         console.log(temp);
        //     }

        //     console.log('*********** Group Separator ***********');
        //     const forecast = forecastArray[i];
        //     const main = forecast.main;

        //     const temp = main.temp;
        // }

        // test api
        console.log(data.current.temp);

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