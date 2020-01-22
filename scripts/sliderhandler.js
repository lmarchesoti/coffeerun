(function (window) {
    'use strict';
    var App = window.App || {};
    var $ = window.jQuery;

    function SliderHandler(selector) {
        if (!selector) {
            throw new Error('No selector provided');
        }

        this.$sliderElement = $(selector);
        if (this.$sliderElement.length === 0) {
            throw new Error('Could not find element with selector: ' + selector);
        }
    }

    SliderHandler.prototype.addChangeHandler = function (fn) {
        console.log('Setting change handler for slider');
        this.$sliderElement.on('change', function (event) {
            event.preventDefault();
            fn(this.$sliderElement[0].valueAsNumber);
        }.bind(this));
        console.log('Presetting values');
        fn(this.$sliderElement[0].valueAsNumber);
    };

    App.SliderHandler = SliderHandler;
    window.App = App;
})(window);