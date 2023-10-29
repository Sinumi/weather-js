const APPID = "a7d6f4de4c75517b85893b41fba34ce4";
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather?";

const form = document.getElementById("form");
const submit = document.getElementById("submit");

const getWeather = async (city) => {
  const url = `${BASE_URL}q=${city}&appid=${APPID}&units=metric`;
  const response = await fetch(url);
  const data = await response.json();
  if (data.cod === "404") {
    alert("City not found");
    return;
  }

  console.log(data);
  const mainTag = document.getElementById("main");

  if (mainTag.classList.contains("hidden")) {
    mainTag.classList.remove("hidden");
  }

  const { name, sys, main, weather: weatherData, wind } = data;
  const { country } = sys;
  const { temp, humidity } = main;
  const { description, icon } = weatherData[0];
  const { speed } = wind;

  document.querySelector(".w-city").textContent = name;
  document.querySelector(".w-country").textContent = country;
  document.querySelector(".w-temp").textContent = Math.round(temp) + "°C";
  document.querySelector(
    ".w-icon"
  ).src = `http://openweathermap.org/img/wn/${icon}.png`;
  document.querySelector(".w-humidity").textContent = humidity;
  document.querySelector(".w-desc").textContent = description;
  document.querySelector(".w-wind").textContent = speed;
};

submit.addEventListener("click", async (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  const city = formData.get("city");

  if (!city) {
    alert("Please enter a city");
    return;
  }

  await getWeather(city);
});

getWeather("Tashkent");
