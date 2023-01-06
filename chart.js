
import {hoursTemperature, hoursTime} from "./script.js";

const ctx = document.getElementById('myChart');

let tempChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: hoursTime,
        datasets: [{
            label: 'Hourly temperature',
            // data: hoursTemperature.length > 0 ? hoursTemperature : ['6','2' ,'3' ,'5' ,'11' ,'5', '2' ,'1'],
            data: hoursTemperature,
            // data: items,
            borderWidth: 1
        }]
    },
    options: {
        maintainAspectRatio: false,
        plugins: {
            legend:{
                display: false,
            }
        },
        elements: {
            tension: 3,
            borderWidth: 3,
        }
    },
});

console.log(hoursTemperature);

function getData(){tempChart.update()};

setInterval( getData, 1000);