// DAY AND DATE

let now = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let date = now.getDate();
let day = days[now.getDay()];
let hour = now.getHours();
let minutes = now.getMinutes();
{
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
}
{
  if (hour < 10) {
    hour = `0${hour}`;
  }
}

let h3 = document.querySelector("#actual-date");

h3.innerHTML = `${day} ${hour}:${minutes}`;

// SEARCH FOR LOCATION

var city = "London";

let apiKey = "cf6bce2bff74fdd5748a172d2966f4f1";
var apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(showTemperature);

function changeCity(event) {
  event.preventDefault();
  let cityName = document.querySelector("#search-button");
  let cityLabel = document.querySelector("#cityLabel");

  if (cityName.value) {
    var input = cityName.value;
    input = input.toLowerCase();
    var firstLetter = input.charAt(0);
    input = input.substr(1);
    firstLetter = firstLetter.toUpperCase();
    input = firstLetter + input;
    cityLabel.innerHTML = input;
    console.log("Call");
    console.log(city);
    apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=${apiKey}&units=metric`;
    axios
      .get(apiUrl)
      .then(showTemperature)
      .catch((error) => {
        cityLabel.innerHTML = "Not found";
        alert("The city you entered does not exist.");
      });
  } else {
    alert("Don't forget to type a city!");
  }
}

let form = document.querySelector("#city-form");

form.addEventListener("submit", changeCity);

function degrees(event) {
  event.preventDefault();
  let cityName = document.querySelector("#search-button");
  let cityLabel = document.querySelector("#cityLabel");
  if (degrees == "F") {
    cityLabel.innerHTML = cityName.value;
  } else {
    alert("Don't forget to type a city!");
  }
}

function showTemperature(response) {
  console.log(response);
  if (response.data.cod == 200) {
    let temperature = Math.round(response.data.main.temp);
    let tempElement = document.querySelector("#temperature");
    tempElement.innerHTML = `${temperature}°C`;

    let feels = document.querySelector("#windItem");
    let feelsLike = Math.round(response.data.main.feels_like);
    feels.innerHTML = `${feelsLike} °C`;

    let forecast = document.querySelector("#forecastItem");
    let theForecast = response.data.weather[0].main;
    forecast.innerHTML = `${theForecast}`;

    let iconElement = document.querySelector("#icon");
    iconElement.setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );

    let sunrise = document.querySelector("#sunriseItem");
    let theSunrise = new Date(response.data.sys.sunrise * 1000);
    let sunriseHour = theSunrise.getHours();
    let sunriseMinute = theSunrise.getMinutes();

    if (sunriseMinute < 10) {
      sunriseMinute = `0${sunriseMinute}`;
    }

    sunrise.innerHTML = `${sunriseHour}:${sunriseMinute}`;

    let sunset = document.querySelector("#sunsetItem");
    let theSunset = new Date(response.data.sys.sunset * 1000);
    let sunsetHour = theSunset.getHours();
    let sunsetMinute = theSunset.getMinutes();

    if (sunsetMinute < 10) {
      sunsetMinute = `0${sunsetMinute}`;
    }

    sunset.innerHTML = `${sunsetHour}:${sunsetMinute}`;
  } else if (response.data.cod == 404) {
    alert(response.data.message);
  }
}

// CURRENT POSITION

// function showPosition(response) {
//   let keyGoogle = "AIzaSyDJjF0WCjyUVaNqBhbzURFwfMJskmmxm_Q";
//   var lat = position.coords.latitude;
//   var lng = position.coords.longitude;
//   let latLng = `${lat} ${lng}`;
//   let urlGoogle = `https://maps.googleapis.com/maps/api/geocode/json?latlng=40.714224,-73.961452&key=${keyGoogle}`;
//   let city = document.querySelector("#cityLabel");

//   city.innerHTML = `${position.coords.latitude}, ${position.coords.longitude}`;
// }

// function getCurrentPosition() {
//   navigator.geolocation.getCurrentPosition(showPosition);
// }

// let button = document.querySelector("#current-button");
// button.addEventListener("click", getCurrentPosition);

function showPosition(position) {
  let city = document.querySelector("#cityLabel");
  city.innerHTML = `${position.coords.latitude}, ${position.coords.longitude}`;
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let button = document.querySelector("#current-button");
button.addEventListener("click", getCurrentPosition);
