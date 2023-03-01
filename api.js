var key = "e671c5b57f027d000fa8db46a63cfd7b";

window.addEventListener("load", function () {
	var preloader = document.getElementById("preloader");
	preloader.style.display = "none";
});

window.onload = () => {
	weatherBalloon();
};

function getCityID() {
	const cityName = document.querySelector("input").value;
	return fetch(
		`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${key}`
	)
		.then((response) => response.json())
		.then((data) => {
			const cityId = data.id;
			console.log(`The ID of ${cityName} is ${cityId}`);
			return cityId;
		})
		.catch();
}

function clearInput() {
	document.getElementById("input-id").value = "";
}

function weatherBalloon() {
	getCityID().then((cityId) => {
		console.log(cityId);
		fetch(
			`https://api.openweathermap.org/data/2.5/weather?id=${cityId}&lang=ru&appid=${key}`
		)
			.then(function (resp) {
				return resp.json();
			})
			.then(function (data) {
				console.log(data);
				document.getElementById("input-id").style.color = "black";
				drawWeather(data);
			})
			.catch(() => (document.getElementById("input-id").style.color = "red"));
	});
}

function submit() {
	weatherBalloon();
}

function toCelc(n) {
	return Math.round(parseFloat(n) - 273.15);
}

function drawWeather(data) {
	let humidity = data.main.humidity; // влажность
	let temp = toCelc(data.main.temp); // температура в цельсиях
	let temp_max = toCelc(data.main.temp_max); // максимальная температура
	let temp_min = toCelc(data.main.temp_min); // минимальная температура
	let grnd_level = data.main.grnd_level; // давление
	let description = data.weather[0].description; // описание погоды
	let feels_like = toCelc(data.main.feels_like); //как чувствуется
	let city = data.name; // город
	let visibility = data.visibility / 1000; // видимость

	let wind = data.wind.gust;
	if (wind === undefined) {
		wind = 0;
	}
	if (grnd_level === undefined) {
		grnd_level = 0;
	}

	let sunrise = new Date(data.sys.sunrise * 1000) // восход солнца и перевод даты в время формата 00:00
		.toLocaleString()
		.split("")
		.slice(12, 17)
		.join("");

	console.log(
		humidity,
		temp,
		grnd_level,
		description,
		feels_like,
		temp_max,
		temp_min,
		sunrise,
		wind
	);

	drawVideo(data);

	document.getElementById("sunrise").innerHTML = sunrise;
	document.getElementById("wind").innerHTML = `${Math.round(wind)} `;
	document.getElementById("temp").innerHTML = `${temp}°`;
	document.getElementById(
		"temp_max_min"
	).innerHTML = `Макс: ${temp_max}°, Мин: ${temp_min}°`;
	document.getElementById("humidity").innerHTML = `${humidity}%`;
	document.getElementById("feels_like").innerHTML = ` ${feels_like}°`;
	document.getElementById("grnd_level").innerHTML = `${grnd_level} `;
	document.getElementById("description").innerHTML = description;
	document.getElementById("city").innerHTML = city;
	document.getElementById("visibility").innerHTML = `${Math.round(
		visibility
	)} км`;
}

function drawVideo(data) {
	var video = document.getElementById("myVideo");
	var descriptionData = data.weather[0].main.toLowerCase();

	if (descriptionData.includes("rain")) {
		video.src = "video/rain.mp4";
	} else if (descriptionData.includes("clouds")) {
		video.src = "video/clouds.mp4";
	} else if (descriptionData.includes("snow")) {
		video.src = "video/snow.mp4";
	} else if (descriptionData.includes("thunderstorm")) {
		video.src = "video/thunderstorm.mp4";
	} else if (descriptionData.includes("mist")) {
		video.src = "video/mist.mp4";
	} else if (descriptionData.includes("drizzle")) {
		video.src = "video/drizzle.mp4";
	} else if (descriptionData.includes("smoke")) {
		video.src = "video/smoke.mp4";
	} else {
		video.src = "video/sunny.mp4";
	}
}
