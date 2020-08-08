Vue.component('a-plant', {
    data: function() { return {
        buttonPositions: [
            '-2.0 3.0 0',
            ' 1.3 3.6 0', 
            ' 1.6 1.9 0', 
            '-0.6 4.1 0',
            '-1.5 1.5 0', // more button
        ],
        buttonScale: 0.7,
        moreButtonText: '...',
        optionsPerPage: 4,
        page: 0,
    }},
    computed: {
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
    props: [ 'options', 'position' ],
    template: `<a-entity :position="position">
        <a-button v-for="(option, index) in optionsOnPage"
            :text="option.text" :click="option.click"
            :state="option.state"
            :position="buttonPositions[index]" :scale="buttonScale"
        ></a-button>

        <a-button v-if="options.length > optionsPerPage"
            :text="moreButtonText" :scale="buttonScale"
            :click="nextPage"
            :position="buttonPositions[optionsPerPage]"
        ></a-button>

        <a-cone position="0 0 -1.5" height="2" radius-top="1.2" radius-bottom="1" open-ended="true"></a-cone>
    </a-entity>`,
});