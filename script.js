console.log('hello');

const API_KEY = '6e01dacfa1ae7c17d7d7ca01644c735a';


(function getWeatherData () {
    console.log('hi');

    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid=${API_KEY}`)
    .then(res => res.json())
    .then(data => {
        console.log(data);
    });

    fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=44.34&lon=10.99&appid=${API_KEY}`)
    .then(res2 => res2.json())
    .then(data2 => {
        console.log(data2);
    });
})();
