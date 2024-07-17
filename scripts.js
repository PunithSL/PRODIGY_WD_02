const apiKey = "c76146584c0b4fa4a0a41903241707";

document
  .querySelector(".weatherForm")
  .addEventListener("submit", async (event) => {
    event.preventDefault();
    const city = document.querySelector(".cityInput").value;

    if (city) {
      try {
        const weatherData = await getWeatherData(city);
        displayWeather(weatherData);
      } catch (err) {
        alert(err.message);
      }
    } else {
      alert("Please enter a city name");
    }
  });

async function getWeatherData(city) {
  const response = await fetch(
    `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=7&aqi=no&alerts=no`
  );
  if (!response.ok) throw new Error("Failed to fetch weather");
  return await response.json();
}

function displayWeather(data) {
  const {
    location: { name, region, country, lat, lon, localtime },
    forecast,
    current: {
      condition: { text, icon },
      humidity,
      temp_c,
      uv,
      wind_kph,
    },
  } = data;

  document
    .querySelectorAll("#city")
    .forEach((city) => (city.textContent = name));
  document.querySelector("#condition").textContent = text;
  document
    .querySelectorAll("#temp")
    .forEach((temp) => (temp.textContent = `${temp_c}°C`));
  document.querySelector("#city_state").textContent = region;
  document.querySelector("#city_country").textContent = country;
  document.querySelector("#latitude").textContent = lat;
  document.querySelector("#longitude").textContent = lon;
  document.querySelector("#date_time").textContent = localtime;
  document.querySelector("#humidity").textContent = `${humidity}%`;
  document.querySelector("#wind").textContent = `${wind_kph} km/h`;
  document.querySelector("#uv").textContent = uv;
  document.querySelector("#today_icon").src = `https:${icon}`;

  const days = forecast.forecastday;
  days.forEach((day, index) => {
    document.querySelector(`.time${index}`).textContent = day.date;
    document.querySelector(`.temp${index}`).textContent = day.day.avgtemp_c;
    document.querySelector(
      `#icon${index}`
    ).src = `https:${day.day.condition.icon}`;
  });
}
