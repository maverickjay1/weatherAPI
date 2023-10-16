//Using your own Open Weather Map API Key, access weather data using Axios//

const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?lat=51.507&lon=-0.0878&appid=6d23221c30258425ad91669a8ef415d4";

// Function to fetch weather data
function fetchWeatherData() {
  axios
    .get(apiUrl)
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
}

fetchWeatherData();

//Using Async and Await//

const lat = 51.507;
const lon = -0.0878;
const appid = "6d23221c30258425ad91669a8ef415d4";

const apiUrl1 = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appid}`;

// Function to fetch weather data using async/await
async function fetchWeatherData1() {
  try {
    const response = await axios.get(apiUrl1);

    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}

fetchWeatherData1();

//Customise the url to use the long/lat from the geolocation API//

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
    } else {
      reject(new Error("Geolocation not available"));
    }
  });
}

// Function to fetch weather data using async/await
async function fetchWeatherData2() {
  try {
    // Get user's current location
    const coords = await getUserLocation();

    // Extract latitude and longitude
    const lat = coords.latitude;
    const lon = coords.longitude;

    //OpenWeatherMap API key
    const appid = "6d23221c30258425ad91669a8ef415d4";

    // Construct  URL with user's coordinates
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appid}`;

    // Make request to OpenWeatherMap API
    const response = await axios.get(apiUrl);

    // Handle API response
    console.log(response.data);
  } catch (error) {
    // Handle errors
    console.error(error);
  }
}

// Call async function to fetch weather data
fetchWeatherData2();
