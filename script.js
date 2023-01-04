
const API_KEY = '6e01dacfa1ae7c17d7d7ca01644c735a';

const temperature = $('.temp');
const mainImg = $('.today__img');
const mainCondition = $('.condition');
const wind = $('.wind').children('p');
const pressure = $('.pressure').children('p');
const humidity = $('.humidity').children('p');
const forecast = $('.forecast');

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export let message = [1, 2, 3];

(function getWeatherData () {
    console.log('hi');

    fetch(`https://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid=${API_KEY}`)
    .then(res => res.json())
    .then(data => {
        console.log(data);
    });

    fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=50.45&lon=30.52&appid=${API_KEY}&units=metric`)
    .then(res2 => res2.json())
    .then(data2 => {
        console.log(data2);
        displayWeatherData(data2);
    });
})();

function displayWeatherData(data){

    temperature.text(Math.round(data.list[0].main.temp));

    mainImg.attr('src', `https://openweathermap.org/img/wn/${data.list[0].weather[0].icon}@4x.png`)
    mainCondition.text(data.list[0].weather[0].main.toUpperCase());
    wind.text(`${data.list[0].wind.speed} m/s`);
    pressure.text(`${data.list[0].main.pressure} hPa`);
    humidity.text(`${data.list[0].main.humidity} %`);

    console.log(moment().day())
    
    forecast.html(`<div class="days">
                    <p class="day">Today</p>
                    <img src="https://openweathermap.org/img/wn/${data.list[0].weather[0].icon}@4x.png">
                    <p class="card-temp">${Math.round(data.list[0].main.temp)}</p>
                    <p class="card-condition">${data.list[0].weather[0].main}</p>
                </div>
                <div class="days">
                    <p class="day">${window.moment(data.list[7].dt*1000).format('dddd')}</p>
                    <img src="https://openweathermap.org/img/wn/${data.list[7].weather[0].icon}@4x.png">
                    <p class="card-temp">${Math.round(data.list[7].main.temp)}</p>
                    <p class="card-condition">${data.list[7].weather[0].main}</p>
                </div>
                <div class="days">
                    <p class="day">${window.moment(data.list[15].dt*1000).format('dddd')}</p>
                    <img src="https://openweathermap.org/img/wn/${data.list[14].weather[0].icon}@4x.png">
                    <p class="card-temp">${Math.round(data.list[15].main.temp)}</p>
                    <p class="card-condition">${data.list[15].weather[0].main}</p>
                </div>
                <div class="days">
                    <p class="day">${window.moment(data.list[23].dt*1000).format('dddd')}</p>
                    <img src="https://openweathermap.org/img/wn/${data.list[23].weather[0].icon}@4x.png">
                    <p class="card-temp">${Math.round(data.list[23].main.temp)}</p>
                    <p class="card-condition">${data.list[23].weather[0].main}</p>
                </div>
    `)

    
}

setInterval( () => {
    const time = new Date();
    const day = time.getDay();

}, 10000)

console.log(temperature);