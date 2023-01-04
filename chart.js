
import { message, item1 } from "./script.js";

const ctx = document.getElementById('myChart');

new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['3:00','6:00' ,'9:00' ,'12:00' ,'15:00' ,'18:00', '21:00' ,'00:00' ],
        datasets: [{
            label: 'Hourly temperature',
            data: ['0', '2', '5', '9', '10', '8' ,'5' ,'2'],
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

console.log('hello');
console.log(message);
console.log(item1);