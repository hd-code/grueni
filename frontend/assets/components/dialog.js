Vue.component('a-dialog', {
    data: function() { return {
        backgroundColor: '#fff',
        charsPerLine: 40,
        textColor: '#000',
        width: 5,
    }},
    props: [ 'position', 'text' ],
    template: `<a-entity :position="position">
        <a-text
            :value="text"
            :color="textColor" :width="width" :wrap-count="charsPerLine"
            :material="'color: ' + backgroundColor"
            align="center"
            geometry="primitive: plane; height: auto; width: auto"
        ></a-text>
    </a-entity>`,
});