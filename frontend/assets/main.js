function testFunc() {
    alert('Please do not hit me too hard!');
}

const root = new Vue({
    el: '#root',
    data: {
        brightness: 0,
        temperature: 0,
        airHumidity: 0,
        options: [
            { click: testFunc, text: 'Giessen', state: 'warning' },
            { click: testFunc, text: 'Details zur Pflanze', state: 'ok' },
            { click: testFunc, text: 'Option 3', state: 'warning' },
            { click: testFunc, text: 'Option 4', state: 'ok' },
            { click: testFunc, text: 'Option 5', state: 'warning' },
            // { click: testFunc, text: 'Option 6' },
            // { click: testFunc, text: 'Option 7' },
        ],
        showPopup: true,
        popupContent: `
        <iframe src="https://de.wikipedia.org/wiki/Tomate" referrerpolicy="same-origin"></iframe>
`,
    },
});