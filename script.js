
const API_KEY = '6e01dacfa1ae7c17d7d7ca01644c735a';

const temperature = $('.temp');
const mainImg = $('.today__img');
const mainCondition = $('.condition');
const wind = $('.wind').children('p');
const pressure = $('.pressure').children('p');
const humidity = $('.humidity').children('p');
const forecast = $('.forecast');
const cityInput = $('.city');

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export let hoursTemperature = [];
export let hoursTime = [];

cityInput.on('keypress', (e) => {

    if(e.key === 'Enter'){
        console.log(e.target.value);
        alert(e.target.value);
    }
});


(function getWeatherData () {
    console.log('hi');

    fetch(`https://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid=${API_KEY}`)
    .then(res => res.json())
    .then(data => {
        console.log(data);
    });

    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=kyiv&appid=${API_KEY}&units=metric`)
    .then(res2 => res2.json())
    .then(data2 => {
        console.log(data2);
        displayWeatherData(data2);

        for (let i=0; i<8 ; i++){
            hoursTemperature.push(`${Math.round(data2.list[i].main.temp)}`);
            hoursTime.push(`${moment(data2.list[i].dt*1000).format('HH:mm')}`);
        }
        
        console.log(hoursTemperature);
        console.log(hoursTime);
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
                    <p class="day">NOW</p>
                    <img src="https://openweathermap.org/img/wn/${data.list[0].weather[0].icon}@4x.png">
                    <p class="card-temp">${Math.round(data.list[0].main.temp)}</p>
                    <p class="card-condition">${data.list[0].weather[0].main}</p>
                </div>
                <div class="days">
                    <p class="day">${window.moment(data.list[8].dt*1000).format('dddd')}</p>
                    <img src="https://openweathermap.org/img/wn/${data.list[8].weather[0].icon}@4x.png">
                    <p class="card-temp">${Math.round(data.list[8].main.temp)}</p>
                    <p class="card-condition">${data.list[8].weather[0].main}</p>
                </div>
                <div class="days">
                    <p class="day">${window.moment(data.list[16].dt*1000).format('dddd')}</p>
                    <img src="https://openweathermap.org/img/wn/${data.list[14].weather[0].icon}@4x.png">
                    <p class="card-temp">${Math.round(data.list[16].main.temp)}</p>
                    <p class="card-condition">${data.list[16].weather[0].main}</p>
                </div>
                <div class="days">
                    <p class="day">${window.moment(data.list[24].dt*1000).format('dddd')}</p>
                    <img src="https://openweathermap.org/img/wn/${data.list[24].weather[0].icon}@4x.png">
                    <p class="card-temp">${Math.round(data.list[24].main.temp)}</p>
                    <p class="card-condition">${data.list[24].weather[0].main}</p>
                </div>
    `)    
}

setInterval( () => {
    const time = new Date();
    const day = time.getDay();
}, 10000)

console.log(temperature);