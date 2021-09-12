const KEY = "b5795e9a7e0f97aba1d4ea280795fe87";
let button = document.querySelector(".app__btn");
let input = document.querySelector(".app__input");
let city = document.querySelector(".header__city");
let country = document.querySelector(".header__country");
let form = document.querySelector(".app__form");
let imgOfWeather = document.querySelector(".main-app__img");
let humidity = document.querySelector(".humidity__value");
let pressure = document.querySelector(".pressure__value");
let temperature = document.querySelector(".temperature__value");
let wind = document.querySelector(".wind__value");
let weatherDescription = document.querySelector(".main-app__weather");
let dayOfWeek = document.querySelector(".day__value");
let hour = document.querySelector(".time__value");
let now = new Date();
let img = document.querySelector(".cat");
let addInfo = document.querySelector(".add-info");
let headerCity = document.querySelector(".header__city");
let mainInfo = document.querySelector(".main__info");

addInfo.style.display = "none";
headerCity.style.display = "none";

const days = {
  0: "Sunday",
  1: "Monday",
  2: "Tuesday",
  3: "Wednesday",
  4: "Thursday",
  5: "Friday",
  6: "Saturday",
};

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  let promise = getCurrentWeather(input.value);
  //   promise
  //     .then((response) => response.json())
  //     .then((data) => console.log(data))
  //     .catch((err) => {
  //       console.log("err");
  //     });

  const response = await promise;
  const data = await response.json();
  console.log(data);
  if (!data.sys.country) {
    mainInfo.innerHTML = "Sorry, try again";
    img.style.display = "none";
  } else {
    city.innerHTML = input.value;
    imgOfWeather.setAttribute("src", `http://openweathermap.org/img/w/${data.weather[0].icon}.png`);
    humidity.innerHTML = data.main.humidity;
    pressure.innerHTML = data.main.pressure;
    temperature.innerHTML = data.main.temp;
    wind.innerHTML = data.wind.speed;
    weatherDescription.innerHTML = data.weather[0].main;
    dayOfWeek.innerHTML = days[now.getDay().toString()];
    hour.innerHTML = now.toString().split(" ")[4];
    img.style.display = "none";
    addInfo.style.display = "grid";
    headerCity.style.display = "block";
  }
});

async function getCurrentWeather(city) {
  return fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${KEY}`);
}
