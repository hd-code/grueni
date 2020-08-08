Vue.component('popup', {
    methods: {
        exitClicked: function() {
            if (!this.exit) {
                this.content = undefined;
            } else {
                this.exit();
            }
        },
    },
    props: [ 'content', 'exit' ],
    template: `<div v-show="!!content" class="popup">
        <p><a @click="exitClicked">x</a></p>
        <div v-html="content"></div>
    </div>`,
});