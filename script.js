const form = document.querySelector("form");
const forecastContainer = document.querySelector("#weather-forecast");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  // Get the location entered by the user
  const location = form.elements.location.value;

  // Fetch the weather data for the location
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=e74fe9d21a88b4d2baee164974a76016`
  );
  const data = await response.json();

  // Get the current date and time
  const now = new Date();

  // Render the weather forecast data
  forecastContainer.innerHTML = "";
  forecastContainer.innerHTML = `
      <h2>Today's Date: ${now.toLocaleDateString()}</h2>
      <h2>Current Time: ${now.toLocaleTimeString()}</h2>
    `;
  for (let i = 0; i < data.list.length; i += 8) {
    const forecast = data.list[i];
    const forecastTime = new Date(forecast.dt * 1000);
    const temperature = (((forecast.main.temp - 273.15) * 9) / 5 + 32).toFixed(
      2
    );
    // The temperature is in Kelvin, so we need to convert it to Fahrenheit, didn't know how else to fix it.
    forecastContainer.innerHTML += `
        <div class="day">
        <h2>${forecastTime.toLocaleTimeString()}</h2>
        <p>Temperature: ${temperature}°F</p>
        <p>Humidity: ${forecast.main.humidity}%</p>
        <p>Wind Speed: ${forecast.wind.speed} mph</p>
        <p>Weather: ${forecast.weather[0].description}</p>
        <p>Weather Icon: <img src="http://openweathermap.org/img/w/${forecast.weather[0].icon}.png"></p>
        </div>
      `;
  }
});

setInterval(() => {
    const now = new Date();
    dateTimeContainer.innerHTML = `
      <h2>Today's Date: ${now.toLocaleDateString()}</h2>
      <h2>Current Time: ${now.toLocaleTimeString()}</h2>
    `;
  }, 1000);
