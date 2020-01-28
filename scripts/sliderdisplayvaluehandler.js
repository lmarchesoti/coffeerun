(function (window) {
    'use strict';
    var App = window.App || {};
    var $ = window.jQuery;

    function SliderDisplayValueHandler(selector) {
        if (!selector) {
            throw new Error('No selector provided');
        }

        this.$displayValueElement = $(selector);
        if (this.$displayValueElement.length === 0) {
            throw new Error('Could not find element with selector: ' + selector);
        }
    }

    SliderDisplayValueHandler.prototype.set = function (value) {
        console.log('Caffeine rating changed from ' + this.$displayValueElement[0].innerText + ' to ' + value);
        this.$displayValueElement[0].innerText = value;
        this.$displayValueElement[0].classList.remove("text-success");
        this.$displayValueElement[0].classList.remove("text-warning");
        this.$displayValueElement[0].classList.remove("text-danger");
        var colorRating = Math.floor((value - 1) / 33);
        switch (colorRating) {
            case -1:
                this.$displayValueElement[0].classList.add("text-success");
                break;
            case 0:
                this.$displayValueElement[0].classList.add("text-success");
                break;
            case 1:
                this.$displayValueElement[0].classList.add("text-warning");
                break;
            case 2:
                this.$displayValueElement[0].classList.add("text-danger");
                break;
            case 3:
                this.$displayValueElement[0].classList.add("text-danger");
                break;
        }
    };

    App.SliderDisplayValueHandler = SliderDisplayValueHandler;
    window.App = App;
})(window);
