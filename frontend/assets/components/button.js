Vue.component('a-button', {
    data: function() { return {
        charsPerLine: 20,
        height: 1,
        width: 3,
        colors: {
            normal: '#6EBAA7',
            warning: '#CC3300'
        }
    }},
    computed: {
        scaleInput: function() {
            return this.scale + ' ' + this.scale + ' ' + this.scale;
        },
        getColor: function() {
            return this.state === 'warning' ? this.colors.warning : this.colors.normal;
        }
    },
    props: [ 'click', 'position', 'scale', 'text', 'state' ],
    template: `<a-entity :position="position" :scale="scale ? scaleInput : ''">
        <a-entity
            @mouseup="click" :class="{clickable: click}"
            :scale="width+' '+height+' 1'"
            geometry="primitive: circle; radius: 0.5;"
            :material="'color: ' + getColor"
        ></a-entity>
        <a-text
            :value="text" position="0 0 0.1"
            :height="height" :width="width" :wrap-count="charsPerLine"
            color="#000" align="center" zOffset="1"
        ></a-text>
    </a-entity>`,
});