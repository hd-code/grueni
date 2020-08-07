Vue.component('a-button', {
    data: function() { return {
        charsPerLine: 20,
        height: 1,
        width: 3,
    }},
    props: ['click', 'position', 'scale', 'text'],
    template: `<a-entity :position="position" :scale="scale ? scale+' '+scale+' '+scale : ''">
        <a-entity
            @mouseup="click" :class="{clickable: click}"
            :scale="width+' '+height+' 1'"
            geometry="primitive: circle; radius: 0.5;"
            material="color: #6EBAA7; transparent: true; opacity: 0.8"
        ></a-entity>
        <a-text
            :value="text"
            :height="height" :width="width" :wrap-count="charsPerLine"
            color="#000" align="center" zOffset="0.2"
        ></a-text>
    </a-entity>`,
});

Vue.component('a-plant', {
    data: function() { return {
        buttonPositions: [
            '-2 3 0',
            '1.3 3.6 0', 
            '1.6 1.9 0', 
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
    props: ['options', 'position'],
    template: `<a-entity id="plant1" :position="position">
        <a-button v-for="(option, index) in optionsOnPage"
            :text="option.text" :click="option.click"
            :position="buttonPositions[index]" :scale="buttonScale"
        ></a-button>

        <a-button v-if="options.length > optionsPerPage"
            :text="moreButtonText" :scale="buttonScale"
            :click="function() {page = page >= lastPageNumber ? 0 : page + 1}"
            :position="buttonPositions[optionsPerPage]"
        ></a-button>

        <a-cone position="0 0 -1.5" height="2" radius-top="1.2" radius-bottom="1" open-ended="true"></a-cone>
    </a-entity>`,
});


/*******************************************************************************

<a-button v-for="(_, index) of optionsOnPage"
            :text="optionsOnPage" :position="buttonPositions[index]"
            :scale="buttonScale"
        ></a-button>




:position="buttonPositions[i]"



<a-button
            v-for="(option, index) in optionsOnPage"
            :text="option.a"
            :position="buttonPositions[index]" :scale="buttonScale"
        ></a-button>




function() {page++}


<a-button v-if="options.length > optionsPerPage"
            :click="" :position="buttonPositions[optionsPerPage]"
            :text="moreButtonText" :scale="buttonScale"
        ></a-button>

<a-button v-for="option in options"
            :click="option.click" :position="option.position" :text="option.text"
            scale="0.7"
        ></a-button>

<a-button v-for="(option, i) in optionsOnPage"
        :text="option"
        :position="buttonPositions[i]" :scale="buttonScale"
    ></a-button>

*******************************************************************************/