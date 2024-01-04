var searchButton = document.querySelector(".search-button");
var cityLocation = document.querySelector(".city-name");
var apiURL = "";
var apiKEY = "4304f5e02c797a7e5842566209712fee";
var cityHistory = []

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
            cityHistory.push(cityName)

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
}

function updateCityHistory() {
    var cityHistoryElement = document.getElementById("cityHistory");

    
    if (cityHistoryElement) {
        cityHistoryElement.innerHTML = "";
        cityHistory.forEach(city => {
            var listItem = document.createElement("li");
            listItem.textContent = city;
            listItem.addEventListener("click", () => {
                getWeatherBySearch(city);
            });
            cityHistoryElement.appendChild(listItem)
        });
    }
}

function getWeatherBySearch(city) {
    var cityURL =`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKEY}&units=imperial`;
    fetch(cityURL)
    .then(res => res.json())
    .then(data => {
        console.log(data);
        updateCurrentWeather(data);
        })
        .catch(error => {
            console.error("Error getting data!", error);
    });
}


searchButton.addEventListener("click", getCityLocation);