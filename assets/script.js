var searchButton = document.querySelector(".search-button");
var cityLocation = document.querySelector(".city-name");
var apiURL = "";
var apiKEY = "4304f5e02c797a7e5842566209712fee";
var cityHistory = JSON.parse(localStorage.getItem("weatherforecast"))||[];

function getCityLocation() {
    var cityName = cityLocation.value.trim();
    if (!cityName) return;

    apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKEY}&units=imperial`;

    fetch(apiURL)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            console.log(cityName);
            updateCurrentWeather(data);
            cityHistory.push(cityName);
            localStorage.setItem("weatherforecast",JSON.stringify(cityHistory));

            get5DayForecast(cityName);

            updateCityHistory();
        })
        .catch(error => {
            console.error("Error getting data!", error);
        });
}

function updateCurrentWeather(data) {
    var cityElement = document.getElementById("city");
    var tempElement = document.getElementById("temp");
    var humidityElement = document.getElementById("humidity");
    var windElement = document.getElementById("wind");
    var iconElement = document.getElementById("current-icon");
    var weathertypeElement = document.getElementById("weather-type");

    if (cityElement) {
        cityElement.textContent = `${data.name}`;
    }

    if (tempElement) {
        
        tempElement.textContent = `Temp: ${data.main.temp}°F`;
    }

    if (humidityElement) {
        humidityElement.textContent = `Humidity: ${data.main.humidity}%`;
    }

    if (windElement) {
        windElement.textContent = `Wind: ${data.wind.speed}mph`;
    }
    iconElement.setAttribute("src",`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);
    weathertypeElement.textContent = data.weather[0].description;

}

// get5DayForecast();

function updateCityHistory() {
    var cityHistoryElement = document.getElementById("cityHistory");

    
    if (cityHistoryElement) {
        cityHistoryElement.innerHTML = "";
        cityHistory.forEach(city => {
            var buttonItem = document.createElement("button");
            buttonItem.textContent = city;
            buttonItem.addEventListener("click", () => {
                getWeatherBySearch(city);
            });
            cityHistoryElement.appendChild(buttonItem)
        });
    }
}

        
updateCityHistory()

function getWeatherBySearch(cityName) {
    var cityURL =`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKEY}&units=imperial`;
    fetch(cityURL)
    .then(res => res.json())
    .then(data => {
        console.log(data);
        updateCurrentWeather(data);
        get5DayForecast(cityName)
        })
        .catch(error => {
            console.error("Error getting data!", error);
    });
}

function get5DayForecast(cityName) {
    var forecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKEY}&units=imperial`;
    console.log(forecastURL)
    fetch(forecastURL)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            updateForecast(data.list);
        })
        .catch(error => {
            console.error("Error getting forecast data!", error);
        });
}
 function updateForecast(data) {
    var weatherCards = document.getElementById("weather-cards");
    weatherCards.innerHTML = ""

    
    weatherCards.classList.add("cards");
    let currentDate = ""
    data.forEach((forecast, index) => {
        if(currentDate != forecast.dt_txt.split(" ")[0]){
        var cardList = document.createElement("li");
        cardList.classList.add("cards")
        
        
        var forecastDayJs = dayjs(forecast.dt_txt).format("dddd, MMM D");

        var iconCode = forecast.weather[0].icon;

        var iconsURL = `https://openweathermap.org/img/wn/${iconCode}.png`;


        cardList.innerHTML = `<h3>${forecastDayJs}</h3>
        <img src="${iconsURL}" alt="weather-icon">
        <h4> ${forecast.weather[0].description} </h4>
        <h4>Temp: ${forecast.main.temp}°F</h4>
        <h4>Humidity: ${forecast.main.humidity}%</h4>
        <h4>Wind Speed: ${forecast.wind.speed}mph</h4>`;

        weatherCards.appendChild(cardList);
        currentDate = forecast.dt_txt.split(" ")[0]

        }

    });

    

 }

searchButton.addEventListener("click", getCityLocation);