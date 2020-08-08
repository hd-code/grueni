Vue.component('a-hygroscope', {
    data: function() { 
        return {
            color: '#256d7b',
            colorOpt: '#49b675',
            height: 2,
            radius: 0.3,
            radiusDiff: 0.01,
        }
    },
    props: [ 'fluidLevel', 'optimumFluidLevel', 'position' ],
    computed: {
        fillHeight: function() {
            const fillLevel = this.fluidLevel / this.optimumFluidLevel;
            const result = fillLevel * this.height;
            return Math.min(result, this.height);
        }, 
        yPosition: function() {
            return (-1 * ((this.height - this.fillHeight) / 2));
        }
    },
    template: `<a-entity
        :position="position"
        :geometry="'primitive: cylinder; radius: ' + radius + '; height: ' + height"
        material="color: #fff; opacity: 0.1"
    >
        <a-entity
            :geometry="'primitive: cylinder; radius: ' + (radius - radiusDiff) + '; height: ' + fillHeight"
            :material="'color: ' + (fluidLevel < optimumFluidLevel ? color : colorOpt)"
            :position="'0 ' + yPosition + ' 0'"
        ></a-entity>
    </a-entity>`
});