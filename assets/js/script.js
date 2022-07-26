var search = document.querySelector('#cityInput').value;
// var searchVal = search.value;
var searchButton = document.querySelector('#searchButton');
searchButton.addEventListener('click', test);

// var todayDate = document.querySelector('#todayDate');
var cityName = document.querySelector('#name');
var cityTemp = document.querySelector('.temp');
var cityHumid = document.querySelector('#humid');
var cityWind = document.querySelector('#wind');
var cityUv = document.querySelector('#uv');
var cityTemperature = document.getElementsByClassName('temp');
var cityWindAll = document.getElementsByClassName('wind');
var cityHumidAll = document.getElementsByClassName('humid');
var cityDateAll = document.getElementsByClassName('date');



function test() {
    var search = document.querySelector('#cityInput').value;
    console.log(search);
    var city = search;
    var newUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=' + city + '&appid=' + apiKey;
    getCoordinates();
}

var halfUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=eugene,US&Limit=5&units=imperial&exclude=hourly,daily&appid=';
var apiKey = '568879d24beca486fcb9fa2d0e3433d3';
var city = search;
var testUrl = 'http://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=imperial&exclude=hourly,daily&appid=' + apiKey;
var newUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=' + city + '&appid=' + apiKey;
var Url = halfUrl + apiKey
var lat;
var lon;

console.log(newUrl);


function getCoordinates() {
    var city = search;
    // var testUrl = 'http://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=imperial&exclude=hourly,daily&appid=' + apiKey;
    var newUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=' + document.querySelector('#cityInput').value + '&appid=' + apiKey;
  
    fetch(newUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function test(data) {
            lat =  data[0].lat;
            lon = data[0].lon;
            // return data[0].lat + data[0].lon;
            console.log(lat);
            var apiKey = '568879d24beca486fcb9fa2d0e3433d3';
            var weatherUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat +'&lon=' + lon + '&units=imperial&exclude=current,minutely,hourly,alerts,&appid=' + apiKey;

            fetch(weatherUrl)
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    console.log(data);
                    cityName.textContent = document.querySelector('#cityInput').value;
                    var uvi = data.daily[0].uvi;
                    cityUv.textContent = uvi;
                    cityUv.setAttribute('style', 'border: 2px solid green; background-color: green;')

                    for (var i = 0; i < 6; i++) {
                        var dateNice = new Date((data.daily[i].dt) * 1000).toDateString();
                        cityDateAll[i].textContent = dateNice;

                    }

                    for (var i = 0; i < 6; i++) {
                        cityTemperature[i].textContent = data.daily[i].temp.day;
                    }
                    for (var i = 0; i < 6; i++) {
                        cityWindAll[i].textContent = data.daily[i].wind_speed;

                    }
                    for (var i = 0; i < 6; i++) {
                        cityHumidAll[i].textContent = data.daily[i].humidity;
                    }
                })
        });
}









