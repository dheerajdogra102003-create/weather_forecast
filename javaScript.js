

const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const apiKey = "&appid=d63d4e40d08aaa67b23669e5081abd86";

const searchbox = document.querySelector(".search input");
const searchbtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
  const response = await fetch(apiUrl + city + apiKey);

  if (response.status == 404) {
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
  } else {
    var data = await response.json();

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
    document.querySelector(".windSpeed").innerHTML = data.wind.speed + "km/h";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";

    if (data.weather[0].main == "Clouds") {
      weatherIcon.src = "images/cloudy2.png";
    } else if (data.weather[0].main == "Rain") {
      weatherIcon.src = "images/rain1.png";
    } else if (data.weather[0].main == "Drizzle") {
      weatherIcon.src = "images/drizzle1.png";
    } else if (data.weather[0].main == "Clear") {
      weatherIcon.src = "images/clearSky.png";
    } else if (data.weather[0].main == "Snow") {
      weatherIcon.src = "images/snow2.png";
    }

    document.querySelector(".error").style.display = "none";
    document.querySelector(".weather").style.display = "block";

    // Send weather data to PHP for database insertion
    sendWeatherDataToServer(data);
   // console.log(data);
  }
}

// Function to send weather data to PHP
async function sendWeatherDataToServer(weatherData) {
  try {
    const response = await fetch("connection.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(weatherData), // Sending data as JSON
    });

    const result = await response.text(); // or response.json() depending on your response
   // console.log(result); // Log response from the PHP server
  } catch (error) {
    console.error("Error sending data to PHP:", error);
  }
//  console.log(data);
}

searchbtn.addEventListener("click", () => {
  checkWeather(searchbox.value);

});
