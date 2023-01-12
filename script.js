// import { updateChartData } from "./chart.js";


const API_KEY = '6e01dacfa1ae7c17d7d7ca01644c735a';

const temperature = $('.temp');
const mainImg = $('.today__img');
const mainCondition = $('.condition');
const wind = $('.wind').children('p');
const pressure = $('.pressure').children('p');
const humidity = $('.humidity').children('p');
const forecast = $('.forecast');
const cityInput = $('.city');
const units = $('.units');

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];



let hoursTemperature = [];
let hoursTime = [];

let cityName = '';
let temperatureMultuplier = 1;

let dataTemp = [];
let dataPress = [];
let dataHum = [];
let dataWind = [];
let dataImg = [];

getWeatherData();
// updateChartData();

units.click((e) => {
    console.log(e.target.checked);
    // e.target.checked ? dataTemp.map( item => item = Math.round(item* 1.8 + 32)) : dataTemp.map( item => item = Math.round( (item - 32)/1.8) );

    if(e.target.checked) {
        dataTemp.map( (item, index) => {
            dataTemp[index] = Math.round(item* 1.8 + 32);
        });
    } else{
        dataTemp.map( (item, index) => {
            dataTemp[index] = Math.round((item - 32)/1.8);
        });
    }
    console.log(dataTemp);
    displayWeatherData;
});

cityInput.on('keypress', (e) => {

    if(e.key === 'Enter'){
        
        console.log(e.target.value);
        // alert(e.target.value);
        cityName = e.target.value;
        getWeatherData();
    }
});


function getWeatherData () {

    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${ cityName !== '' ? cityName : 'Kyiv' }&appid=${ API_KEY }&units=metric`)
    .then(res2 => res2.json())
    .then(data2 => {
        console.log(data2);

        const obj = data2.list;

        for (const item of obj){
            dataTemp.push(Math.round(item.main.temp));
            dataPress.push(item.main.pressure);
            dataHum.push(item.main.humidity);
            dataWind.push(item.wind.speed);
            dataImg.push(item.weather[0].icon);
        }

        // for (let i=0; i<8 ; i++){
        //     hoursTemperature[i] = `${dataTemp[i]}`;
        //     hoursTime[i] = `${moment(data2.list[i].dt*1000).format('HH:mm')}`;
        // }

        console.log(hoursTemperature);
        console.log(hoursTime);

        displayWeatherData(data2);
    });
};

function displayWeatherData(data){

    for (let i=0; i<8 ; i++){
        hoursTemperature[i] = `${dataTemp[i]}`;
        hoursTime[i] = `${moment(data.list[i].dt*1000).format('HH:mm')}`;
    }

    temperature.text(dataTemp[0]);

    mainImg.attr('src', `https://openweathermap.org/img/wn/${data.list[0].weather[0].icon}@4x.png`)
    mainCondition.text(data.list[0].weather[0].main.toUpperCase());
    wind.text(`${data.list[0].wind.speed} m/s`);
    pressure.text(`${data.list[0].main.pressure} hPa`);
    humidity.text(`${data.list[0].main.humidity} %`);
    
    forecast.html(`<div class="days">
                    <p class="day">NOW</p>
                    <div class="img-container">
                        <img src="https://openweathermap.org/img/wn/${data.list[0].weather[0].icon}@4x.png">
                    </div>
                    <p class="card-temp">${dataTemp[0]}</p>
                    <p class="card-condition">${data.list[0].weather[0].main}</p>
                </div>
                <div class="days">
                    <p class="day">${window.moment(data.list[8].dt*1000).format('dddd')}</p>
                    <div class="img-container">
                        <img src="https://openweathermap.org/img/wn/${data.list[8].weather[0].icon}@4x.png">
                    </div>
                    <p class="card-temp">${dataTemp[8]}</p>
                    <p class="card-condition">${data.list[8].weather[0].main}</p>
                </div>
                <div class="days">
                    <p class="day">${window.moment(data.list[16].dt*1000).format('dddd')}</p>
                    <div class="img-container">
                        <img src="https://openweathermap.org/img/wn/${data.list[14].weather[0].icon}@4x.png">  
                    </div>
                    <p class="card-temp">${dataTemp[16]}</p>
                    <p class="card-condition">${data.list[16].weather[0].main}</p>
                </div>
                <div class="days">
                    <p class="day">${window.moment(data.list[24].dt*1000).format('dddd')}</p>
                    <div class="img-container">
                        <img src="https://openweathermap.org/img/wn/${data.list[24].weather[0].icon}@4x.png">
                    </div>
                    <p class="card-temp">${dataTemp[24]}</p>
                    <p class="card-condition">${data.list[24].weather[0].main}</p>
                </div>
    `)    
}

setInterval( () => {
    const time = new Date();
    const day = time.getDay();
}, 10000);


export {hoursTemperature};
export {hoursTime};
