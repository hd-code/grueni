Vue.component('a-dialog', {
    data: function() { return {
        backgroundColor: '#fff',
        charsPerLine: 80,
        textColor: '#000',
        scale: '0.5 1 2',
        numOfLines: 1,
        height: 1,
        width: 6,
    }},
    computed: {
        calcHeight: function() {
            this.numOfLines = Math.max(Math.floor(this.text.length / this.charsPerLine), 1); 
            const factor = this.numOfLines < 5 ? 0.4 : 0.25;
            return this.numOfLines * factor;
        },
        calcWidth: function() { 
            return this.width;
        },
        boxPosition: function() {
            console.log(this.calcHeight);
            return ((0.25 * this.width) + ' ' + (-0.35 * this.calcHeight) + ' ' + 0);
        }
    }, 
    props: [ 'position', 'text' ],
    template: `<a-entity :position="position">
                    <a-entity
                        :scale="calcWidth + ' ' + calcHeight + ' 1'"
                        geometry="primitive: circle; radius: 0.5;" :material="'color: ' + backgroundColor">
                    </a-entity>
                    <a-text
                        :value="text"
                        xOffset="1.5"
                        :color="textColor" :wrap-count="charsPerLine"
                        align="center" :height="height" :width="width - 0.75">
                    </a-text>
                    <a-entity
                        geometry="primitive: plane; 
                        width: 0.5; height: 0.5;" 
                        :material="'color: ' + backgroundColor"
                        rotation="0 0 60"
                        :position="boxPosition">
                    </a-entity>
                </a-entity>`,
});