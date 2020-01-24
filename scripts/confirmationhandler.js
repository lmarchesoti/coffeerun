(function (window) {
    'use strict';
    var App = window.App || {};
    var $ = window.jQuery;

    function ConfirmationHandler(selector) {
        if (!selector) {
            throw new Error('No selector provided');
        }

        this.$emailInput = $(selector);
        if (this.$emailInput.length === 0) {
            throw new Error('Could not find element with selector: ' + selector);
        }
    }

    ConfirmationHandler.prototype.confirm = function () {
        return true;
    };

    App.ConfirmationHandler = ConfirmationHandler;
    window.App = App;
})(window);