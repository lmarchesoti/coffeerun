(function (window) {
    'use strict';
    var App = window.App || {};
    var $ = window.jQuery;

    function PowerUpHandler(selector) {
        if (!selector) {
            throw new Error('No selector provided');
        }

        this.$powerUpContainer = $(selector);
        if (this.$powerUpContainer.length === 0) {
            throw new Error('Could not find element with selector: ' + selector);
        }
    }

    PowerUpHandler.prototype.show = function () {
        this.$powerUpContainer[0].classList.remove('hidden');
    };

    PowerUpHandler.prototype.hide = function () {
        this.$powerUpContainer[0].classList.add('hidden');
    };

    App.PowerUpHandler = PowerUpHandler;
    window.App = App;
})(window);