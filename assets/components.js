Vue.component('ar-button', {
    data: () => ({
        charsPerLine: 20,
        height: 1,
        width: 3,
    }),
    props: ['position', 'scale', 'text'],
    template: `<a-entity :position="position" :scale="scale ? scale+' '+scale+' '+scale : ''">
        <a-entity
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