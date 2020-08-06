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
            { click: testFunc, position: '-2 3 0', text: 'Option 1' },
            { click: testFunc, position: '1.3 3.6 0', text: 'Option 2' },
            { click: testFunc, position: '1.6 1.9 0', text: 'Option 3' },
            { click: testFunc, position: '-0.6 4.1 0', text: 'Option 4' },
            { click: testFunc, position: '-1.5 1.5 0', text: 'Option 5' },
        ],
    },
});