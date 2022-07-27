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
var imgAll = document.getElementsByTagName('img');
var liEl = document.createElement('li');
var buttonEl = document.createElement('button');
var ulEl = document.querySelector('#terms');
var search = document.querySelector('#cityInput').value;




function test() {
    var search = document.querySelector('#cityInput').value;
    console.log(search);
    var city = search;
    var newUrl = 'https://api.openweathermap.org/geo/1.0/direct?q=' + city + '&appid=' + apiKey;
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

var iconArray = ['http://openweathermap.org/img/wn/01d.png', 'http://openweathermap.org/img/wn/02d.png', 'http://openweathermap.org/img/wn/03d.png', 'http://openweathermap.org/img/wn/04d.png', 'http://openweathermap.org/img/wn/09d.png', 'http://openweathermap.org/img/wn/10d.png', 'http://openweathermap.org/img/wn/11d.png', 'http://openweathermap.org/img/wn/13d.png', 'http://openweathermap.org/img/wn/50d.png'];

console.log(newUrl);


function getCoordinates() {
    var city = search;
    var search = document.querySelector('#cityInput').value;

    // var testUrl = 'http://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=imperial&exclude=hourly,daily&appid=' + apiKey;
    var newUrl = 'https://api.openweathermap.org/geo/1.0/direct?q=' + search + '&appid=' + apiKey;
  
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
                    // console.log(data.daily[0].weather[0].id);
                    cityName.textContent = document.querySelector('#cityInput').value;
                    var uvi = data.daily[0].uvi;
                    cityUv.textContent = uvi;
                    if (uvi > 0 && uvi <= 3) {
                        cityUv.setAttribute('style', 'background-color: green; padding: 2px;');
                    } else if (uvi > 3 && uvi <= 5) {
                        cityUv.setAttribute('style', 'background-color: yellow; padding: 2px;');
                    } else if (uvi > 5 && uvi <= 8) {
                        cityUv.setAttribute('style', 'background-color: red; padding: 2px;');
                    } else {
                        cityUv.setAttribute('style', 'background-color: purple;, padding: 2px;');
                    }


                    for (var i = 0; i < 6; i++) {
                        console.log(data.daily[i].weather[0].id);
                        var iconid = data.daily[i].weather[0].id;
                        var imgAll = document.getElementsByTagName('img');
                        if (iconid >= 200 && iconid <= 232) {
                            imgAll[i].setAttribute('src', iconArray[6]);
                        } else if (iconid >= 300 && iconid <= 321) {
                            imgAll[i].setAttribute('src', iconArray[4]);
                        } else if (iconid >=500 && iconid <= 504) {
                            imgAll[i].setAttribute('src', iconArray[5]);
                        } else if (iconid = 511) {
                            imgAll[i].setAttribute('src', iconArray[8]);
                        } else if (iconid >= 520 && iconid <= 531) {
                            imgAll[i].setAttribute('src', iconArray[4]);
                        } else if (iconid >= 600 && iconid <= 622) {
                            imgAll[i].setAttribute('src', iconArray[8]);
                        } else if (iconid >= 700 && iconid <=781) {
                            imgAll[i].setAttribute('src', iconArray[9]);
                        } else if (iconid = 800) {
                            imgAll[i].setAtrribute('src', iconArray[0]);
                        } else if (iconid = 801) {
                            imgAll[i].setAtrribute('src', iconArray[1]);
                        } else if (iconid = 802) {
                            imgAll[i].setAtrribute('src', iconArray[2]);
                        } else {
                            imgAll[i].setAtrribute('src', iconArray[3]);
                        }
                        
                    }

                    for (var i = 0; i < 6; i++) {
                        var dateNice = new Date((data.daily[i].dt) * 1000).toDateString();
                        cityDateAll[i].textContent = dateNice;

                    }

                    for (var i = 0; i < 6; i++) {
                        cityTemperature[i].textContent = data.daily[i].temp.day + ' °F';
                    }
                    for (var i = 0; i < 6; i++) {
                        cityWindAll[i].textContent = data.daily[i].wind_speed + ' mph';

                    }
                    for (var i = 0; i < 6; i++) {
                        cityHumidAll[i].textContent = data.daily[i].humidity + '%';
                    }

                    var liEl = document.createElement('li');
                    var buttonEl = document.createElement('button');
                    buttonEl.setAttribute('class', 'w-100 btn btn-success goose');
                    buttonEl.setAttribute('id', 'goose');
                    buttonEl.textContent = document.querySelector('#cityInput').value;
                    liEl.appendChild(buttonEl);
                    var ulEl = document.querySelector('#terms');
                    ulEl.appendChild(liEl);

                    localStorage.setItem('Cities', document.querySelector('#cityInput').value);
                    var oldSearch = document.getElementsByClassName('goose');
                    var oldSearchValue = oldSearch.textContent;

                    console.log(oldSearchValue);


                })
        });
}
var cities = localStorage.getItem('Cities');
localStorage.getItem('Cities');














