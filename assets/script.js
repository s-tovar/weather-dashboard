const APIKEY = 'ac593f84fa47f530b0cc06150b019109';
// var searchBtn = document.getElementById('search-btn');
// var citySearch = document.getElementById('city-input');
// var stateSearch = document.getElementById('state-input');
// var weatherDetails = document.getElementById('weather-details');
const searchHistory = document.getElementById('search-history');
const currentWeather = document.getElementById('current-weather');
const forecastCards = document.getElementById('forecast-card');
const searchForm = document.getElementById('search');

// function getLocation(event) {
//     event.preventDefault();
//     var requestURL = 'http:api.openweathermap.org/geo/1.0/direct?q=' + citySearch.value + ',' +
//     stateSearch.value + ',US&limit=5&appid=' + APIKEY;
//     fetch(requestURL)
//         .then(function (response) {
//             return response.json();
//         })
//         .then(function(data) {
//             var lat = data[0].lat
//             var lon = data[0].lon
//             getWeather(lon, lat)
//         })
//         localStorage()
// }

searchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const city = document.getElementById("city-input").value.trim();
    if (!city) return;
    getWeather(city);
    addToSearchHistory(city);
    console.log("Submitted:", city);
});

// event listener for search history
searchHistory.addEventListener("click", (event) => {
    const target = event.target;
    if (target.tagName === "BUTTON") {
        const city = target.textContent.trim();
        getWeather(city);
        console.log("search history:", city); //check if event listener works
    }
});
// might need to add for state?

// add city to search history
function addToSearchHistory(city) {
    const searchEl = document.createElement("button");
    searchEl.textContent = city;
    searchEl.classList.add("search-item");
    searchHistory.appendChild(searchEl);
}

//fetch and display weather 
function getWeather(city) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKEY}&units=imperial`)
    .then((response) => response.json())
    .then((data) => {
        console.log("current weather:", data); //check if fetching data
        displayCurrentWeather(data);
        return data.coord;
    })
    .then((coord) => {
        fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${coord.lat}&lon=${coord.lon}&appid=${APIKEY}&units=imperial`) //forecast data
        .then((response) => response.json())
        .then((data) => {
            console.log("Forecast data:", data); //check if forecast data comes up
            displayForecast(data.list);
        });
    });
}

function displayCurrentWeather(data) {
    const { name, dt, weather, main, wind } = data;
    const date = new Date(dt * 1000).toLocaleDateString();
    const iconURL = `https://openweathermap.org/img/wn/${weather[0].icon}.png`;

    currentWeather.innerHTML = `
    <h2>${name} (${date})</h2>
    <img src="${iconURL}" alt="${weather[0].description}">
    <p>Temperature: ${main.temp} °F</p>
    <p>Humidity: ${main.humidity} %</p>
    <p>Wind Speed: ${wind.speed} m/s</p>
  `;
}

// to display 5day forecast info
function displayForecast(forecastData) {
    forecastCards.innerHTML = "";
    const dailyForecasts = forecastData.filter((_, index) => index % 8 === 0);
    
  for (let i = 0; i < dailyForecasts.length; i++) {
    const { dt_txt, weather, main, wind } = dailyForecasts[i];
    const date = new Date(dt_txt).toLocaleDateString();
    const iconUrl = `https://openweathermap.org/img/wn/${weather[0].icon}.png`;
    const forecastCard = document.createElement("div");
    forecastCard.classList.add("forecast-card");
    forecastCard.innerHTML = `
      <h3>${date}</h3>
      <img src="${iconUrl}" alt="${weather[0].description}">
      <p>Temperature: ${main.temp} °F</p>
      <p>Wind Speed: ${wind.speed} m/s</p>
      <p>Humidity: ${main.humidity} %</p>
    `;
      forecastCards.appendChild(forecastCard);
    }
}