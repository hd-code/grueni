/*! arclick component for aframe © Hannes Dröse */

/**
 * The "arclick" component adds the ability to click on an AFrame entity. The
 * click will call a function that has to be provided with the component. The
 * syntax looks somewhat similar to the standard `onclick` html attribute.
 * 
 * _Important_: There is no standard click event by default for aframe elements.
 * You need to add an aframe element to the scene, that emits click events. The
 * easiest to use is the `cursor` component. Just add one to the scene and it
 * will work.
 * 
 * ```html
 * <a-entity arclick="yourCustomFunction"></a-entity>
 * 
 * <script>
 *   function yourCustomFunction() {
 *     alert("Do some fancy stuff here, when the entity is clicked!")
 *   }
 * </script>
 * 
 * <!-- the cursor component provides click events for aframe elements -->
 * <a-entity cursor="rayOrigin: mouse"></a-entity>
 * ```
 */
(function() {

AFRAME.registerComponent('arclick', {
    schema: { type: 'string' },
    init: function() {
        const func = getFunctionByName(this.data);
        this.el.addEventListener('click', func);
    },
});

function getFunctionByName(name){
    try {
        if (name === '')
            throw new Error('No function was passed');

        const func = eval(name);

        if (typeof func !== 'function')
            throw new Error(name + ' is not a function');

        return func;
    } catch (e) {
        console.warn(e);
        return function() {
            alert(e.message);
        };
    }
}

})();