Vue.component('popup', {
    data: function() { return {
        show: true,
    }},
    methods: {
        toggle: function() {
            this.show = !this.show;
        },
    },
    props: ['content'],
    template: `<div v-show="show" class="popup">
        <p><a @click="toggle">x</a></p>
        <div v-html="content"></div>
    </div>`,
});