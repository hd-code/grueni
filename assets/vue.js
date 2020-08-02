function alertMeMaster() {
    alert('Yes Master, I will serve you.');
}

const pot1 = new Vue({
    el: '#pot1',
    data: {
        text: 'Luftfeuchtigkeit: 20%',
        text2: 'value: {{text}}; align: center; width: 6;',
        click: alertMeMaster.name,
    },
});