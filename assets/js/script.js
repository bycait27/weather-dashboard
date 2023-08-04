const searchBtn = document.getElementById("search-btn");

const weather = {
    Atlanta: {
        lat: "33.753746",
        lon: "-84.386330",
    }
};

// console.log(`Lat: ${weather.Atlanta.lat}`);

console.log(weather.Atlanta.lat);


function fetchData() {
    fetch(`api.openweathermap.org/data/2.5/forecast?lat=${weather.Atlanta.lat}&lon=${weather.Atlanta.lon}&appid={API KEY}`)
    .then(function(response) {
        return response.json();
    })


.then(function(data) {
    console.log(data);
    let forecastElement = document.getElementById("forecast");
    forecastElement.innerHTML = "";
});
};

searchBtn.addEventListener("click", fetchData);
