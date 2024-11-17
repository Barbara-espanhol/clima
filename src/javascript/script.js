document.querySelector('.search').addEventListener('submit', async (event) => {
    event.preventDefault();

    const cityName = document.querySelector('#city-name').value;

    if (!cityName) {
        document.querySelector(".weather").classList.remove('show');
        showAlert('Você precisa digitar uma cidade...')
        return;
    }

    const apiKey = '2127a2db506a20da5bf13f03c4e68855';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(cityName)}&appid=${apiKey}&units=metric&lang=pt_br`

    const results = await fetch(apiUrl);
    const json = await results.json();

    if (json.cod === 200) {
        showInfo({
            city: json.name,
            country: json.sys.country,
            temp: json.main.temp,
            tempMax: json.main.temp_max,
            tempMin: json.main.temp_min,
            tempIcon: json.weather[0].icon,
            windSpeed: json.wind.speed,
            humidity: json.main.humidity,
        });
    }else {
        document.querySelector(".weather").classList.remove('show');
        showAlert(`Não foi possível localizar...
            <img src= "img/notfound.png"/>
        `)
    }
});

function showInfo(json){
    showAlert('');

    document.querySelector(".weather").classList.add('show');

    document.querySelector('.title').innerHTML = `${json.city}, ${json.country}`;
    document.querySelector('.temp').innerHTML = `${json.temp.toFixed(0)}<sup>°C</sup>`;
    document.querySelector('#weather-icon').setAttribute('src', `https://openweathermap.org/img/wn/${json.tempIcon}@2x.png`)
    document.querySelector('.temp-max').innerHTML = `${json.tempMax.toFixed(0)}<sup>°C</sup>`;
    document.querySelector('.temp-min').innerHTML = `${json.tempMin.toFixed(0)}<sup>°C</sup>`;
    document.querySelector('.humidity').innerHTML = `${json.humidity}%`;
    document.querySelector('.wind').innerHTML = `${json.windSpeed.toFixed(1)}Km/h`;
} 

function showAlert(msg) {
    document.querySelector('#alert').innerHTML = msg;
}

