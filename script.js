// import { updateChartData } from "./chart.js";


const API_KEY = '6e01dacfa1ae7c17d7d7ca01644c735a';

const temperature = $('.temp');
const mainImg = $('.today__img').children('img');;
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
let dataTime = [];
let dataPress = [];
let dataHum = [];
let dataWind = [];
let dataImg = [];
let dataCond = [];
let dataDay = [];

getWeatherData();
// updateChartData();

units.click((e) => {
    console.log(e.target.checked);
    if(e.target.checked) {
        dataTemp.map( (item, index) => {
            dataTemp[index] = Math.round(item* 1.8 + 32);
        });
    } else{
        dataTemp.map( (item, index) => {
            dataTemp[index] = Math.round((item - 32)/1.8);
        });
    }
    // console.log(dataTemp);
    displayWeatherData();
});

cityInput.on('keypress', (e) => {
    console.log(cityName);
    units.checked = false;
    console.log(units.checked);

    if(e.key === 'Enter'){
        
        console.log(e.target.value);
        cityName = e.target.value;
        cleartData();
        getWeatherData();
    }
    console.log(cityName);
});

function cleartData(){
    dataTemp = [];
    dataTime = [];
    dataPress = [];
    dataHum = [];
    dataWind = [];
    dataImg = [];
    dataCond = [];
    dataDay = [];
}

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
            dataCond.push(item.weather[0].main.toUpperCase());
            dataDay.push(window.moment(item.dt*1000).format('dddd'));
            dataTime.push(item.dt);
        }

        // for (let i=0; i<8 ; i++){
        //     hoursTemperature[i] = `${dataTemp[i]}`;
        //     hoursTime[i] = `${moment(data2.list[i].dt*1000).format('HH:mm')}`;
        // }

        console.log(hoursTemperature);
        console.log(hoursTime);

        displayWeatherData();
    });
};

function displayWeatherData(){

    for (let i=0; i<8 ; i++){
        hoursTemperature[i] = `${dataTemp[i]}`;
        hoursTime[i] = `${moment(dataTime[i]*1000).format('HH:mm')}`;
    }

    temperature.text(dataTemp[0]);

    mainImg.attr('src', `https://openweathermap.org/img/wn/${dataImg[0]}@4x.png`)
    mainCondition.text(dataCond[0]);
    wind.text(`${dataWind[0]} m/s`);
    pressure.text(`${dataPress[0]} hPa`);
    humidity.text(`${dataHum[0]} %`);
    
    forecast.html(`<div class="days">
                    <p class="day">NOW</p>
                    <div class="img-container">
                        <img src="https://openweathermap.org/img/wn/${dataImg[0]}@4x.png">
                    </div>
                    <p class="card-temp">${dataTemp[0]}</p>
                    <p class="card-condition">${dataCond[0]}</p>
                </div>
                <div class="days">
                    <p class="day">${dataDay[8]}</p>
                    <div class="img-container">
                        <img src="https://openweathermap.org/img/wn/${dataImg[8]}@4x.png">
                    </div>
                    <p class="card-temp">${dataTemp[8]}</p>
                    <p class="card-condition">${dataCond[8]}</p>
                </div>
                <div class="days">
                    <p class="day">${dataDay[16]}</p>
                    <div class="img-container">
                        <img src="https://openweathermap.org/img/wn/${dataImg[16]}@4x.png">  
                    </div>
                    <p class="card-temp">${dataTemp[16]}</p>
                    <p class="card-condition">${dataCond[16]}</p>
                </div>
                <div class="days">
                    <p class="day">${dataDay[24]}</p>
                    <div class="img-container">
                        <img src="https://openweathermap.org/img/wn/${dataImg[24]}@4x.png">
                    </div>
                    <p class="card-temp">${dataTemp[24]}</p>
                    <p class="card-condition">${dataCond[24]}</p>
                </div>
    `)    
}

setInterval( () => {
    const time = new Date();
    const day = time.getDay();
}, 10000);


export {hoursTemperature};
export {hoursTime};
