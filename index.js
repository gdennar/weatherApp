// const { url } = require("inspector");
const weatherBackground = document.querySelector(".container");
const geolocate = document.querySelector(".geolocation_icon");
const weatherCity = document.querySelector(".city");
const weatherIcon = document.querySelector(".icon");
const weatherDescription = document.querySelector(".description");
const weatherDegree = document.querySelector(".degree");
const weatherForm = document.querySelector("form");
const searchBar = document.querySelector(".weather_search");
const dayOneIcon = document.querySelector(".day_one_icon");
const dayOneTemp = document.querySelector(".day_one_temp");
const dayOnedate = document.querySelector(".day_one_date");
const dayOneDesc = document.querySelector(".day_one_desc");
const dayTwoIcon = document.querySelector(".day_two_icon");
const dayTwoTemp = document.querySelector(".day_two_temp");
const dayTwodate = document.querySelector(".day_two_date");
const dayTwoDesc = document.querySelector(".day_two_desc");
const dayThreeIcon = document.querySelector(".day_three_icon");
const dayThreeTemp = document.querySelector(".day_three_temp");
const dayThreedate = document.querySelector(".day_three_date");
const dayThreeDesc = document.querySelector(".day_three_desc");

const key = "17c7a124322f1ede697513e1195c7c71"; //API KEY

// Geolocation API Call

geolocate.addEventListener("click", (e) => {
	e.preventDefault();
	let long;
	let lat;

	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition((position) => {
document.querySelector(".weather_container").style.display = "block";
document.querySelector(".wrapper").style.height = "80%";
			long = position.coords.longitude;
			lat = position.coords.latitude;

			const api =
				"https://api.openweathermap.org/data/2.5/onecall?lat=" +
				lat +
				"&lon=" +
				long +
				"&appid=" +
				key +
				"&units=metric";
			fetch(api)
				.then((response) => {
					return response.json();
				})
				.then((info) => {
					// Getting selected data from API csll

					const { timezone } = info;
					const { icon, description, main } = info.current.weather[0];
					const { temp } = info.current;

					// Setting current Date
					let date = document.querySelector(".date");
					let todayDate = new Date();
					date.innerText = dateManage(todayDate);

					// Setting forecast Date
					let nextDay = new Date(todayDate);
					nextDay.setDate(todayDate.getDate() + 1);
					const dayOne = dateManage(nextDay);
					dayOnedate.innerHTML = dayOne.slice(13, 21);

					nextDay.setDate(todayDate.getDate() + 2);
					const dayTwo = dateManage(nextDay);
					dayTwodate.innerHTML = dayTwo.slice(9, 20);

					nextDay.setDate(todayDate.getDate() + 3);
					console.log(nextDay);
					const dayThree = dateManage(nextDay);
					dayThreedate.innerHTML = dayThree.slice(9, 20);

					// Setting data to html
					weatherCity.innerText = timezone;
					weatherDegree.innerText = Math.floor(temp) + "°";
					weatherIcon.src =
						"https://openweathermap.org/img/wn/" + icon + ".png";
					weatherDescription.innerText = main;

					// setting data for Forecast Days
					dayOneIcon.src =
						"https://openweathermap.org/img/wn/" +
						info.daily[1].weather[0].icon +
						".png";
					dayOneDesc.innerHTML = info.daily[1].weather[0].description;
					dayOneTemp.innerHTML = Math.floor(info.daily[1].temp.day) + "°";

					dayTwoIcon.src =
						"https://openweathermap.org/img/wn/" +
						info.daily[2].weather[0].icon +
						".png";
					dayTwoTemp.innerHTML = Math.floor(info.daily[2].temp.day) + "°";
					dayTwoDesc.innerHTML = info.daily[2].weather[0].description;

					dayThreeIcon.src =
						"https://openweathermap.org/img/wn/" +
						info.daily[3].weather[0].icon +
						".png";
					dayThreeTemp.innerHTML = Math.floor(info.daily[3].temp.day) + "°";
					dayThreeDesc.innerHTML = info.daily[3].weather[0].description;

					if (weatherDescription.innerText == "Clear") {
						(weatherBackground.style.backgroundImage =
							"url('images/clear.jpg')"),
							(weatherBackground.style.color = "black");
					} else if (weatherDescription.innerText == "Rainy") {
						weatherBackground.style.backgroundImage = "url('images/rainy.jpg')";
					} else if (weatherDescription.innerText == "Snow") {
						(weatherBackground.style.backgroundImage =
							"url('images/snow.jpg')"),
							(weatherBackground.style.color = "black");
					} else if (weatherDescription.innerText == "sunny") {
						(weatherBackground.style.backgroundImage =
							"url('images/sunny.jpg')"),
							(weatherBackground.style.color = "black");
					} else if (weatherDescription.innerText == "Clouds") {
						weatherBackground.style.backgroundImage = "url('images/cloud.jpg')";
					} else if (weatherDescription.innerText == "Thunderstorm") {
						weatherBackground.style.backgroundImage =
							"url('images/thunderstorm.jpg')";
					}
				});
		});
	} else {
		alert("Please enable location to use the geolocation feature");
	}
});

