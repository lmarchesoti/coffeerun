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
        this.$change_fn = fn;
    };

    SliderHandler.prototype.getDefault = function () {
        return $(this.$sliderElement).attr('strength-level-default');
    };

    SliderHandler.prototype.reset = function () {
        this.$change_fn(this.getDefault());
        this.$sliderElement[0].value = this.getDefault();
    };

    App.SliderHandler = SliderHandler;
    window.App = App;
})(window);