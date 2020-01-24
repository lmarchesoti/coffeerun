(function (window) {
    'use strict';
    var App = window.App || {};
    var $ = window.jQuery;

    function EmailHandler(selector) {
        if (!selector) {
            throw new Error('No selector provided');
        }

        this.$emailInput = $(selector);
        if (this.$emailInput.length === 0) {
            throw new Error('Could not find element with selector: ' + selector);
        }
    }

    EmailHandler.prototype.addChangeHandler = function (fn_validate, fn_success, fn_failure) {
        console.log('Setting change handler for email field');
        this.$emailInput.on('change', function (event) {
            event.preventDefault();

            console.log(this.value);
            if (fn_validate(this.value)) {
                console.log('Power up!');
                fn_success();
            } else {
                fn_failure();
            }
        });
    };

    App.EmailHandler = EmailHandler;
    window.App = App;
})(window);