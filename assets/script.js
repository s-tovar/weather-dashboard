var APIKEY = 'ac593f84fa47f530b0cc06150b019109';
var searchBtn = document.getElementById('search-btn');
var citySearch = document.getElementById('city-input');
var stateSearch = document.getElementById('state-input');
var weatherDetails = document.getElementById('weather-details');
var searchHistory = document.getAnimations('search-history');
var currentWeather = document.getElementById('current-weather');
var forecastCards = document.getElementById('forecast-card');
var searchForm = document.getElementById('search');

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
    if (!citySearch) return;
    getWeather(citySearch)
    addToSearchHistory(citySearch);
});

searchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!stateSearch) return;
    getWeather(stateSearch)
    addToSearchHistory(stateSearch);
});

// event listener for search history
searchHistory.addEventListener("click", (event) => {
    var target = event.target;
    if (target.tagName === "BUTTON") {
        var city = target.textContent.trim();
        getWeather(city);
        console.log("search history:", city); //check if event listener works
    }
});
// might need to add for state?

// add city to search history
function addToSearchHistory(city) {
    var searchEl = document.createElement("button");
    searchEl.textContent = city;
    searchEl.classList.add("search-item");
    searchHistory.appendChild(searchItem);
}

//fetch and display weather 
function getWeather(city) {
    fetch('https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric')
    .then((response) => response.json())
    .then((data) => {
        console.log("current weather:", data); //check if fetching data
        displayCurrentWeather(data);
        return data.coord;
    })
    .then((coord) => {
        fetch('https://api.openweathermap.org/data/2.5/onecall?lat=${coord.lat}&lon=${coord.lon}&appid=${apiKey}&units=metric&exclude=current,minutely,hourly,alerts')
        .then((response) => response.json())
        .then((data) => {
            displayForecast(data.daily);
        });
    });
}

function displayCurrentWeather(data) {
    var {name, date, weather, main, wind } = data;
    var date = new Date(date * 1000).toLocaleDateString();
    var icon = 'https://openweathermap.org/img/wn/${weather[0].icon}.png';

    currentWeather.innerHTML = `
    <h2>${name} (${date})</h2>
    <img src="${iconUrl}" alt="${weather[0].description}">
    <p>Temperature: ${main.temp} °C</p>
    <p>Humidity: ${main.humidity} %</p>
    <p>Wind Speed: ${wind.speed} m/s</p>
  `;
}