// Date Manage
function dateManage(dateArg) {
	let days = [
		"Sunday",
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday",
	];
	let months = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];

	let year = dateArg.getFullYear();
	let month = months[dateArg.getMonth()];
	let date = dateArg.getDate();
	let day = days[dateArg.getDay()];
	let week = days[dateArg.getDay()];

	return `${date} ${month}, ${day}    ${year}`;
}

// City search Get weather API call

weatherForm.addEventListener("submit", (e) => {
	e.preventDefault();
	const location = e.target.location.value;
	weatherApp(location);
    document.querySelector(".weather_container").style.display = "block";
    document.querySelector(".wrapper").style.height = "80%";
});

async function weatherApp(location) {
	const result = await fetchApi(location);
	displayWeather(result);
}

async function fetchApi(location) {
	const url =
		"https://api.openweathermap.org/data/2.5/weather?q=" +
		location +
		"&appid=17c7a124322f1ede697513e1195c7c71&units=metric";
	const res = await fetch(url);
	const data = await res.json();
	console.log(data);
	return data;
}

// Display weather
function displayWeather(data) {
	const { name } = data;
	const { temp } = data.main;
	const { icon, main, description } = data.weather[0];
	const { speed } = data.wind;
	const { country } = data.sys;
	const { temp_max } = data.main;
	const { temp_min } = data.main;

	weatherCity.innerText = name + ", " + country;
	weatherDegree.innerText = Math.floor(temp) + "°";
	weatherIcon.src = "https://openweathermap.org/img/wn/" + icon + ".png";
	weatherDescription.innerText = main;

	dayOneIcon.src =
		"https://img.icons8.com/external-rabit-jes-outline-color-rabit-jes/100/000000/external-windy-weather-rabit-jes-outline-color-rabit-jes.png";
	dayOneDesc.innerText = Math.round(speed) + "°";

	dayTwoIcon.src = "https://img.icons8.com/clouds/100/000000/document.png";
	dayTwoDesc.innerText = description;

	dayThreeIcon.src =
		"https://img.icons8.com/color/100/000000/temperature--v1.png";
	dayThreeDesc.innerText =
		Math.floor(temp_max) +
		"°" +
		"(max)" +
		"/" +
		Math.floor(temp_min) +
		"°" +
		"(min)";

	// Date Call
	let date = document.querySelector(".date");
	let todayDate = new Date();
	date.innerText = dateManage(todayDate);

	if (weatherDescription.innerText == "Clear") {
		(weatherBackground.style.backgroundImage = "url('images/clear.jpg')"),
			(weatherBackground.style.color = "black");
	} else if (weatherDescription.innerText == "Rainy") {
		(weatherBackground.style.backgroundImage = "url('images/rainy.jpg')");
	} else if (weatherDescription.innerText == "Snow") {
		(weatherBackground.style.backgroundImage = "url('images/snow.jpg')"),
			(weatherBackground.style.color = "black");
	} else if (weatherDescription.innerText == "sunny") {
		(weatherBackground.style.backgroundImage = "url('images/sunny.jpg')"),
			(weatherBackground.style.color = "black");
	} else if (weatherDescription.innerText == "Clouds") {
		weatherBackground.style.backgroundImage = "url('images/cloud.jpg')";
	} else if (weatherDescription.innerText == "Thunderstorm") {
		weatherBackground.style.backgroundImage = "url('images/thunderstorm.jpg')";
	}
}
