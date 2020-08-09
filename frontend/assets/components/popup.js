Vue.component('popup', {
    props: [ 'content', 'exit' ],
    template: `<div v-show="!!content" class="popup">
        <p><a @click="exit">x</a></p>
        <div v-html="content"></div>
    </div>`,
});