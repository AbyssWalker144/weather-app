
import {hoursTemperature, hoursTime} from "./script.js";

const ctx = document.getElementById('myChart');


let tempChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: hoursTime,
        datasets: [{
            label: 'Temperature',
            // data: hoursTemperature.length > 0 ? hoursTemperature : ['6','2' ,'3' ,'5' ,'11' ,'5', '2' ,'1'],
            data: hoursTemperature,
            pointRadius: 7,
            pointHoverRadius: 10,
            borderWidth: 3,
        }]
    },
    options: {                
        maintainAspectRatio: false,
        plugins: {
            legend:{
                display: false,
            }
        },
        scales: {
            y: {
                
            }
        }

    },
});

console.log(hoursTemperature);

function getData(){tempChart.update()};

setInterval( getData, 1000);