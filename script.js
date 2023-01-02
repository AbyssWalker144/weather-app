
const API_KEY = '6e01dacfa1ae7c17d7d7ca01644c735a';

const temperature = $('.temp');
const mainImg = $('.today__img');
const mainCondition = $('.condition');
const wind = $('.wind').children('p');
const pressure = $('.pressure').children('p');
const humidity = $('.humidity').children('p');

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
        temperature.text(Math.round(data2.list[0].main.temp));
        
        mainImg.attr('src', `https://openweathermap.org/img/wn/${data2.list[0].weather[0].icon}@4x.png`)
        mainCondition.text(data2.list[0].weather[0].main.toUpperCase());
        wind.text(`${data2.list[0].wind.speed} m/s`);
        pressure.text(`${data2.list[0].main.pressure} hPa`);
        humidity.text(`${data2.list[0].main.humidity} %`)
    });
})();


console.log(temperature)