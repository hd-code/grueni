Vue.component('a-dialog', {
    data: function() { return {
        backgroundColor: '#fff',
        charsPerLine: 50,
        textColor: '#000',
        buttonColor: '#6EBAA7',
        buttonText: 'OK!',
        scale: '0.5 1 2',
        numOfLines: 1,
        height: 1,
        width: 4,
        squareSize: 0.2
    }},
    computed: {
        calcHeight: function() {
            this.numOfLines = Math.max(Math.floor(this.text?.length / this.charsPerLine), 1); 
            this.squareSize = this.numOfLines >= 3 ? 0.35 : 0.2;
            const factor = this.numOfLines < 5 ? 0.35 : 0.25;
            let height = this.numOfLines * factor;
            height += typeof this.callback !== 'undefined' ?  0.3 : 0;

            return height;
        },
        calcWidth: function() { 
            return this.width;
        },
        boxPosition: function() {
            return ((0.25 * this.width) + ' ' + (-0.35 * this.calcHeight) + ' ' + 0);
        }
    },
    props: [ 'ok', 'position', 'text' ],
    template: `<a-entity :position="position">
        <a-entity
            :scale="calcWidth + ' ' + calcHeight + ' 1'"
            geometry="primitive: circle; radius: 0.5;" :material="'color: ' + backgroundColor"
        ></a-entity>
        <a-text
            :value="text"
            :color="textColor" :wrap-count="charsPerLine"
            align="center" :height="height - 0.25" :width="width - 0.75"
        ></a-text>
        <a-entity
            :geometry="'primitive: plane; width: ' + squareSize + '; height: ' + squareSize" 
            :material="'color: ' + backgroundColor"
            rotation="0 0 60"
            :position="boxPosition"
        ></a-entity>
        <a-entity v-if="!!ok">
            <a-entity
                scale="0.8 0.25 1"
                position="0 -0.3 0"
                @mouseup="ok"
                geometry="primitive: circle; radius: 0.5;" :material="'color: ' + backgroundColor"
                :material="'color: ' + buttonColor"
                zOffset="0.1"
            ></a-entity>
            <a-text
                :value="buttonText" :color="textColor" :wrap-count="charsPerLine"
                :height="height - 0.25" :width="width - 0.75"
                align="center" position="0 -0.3 0"
            ></a-text>
        </a-entity>
    </a-entity>`,
});