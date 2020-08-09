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
    if (appData.plants[potI].showOptions) {
        appData.topbar.show = true;
        hidePlantOptions();
    } else {
        appData.topbar.show = false;
        hidePlantOptions();
        appData.plants[potI].showOptions = true;
    }
}

// -----------------------------------------------------------------------------
// Topbar
// -----------------------------------------------------------------------------

async function openHistory(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        appData.popup.content = data;
    } catch (e) {
        console.warn(e);
        appData.popup.content = '<h2>Ups, da ist etwas schief gegangen.</h2>';
    }
}

appData.topbar.air.click   = () => openHistory('api/history/air');
appData.topbar.light.click = () => openHistory('api/history/light');
appData.topbar.temp.click  = () => openHistory('api/history/temperature');

// -----------------------------------------------------------------------------
// Plants
// -----------------------------------------------------------------------------

function notImplemented() {
    alert('Dieses Feature ist noch nicht implementiert worden.');
}

function openWiki(url) {
    appData.popup.content = `<iframe src="${url}"></iframe>`;
}

function getOptions(plant) {
    if (!plant) {
        return [
            { click: notImplemented, text: 'Historie', state: '' },
            { click: notImplemented, text: 'Bepflanzen', state: '' },
        ];
    }

    return [
        { text: 'Historie', click: notImplemented },
        { text: 'Standortdaten', click: notImplemented },
        { text: 'Infos zur Pflanze', click: () => openWiki(plant.wikipediaURL) },
        { text: 'Giessen', click: notImplemented },
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
            appData.plants[i].options = getOptions(plant);
        }
    } catch (e) {
        console.warn(e);
    }
}

loadData();
setInterval(loadData, 10000); // refresh data every 10 seconds

// -----------------------------------------------------------------------------

const root = new Vue({ el: '#root', data: appData });
