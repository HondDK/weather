var key = "e671c5b57f027d000fa8db46a63cfd7b";

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
		.catch((error) => console.error(error));
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
				drawWeather(data);
			})
			.catch(function () {});
	});
}

window.onload = () => {
	weatherBalloon();
	console.log();
};
function submit() {
	weatherBalloon();
}

function toCelc(i) {
	return Math.round(parseFloat(i) - 273.15);
}

function drawWeather(data) {
	let humidity = data.main.humidity; // влажность
	let temp = toCelc(data.main.temp); // температура в цельсиях
	let temp_max = toCelc(data.main.temp_max); // максимальная температура
	let temp_min = toCelc(data.main.temp_min); // минимальная температура
	let grnd_level = data.main.grnd_level; // давление
	let description = data.weather[0].description; // описание погоды
	let feels_like = toCelc(data.main.feels_like); //как чувствуется
	let city = data.name;
	let visibility = data.visibility / 1000;
	let rain = data.rain;
	let wind = data.wind.gust;

	let sunrise = new Date(data.sys.sunrise * 1000)
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
	document.getElementById("sunrise").innerHTML = sunrise;
	document.getElementById("wind").innerHTML = `${wind} м/c`;
	document.getElementById("temp").innerHTML = `${temp}°`;
	document.getElementById(
		"temp_max_min"
	).innerHTML = `Максимум ${temp_max}° градуса, Минимум ${temp_min}° градуса`;
	document.getElementById("humidity").innerHTML = `${humidity}%`;
	document.getElementById("feels_like").innerHTML = ` ${feels_like}°`;
	document.getElementById("grnd_level").innerHTML = `${grnd_level} гПа`;
	document.getElementById("description").innerHTML = description;
	document.getElementById("city").innerHTML = city;
	document.getElementById("visibility").innerHTML = `${visibility} км`;
	document.getElementById("rain").innerHTML = rain;
}
