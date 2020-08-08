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
        exit:    undefined, // pass a custom function here that is called, when the user clicks the exit popup
    }
};

// -----------------------------------------------------------------------------

async function openHistory(url) {
    const response = await fetch(url);
    const data = await response.json();
    appData.popup = data;
}

appData.general.air.click   = () => openHistory('api/history/air');
appData.general.light.click = () => openHistory('api/history/light');
appData.general.temp.click  = () => openHistory('api/history/temperature');

// -----------------------------------------------------------------------------

async function loadData() {
    const response = await fetch('api');
    const data = await response.json();
    
    appData.general.air.value   = data.airHumidity;
    appData.general.light.value = data.brightness;
    appData.general.temp.value  = data.temperature;
}

loadData();
setInterval(loadData, 10000); // refresh data every 10 seconds

// -----------------------------------------------------------------------------

const root = new Vue({ el: '#root', data: appData });