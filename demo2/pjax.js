(function (Barba, $) {
    document.addEventListener("DOMContentLoaded", function (event) {
        console.log('pjax start');
        // Barba init
        Barba.Pjax.start();

        // Barba prefetch init
        Barba.Prefetch.init();

        var FadeTransition = Barba.BaseTransition.extend({
            start: function () {
                /**
                 * This function is automatically called as soon the Transition starts
                 * this.newContainerLoading is a Promise for the loading of the new container
                 * (Barba.js also comes with an handy Promise polyfill!)
                 */

                // As soon the loading is finished and the old page is faded out, let's fade the new page
                Promise
                    .all([this.newContainerLoading, this.fadeOut()])
                    .then(this.fadeIn.bind(this));
            },

            fadeOut: function () {
                /**
                 * this.oldContainer is the HTMLElement of the old Container
                 */
                return $(this.oldContainer).css({
                    position: 'absolute',
                    top: '0',
                    left: '0'
                }).promise();
            },

            fadeIn: function () {
                /**
                 * this.newContainer is the HTMLElement of the new Container
                 * At this stage newContainer is on the DOM (inside our #barba-container and with visibility: hidden)
                 * Please note, newContainer is available just after newContainerLoading is resolved!
                 */
                var _this = this;
                var $el = $(this.newContainer);

                $el.css({
                    visibility: 'visible',
                    opacity: 0
                }).addClass('fadein');

                $el.animate({opacity: 1}, 600, function () {
                    /**
                     * Do not forget to call .done() as soon your transition is finished!
                     * .done() will automatically remove from the DOM the old Container
                     */
                    _this.done();
                });
            }
        });

        /**
         * Next step, you have to tell Barba to use the new Transition
         */

        Barba.Pjax.getTransition = function () {
            /**
             * Here you can use your own logic!
             * For example you can use different Transition based on the current page or link...
             */
            return FadeTransition;
        };
    });

}(Barba, jQuery));
