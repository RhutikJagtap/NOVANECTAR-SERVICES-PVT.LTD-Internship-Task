const form = document.querySelector("form");
const todayDay = document.querySelector(".today-left h2");
const todayDate = document.querySelector(".today-left span");
const todayLocation = document.querySelector(".today-left > div > span");
const todayIcon = document.querySelector(".today-right i");
const todayTemperature = document.querySelector(".today-right h1");
const todayDescription = document.querySelector(".today-right span");
const todayPrecipitation = document.querySelector(".today-detail span:nth-child(1)");
const todayHumidity = document.querySelector(".today-detail span:nth-child(2)");
const todayWindSpeed = document.querySelector(".today-detail span:nth-child(3)");
const futureDays = document.querySelector(".future");

const weatherIcons = {
    "01d": "☀️", "01n": "🌙",
    "02d": "🌤️", "02n": "🌙☁️",
    "03d": "☁️", "03n": "☁️",
    "04d": "🌥️", "04n": "🌥️",
    "09d": "🌧️", "09n": "🌧️",
    "10d": "🌦️", "10n": "🌦️",
    "11d": "⛈️", "11n": "⛈️",
    "13d": "❄️", "13n": "❄️",
    "50d": "🌫️", "50n": "🌫️"
};

const fetchData = (city) => {
    const apiKey = "d30a224e0636380a91efe7542178478e";
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error("Weather data could not be retrieved.");
            }
            return response.json();
        })
        .then(data => {
            // Update today's weather
            todayDay.textContent = new Date().toLocaleDateString("en", { weekday: "long" });
            todayDate.textContent = new Date().toLocaleDateString("en", { day: "numeric", month: "long", year: "numeric" });
            todayLocation.textContent = `${data.city.name}, ${data.city.country}`;

            todayIcon.innerHTML = weatherIcons[data.list[0].weather[0].icon] || "🌈"; // Fallback icon
            todayTemperature.innerHTML = `${Math.round(data.list[0].main.temp)}&#8451;`;
            todayDescription.textContent = data.list[0].weather[0].description;
            todayPrecipitation.textContent = `Precipitation : ${Math.round(data.list[0].pop * 100)}%`;
            todayHumidity.textContent = `Humidity : ${data.list[0].main.humidity}%`;
            todayWindSpeed.textContent = `Wind Speed : ${data.list[0].wind.speed} m/s`;

            // Update future weather
            const futureWeather = data.list.slice(8, 40);
            futureDays.innerHTML = "";

            futureWeather.forEach((forecast, index) => {
                if (index % 8 === 0) {
                    const date = new Date(forecast.dt * 1000);
                    const day = date.toLocaleDateString("en", { weekday: "long" });
                    const temperature = Math.round(forecast.main.temp);
                    const description = forecast.weather[0].description;
                    const icon = forecast.weather[0].icon;

                    const futureDayElement = document.createElement("div");
                    futureDayElement.classList.add("future-day");
                    futureDayElement.innerHTML = `
                        <p class="day">${day}</p>
                        <span class="weather-icon">${weatherIcons[icon] || "🌈"}</span>
                        <p class="temperature">${temperature}°C</p>
                        <p class="description">${description}</p>
                    `;
                    futureDays.appendChild(futureDayElement);
                }
            });
        })
        .catch(error => {
            alert(error.message);
        });
};

document.addEventListener("DOMContentLoaded", () => {
    fetchData("Pune");
});

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const city = document.getElementById("input").value.trim();

    if (city === "") {
        alert("Please enter a city name.");
    } else {
        fetchData(city);
        document.getElementById("input").value = "";
    }
});
