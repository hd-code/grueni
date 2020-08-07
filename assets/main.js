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
            { click: testFunc, text: 'Option 1' },
            { click: testFunc, text: 'Option 2' },
            { click: testFunc, text: 'Option 3' },
            { click: testFunc, text: 'Option 4' },
            { click: testFunc, text: 'Option 5' },
            { click: testFunc, text: 'Option 6' },
            { click: testFunc, text: 'Option 7' },
        ],
    },
});