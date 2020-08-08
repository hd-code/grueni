Vue.component('a-button', {
    data: function() { return {
        charsPerLine: 20,
        height: 1,
        width: 3,
        colors: {
            ok: '#6EBAA7',
            warning: '#CC3300'
        }
    }},
    computed: {
        scaleInput: function() {
            return this.scale + ' ' + this.scale + ' ' + this.scale;
        },
        getColor: function() {
            console.log(this.state);
            if(this.state == 'ok')
            {
                return this.colors.ok;
            }
            else if(this.state == 'warning')
            {
                return this.colors.warning;
            }
            else
            {
                return this.colors.ok;
            }
        }
    },
    props: [ 'click', 'position', 'scale', 'text', 'state' ],
    template: `<a-entity :position="position" :scale="scale ? scaleInput : ''">
        <a-entity
            @mouseup="click" :class="{clickable: click}"
            :scale="width+' '+height+' 1'"
            geometry="primitive: circle; radius: 0.5;"
            :material="'color: ' + getColor + '; transparent: true; opacity: 0.8'">
        </a-entity>
        <a-text
            :value="text"
            :height="height" :width="width" :wrap-count="charsPerLine"
            color="#000" align="center" zOffset="0.2"
        ></a-text>
    </a-entity>`,
});