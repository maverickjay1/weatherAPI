const weatherInfoRef = document.getElementById("weatherInfo");
const locationInputRef = document.getElementById("locationInput");
const searchButtonRef = document.getElementById("searchButton");

async function fetchWeatherData() {
  try {
    const coords = await getUserLocation();

    const lat = coords.latitude;
    const lon = coords.longitude;

    const appid = "6d23221c30258425ad91669a8ef415d4"; // OpenWeatherMap API key

    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${appid}`;

    const response = await axios.get(apiUrl);

    console.log(response.data);

    const forecasts = response.data.list;

    // Use map to extract the 9 am forecasts
    const forecastsAt9am = forecasts.filter(
      (forecast) => new Date(forecast.dt * 1000).getUTCHours() === 9
    );

    // Extract and display the next 5 days at 9 am
    const next5DaysForecasts = forecastsAt9am.slice(0, 5);
    weatherInfoRef.innerHTML = "<h2>Next 5 Days at 9 am:</h2>";

    next5DaysForecasts.forEach((forecast, index) => {
      const forecastTime = new Date(forecast.dt * 1000);

      // Calculate temperature in Celsius
      const temperatureCelsius = (forecast.main.temp - 273.15).toFixed(2);

      // Display the forecast with date and temperature in Celsius
      weatherInfoRef.innerHTML += `<p>Day ${
        index + 1
      }: ${forecastTime.toDateString()}, 9 am - Temperature: ${temperatureCelsius}°C</p>`;
    });
  } catch (error) {
    console.error(error);
  }
}

// event listener for search button
searchButtonRef.addEventListener("click", async () => {
  const location = locationInputRef.value;

  //geocoding service
  try {
    const geocodingUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${location},GB&limit=1&appid=37b29f091f8754cf8600dea56dee3863`;
    // `https://geocoding-service-url?q=${location}`;
    const geocodingResponse = await axios.get(geocodingUrl);

    if (geocodingResponse.data && geocodingResponse.data.length > 0) {
      const lat = geocodingResponse.data[0].lat;
      const lon = geocodingResponse.data[0].lon;

      fetchWeatherData(lat, lon);
    }
  } catch (error) {
    console.error("Geocoding error: ", error);
  }
});

function getUserLocation() {
  return new Promise((resolve, reject) => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve(position.coords);
        },
        (error) => {
          reject(error);
        }
      );
    }
  });
}

fetchWeatherData();
