function testFunc() {
    alert('Geht es jetzt?');
}

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
            click: function() {
                this.showOptions = !this.showOptions;
                console.log(this.showOptions);
            },
            options: [
                { click: testFunc, text: 'Option 1', state: '' },
                { click: testFunc, text: 'Option 2', state: '' },
                { click: testFunc, text: 'Option 3', state: '' },
                { click: testFunc, text: 'Option 4', state: '' },
                { click: testFunc, text: 'Option 5', state: '' },
            ],
            position: '-3 0 -2',
            showOptions: false,
        },
    ],
    popup: {
        content: undefined, // insert html here, then the popup will show up, remove the content and it disappears
        exit:    undefined, // pass a custom function here that is called, when the user clicks the exit popup
    }
};

// -----------------------------------------------------------------------------

async function openHistory(url) {
    const response = await fetch(url);
    const data = await response.json();
    appData.popup.content = data;
}

appData.topbar.air.click   = () => openHistory('api/history/air');
appData.topbar.light.click = () => openHistory('api/history/light');
appData.topbar.temp.click  = () => openHistory('api/history/temperature');

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
