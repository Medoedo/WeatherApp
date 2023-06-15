const container = document.querySelector(".container");
const search = document.querySelector(".search-box button");
const weatherBox = document.querySelector(".weather-box");
const weatherDetails = document.querySelector(".details");
const error404 = document.querySelector(".not-found");

search.addEventListener("click", () => {
    const _API_KEY = '94b39f8b1d3ca0890fb541b1917ee836';
    const city = document.querySelector(".search-box input").value;

    if (city === "") return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=${_API_KEY}`)
        .then(response => response.json())
        .then(json => {

            if (json.cod === "404") {
                container.style.height = "400px";
                weatherBox.style.display = "none";
                weatherDetails.style.display = "none";
                error404.style.display = "block";
                error404.classList.add("fadeIn")
                return;
            }

            error404.classList.remove("fadeIn");
            error404.style.display = "none";

            weatherBox.style.display = "";
            weatherDetails.style.display = "";
            weatherBox.classList.add("fadeIn")
            weatherDetails.classList.add("fadeIn")
            container.style.height = "590px";


            document.querySelector(".weather-box .temperature").innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
            document.querySelector(".weather-box .description").innerHTML = `${(json.weather[0].description)}`;
            document.querySelector(".details .humidity span").innerHTML = `${(json.main.humidity)}%`;
            document.querySelector(".details .wind span").innerHTML = `${(parseInt(json.wind.speed))}Km/h`;

            const image = document.querySelector(".weather-box img");

            switch (json.weather[0].main) {
                case "Clear":
                    image.src = "images/clear.png";
                    break;
                case "Clouds":
                    image.src = "images/cloud.png";
                    break;
                case "Rain":
                    image.src = "images/rain.png";
                    break;
                case "Snow":
                    image.src = "images/snow.png";
                    break;
                case "Haze":
                    image.src = "images/mist.png";
                    break;
                default:
                    image.src = "";
            }
        })
})
