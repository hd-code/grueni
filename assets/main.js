AFRAME.registerComponent('test', {
    init: function() {
        const el = this.el;
        el.addEventListener('click', function() {
            alert('box clicked');
        });
    }
});