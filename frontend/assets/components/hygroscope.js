Vue.component('a-hygroscope', {
    data: function() { 
        return {
            height: 2,
            radius: 0.3,
            radiusDiff: 0.01,
        }
    },
    props: [ 'fluidLevel', 'optimumFluidLevel', 'position' ],
    methods: {
        calculateFillHeight: function() {
            const fillHeight = (this.optimumFluidLevel / 100) * (this.fluidLevel / 100);
            return Math.min(fillHeight, this.height);
        }, 
        calculateY: function() {
            return (-1 * ((this.height - this.calculateFillHeight()) / 2));
        }
    },
    template: `<a-entity :position="position">
        <a-entity
            :geometry="'primitive: cylinder; radius: ' + radius + '; height: ' + height"
            material="color: #fff; opacity: 0.1">
            <a-entity
                :geometry="'primitive: cylinder; radius: ' + (radius - radiusDiff) + '; height: ' + calculateFillHeight()"
                :material="'color: ' + (calculateFillHeight() >= 2 ? '#49b675;' : '#256d7b;')" :position="'0 ' + calculateY() + ' 0'">
            </a-entity>
        </a-entity>
    </a-entity>`
});