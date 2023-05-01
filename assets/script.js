var APIKEY = 'ac593f84fa47f530b0cc06150b019109';
var searchBtn = document.getElementById('search-btn');
var citySearch = document.getElementById('city-input');
var stateSearch = document.getElementById('state-input');
var weatherDetails = document.getElementById('weather-details');


function getLocation(event) {
    event.preventDefault();
    var requestURL = 'http:api.openweathermap.org/geo/1.0/direct?q=' + citySearch.value + ',' +
    stateSearch.value + ',US&limit=5&appid=' + APIKEY;
    fetch(requestURL)
        .then(function (response) {
            return response.json();
        })
        .then(function(data) {
            var lat = data[0].lat
            var lon = data[0].lon
            getWeather(lon, lat)
        })
        localStorage()
}

