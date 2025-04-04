document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("displaySteps").textContent = localStorage.getItem("steps") || 0;
    document.getElementById("displayExercise").textContent = localStorage.getItem("exercise") || 0;
    document.getElementById("displayCalories").textContent = localStorage.getItem("calories") || 0;
    document.getElementById("displayWater").textContent = localStorage.getItem("water") || 0;

    getWeather("pune");
});

function saveData() {
    let steps = document.getElementById("steps").value || 0;
    let exercise = document.getElementById("exercise").value || 0;
    let calories = document.getElementById("calories").value || 0;
    let water = document.getElementById("water").value || 0;

    localStorage.setItem("steps", steps);
    localStorage.setItem("exercise", exercise);
    localStorage.setItem("calories", calories);
    localStorage.setItem("water", water);

    document.getElementById("displaySteps").textContent = steps;
    document.getElementById("displayExercise").textContent = exercise;
    document.getElementById("displayCalories").textContent = calories;
    document.getElementById("displayWater").textContent = water;

    alert("Data saved successfully!");
}

function clearData() {
    localStorage.clear();
    document.getElementById("displaySteps").textContent = 0;
    document.getElementById("displayExercise").textContent = 0;
    document.getElementById("displayCalories").textContent = 0;
    document.getElementById("displayWater").textContent = 0;
    alert("Data cleared!");
}

// Fetch weather from OpenWeather API
function getWeather(city) {
    const apiKey = "d30a224e0636380a91efe7542178478e";

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            document.getElementById("location").textContent = data.name;
            document.getElementById("temperature").textContent = data.main.temp;
            document.getElementById("condition").textContent = data.weather[0].description;

            suggestActivity(data.main.temp);
        })
        .catch(error => console.log("Error fetching weather data:", error));
}

// Suggest activity based on temperature
function suggestActivity(temp) {
    let suggestion = "Great day for a workout!";
    if (temp < 10) {
        suggestion = "It's cold outside. Try an indoor workout!";
    } else if (temp > 30) {
        suggestion = "Stay hydrated! A light workout is best.";
    }
    alert(suggestion);
}

// Handle form submission to fetch weather
document.getElementById("weatherForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const city = document.getElementById("input").value.trim();

    if (city === "") {
        alert("Please enter a city name.");
    } else {
        getWeather(city);
        document.getElementById("input").value = ""; // Clear input field after submission
    }
});
