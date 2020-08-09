const appData = {
    dialog: {
        content: undefined, // insert text here to be shown in the dialog box
    },
    topbar: {
        show: true,
        air:   { click: null, value: 0 },
        light: { click: null, value: 0 },
        temp:  { click: null, value: 0 },
    },
    popup: {
        content: undefined, // insert html here, then the popup will show up, remove the content and it disappears
        exit:    clearPopup, // pass a custom function here that is called, when the user clicks the exit popup
    }
};

function clearPopup() {
    appData.popup.content = undefined;
    appData.popup.exit = clearPopup;
}

// -----------------------------------------------------------------------------

function drawDiagram(dataset, preparedData) {
    var ctx = document.getElementById('chart-canvas');

    ctx.setAttribute('height', 400);
    ctx.setAttribute('width', 400);

    var chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag', 'Sonntag'],
            datasets: [{
                label: preparedData.lineDesc,
                fill: true,
                borderColor: "#3e95cd",
                backgroundColor: "#3e95cd",
                data: dataset
            }]
        },
        options: {
            title: {
                display: true,
                text: preparedData.headline
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });

    return ctx;
}

async function openHistory(url, handleCase) {
    const response = await fetch(url);
    const data = await response.json();

    const values = data.map(({ value }) => value);

    var canvas = document.createElement('canvas'); 
    canvas.setAttribute('id', 'chart-canvas');
    
    appData.popup.content = canvas.outerHTML;
    
    // prepare data
    let preparedData = {
        headline: null,
        lineDesc: null
    }

    switch(handleCase)
    {
        case 'light':
            preparedData.headline = 'Licht im Verlauf der letzten 7 Tage';
            preparedData.lineDesc = 'Helligkeit in lx';
        break;

        case 'air':
            preparedData.headline = 'Luftfeuchtigkeit im Verlauf der letzten 7 Tage';
            preparedData.lineDesc = 'Luftfeuchtigkeit in %';
        break;

        default:
            preparedData.headline = 'Temperatur im Verlauf der letzten 7 Tage';
            preparedData.lineDesc = 'Temperatur in °C';
        break;
    }

    setTimeout(() => {
        drawDiagram(values, preparedData)
    }, 20);
}

appData.topbar.air.click   = () => openHistory('api/history/air', 'air');
appData.topbar.light.click = () => openHistory('api/history/light', 'light');
appData.topbar.temp.click  = () => openHistory('api/history/temperature', 'temperature');

// -----------------------------------------------------------------------------

async function loadData() {
    const response = await fetch('api');
    const data = await response.json();
    
    appData.topbar.air.value   = data.airHumidity;
    appData.topbar.light.value = data.brightness;
    appData.topbar.temp.value  = data.temperature;
}

loadData();
setInterval(loadData, 10000); // refresh data every 10 seconds

// -----------------------------------------------------------------------------

const root = new Vue({ el: '#root', data: appData });
