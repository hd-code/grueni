let hygroIntervall;

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
    plants: [
        {
            clickPot: () => potClicked(0),
            options: [],
            position: '-3 0 -2',
            showOptions: false,
        },
        {
            clickPot: () => potClicked(1),
            options: [],
            position: '3 0 -2',
            showOptions: false,
        },
    ],
    hygro: {
        click: endHygro,
        fill: 10,
        optFill: 70,
        show: false,
    },
    popup: {
        content: undefined, // insert html here, then the popup will show up, remove the content and it disappears
        exit: clearPopup, // do not alter this !!!
    }
};

function clearPopup() {
    appData.popup.content = undefined;
    appData.popup.exit = clearPopup;
}

function hidePlantOptions() {
    for (let i = 0, ie = appData.plants.length; i < ie; i++) {
        appData.plants[i].showOptions = false;
    }
}

function potClicked(potI) {
    endHygro();

    if (appData.plants[potI].showOptions) {
        appData.topbar.show = true;
        hidePlantOptions();
    } else {
        appData.topbar.show = false;
        hidePlantOptions();
        appData.plants[potI].showOptions = true;
    }
}

function endHygro() {
    clearInterval(hygroIntervall);
    appData.topbar.show = true;
    appData.hygro.show = false;
}

// -----------------------------------------------------------------------------
// Topbar
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

    setTimeout(() => drawDiagram(values, preparedData), 20);
}

appData.topbar.air.click   = () => openHistory('api/history/air', 'air');
appData.topbar.light.click = () => openHistory('api/history/light', 'light');
appData.topbar.temp.click  = () => openHistory('api/history/temperature', 'temperature');

// -----------------------------------------------------------------------------
// Plants
// -----------------------------------------------------------------------------

function notImplemented() {
    alert('Dieses Feature ist noch nicht implementiert worden.');
}

async function updateHygro(potI) {
    const response  = await fetch(`api/plants/${potI}/soil`);
    const data = await response.json();
    appData.hygro.fill = data.data;
}

function startHygro(potI, optFill) {
    hidePlantOptions();
    appData.hygro.optFill = optFill;
    appData.hygro.show = true;
    hygroIntervall = setInterval(() => updateHygro(potI), 200);
}

function openWiki(url) {
    appData.popup.content = `<iframe src="${url}"></iframe>`;
}

function getOptions(plant, potI) {
    if (!plant) {
        return [
            { click: notImplemented, text: 'Historie' },
            { click: notImplemented, text: 'Bepflanzen' },
        ];
    }

    return [
        { text: 'Historie', click: notImplemented },
        { text: 'Standortdaten', click: notImplemented },
        { text: 'Infos zur Pflanze', click: () => openWiki(plant.wikipediaURL) },
        { text: 'Giessen', click: () => startHygro(potI, plant.optSoilHumidity) },
        { text: 'Umtopfen', click: notImplemented },
    ];
}

// -----------------------------------------------------------------------------
// Init Main
// -----------------------------------------------------------------------------

async function loadData() {
    try {
        const response = await fetch('api');
        const data = await response.json();
        
        appData.topbar.air.value   = data.airHumidity;
        appData.topbar.light.value = data.light;
        appData.topbar.temp.value  = data.temperature;
    
        for (let i = 0, ie = data.plants.length; i < ie; i++) {
            const plant = data.plants[i];
            appData.plants[i].options = getOptions(plant, i);
        }
    } catch (e) {
        console.warn(e);
    }
}

loadData();
setInterval(loadData, 10000); // refresh data every 10 seconds

// -----------------------------------------------------------------------------

const root = new Vue({ el: '#root', data: appData });