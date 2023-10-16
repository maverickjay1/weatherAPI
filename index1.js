import { getUserLocation } from "./location1.js";

const weatherInfoRef = document.getElementById("weatherInfo");

async function fetchWeatherData() {
  try {
    const coords = await getUserLocation();

    const lat = coords.latitude;
    const lon = coords.longitude;

    const appid = "6d23221c30258425ad91669a8ef415d4"; //OpenWeatherMap API key

    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${appid}`;

    const response = await axios.get(apiUrl);

    console.log(response.data);

    //

    const forecasts = response.data.list;

    // Use map to extract the 9am forecasts
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

fetchWeatherData();

//     // Filter the forecasts for 9 am
//     const forecastsAt9am = response.data.list.filter((forecast) => {
//       const forecastTime = new Date(forecast.dt * 1000);
//       return forecastTime.getUTCHours() === 9;
//     });

//     // Display the 9 am temperature

//     if (forecastsAt9am.length > 0) {
//       const temperatureAt9am = forecastsAt9am[0].main.temp;
//       weatherInfoRef.innerHTML = `Temperature at 9 am: ${temperatureAt9am}°C`;
//     } else {
//       weatherInfoRef.innerHTML = "No data available for 9 am.";
//     }
//   } catch (error) {
//     console.error(error);
//   }
// }

//   //   weatherInfoRef.innerHTML = response.data.list[0].main.temp;
//   // } catch (error) {
//   //   console.error(error);
//   // }
// }

// fetchWeatherData();

////
