Vue.component('a-plant', {
    data: function() { return {
        boxScale: 2,
        buttonPositions: [
            '-1.7 2.7 0',
            ' 1.8 3.1 0', 
            ' 2.1 1.7 0', 
            '-0.5 3.8 0',
            '-1.2 1.4 0', // more button
        ],
        buttonScale: 0.9,
        moreButtonText: '...',
        optionsPerPage: 4,
        page: 0,
    }},
    computed: {
        boxScaleInput: function() {
            return this.boxScale + ' ' + this.boxScale * 1.5 + ' ' + this.boxScale;
        },
        lastPageNumber: function() {
            return Math.ceil(this.options.length / this.optionsPerPage) - 1;
        },
        optionsOnPage: function() {
            const start = this.page * this.optionsPerPage;
            const end   = Math.min(start + this.optionsPerPage, this.options.length);
            return this.options.slice(start, end);
        }
    },
    methods: {
        nextPage: function() {
            this.page++;
            if (this.page > this.lastPageNumber)
                this.page = 0;
        }
    },
    props: [ 'clickPot', 'options', 'position', 'showOptions' ],
    template: `<a-entity :position="position">
        <a-entity v-if="showOptions">
            <a-button v-for="(option, index) in optionsOnPage"
                :text="option.text" :click="option.click" :state="option.state"
                :position="buttonPositions[index]" :scale="buttonScale"
            ></a-button>

            <a-button v-if="options.length > optionsPerPage"
                :text="moreButtonText" :scale="buttonScale"
                :click="nextPage"
                :position="buttonPositions[optionsPerPage]"
            ></a-button>
        </a-entity>

        <a-box @mouseup="clickPot" class="clickable"
            position="0 0 -1.5" :scale="boxScaleInput" wireframe="true"
        ></a-box>
    </a-entity>`,
});