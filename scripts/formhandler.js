(function (window) {
    'use strict';
    var App = window.App || {};
    var $ = window.jQuery;

    function FormHandler(selector) {
        if (!selector) {
            throw new Error('No selector provided');
        }

        this.$formElement = $(selector);
        if (this.$formElement.length === 0) {
            throw new Error('Could not find element with selector: ' + selector);
        }
    }

    FormHandler.prototype.addSubmitHandler = function (fn) {
        console.log('Setting submit handler for form');
        this.$formElement.on('submit', function (event) {
            event.preventDefault();

            var data = {};
            $(this).serializeArray().forEach(function (item) {
                data[item.name] = item.value;
                console.log(item.name + ' is ' + item.value);
            });
            console.log(data);
            fn(data);
            this.reset();
            this.elements[0].focus();
        });
    };

    FormHandler.prototype.addInputHandler = function (fn) {
        console.log('Setting input handler for form');
        this.$formElement.on('input', '[name="emailAddress"]', function (event) {
            var emailAddress = event.target.value;
            var message = '';
            if (fn(emailAddress)) {
                $(event.target).setCustomValidity('');
            } else {
                message = emailAddress + ' is not an authorized email address!';
                $(event.target).setCustomValidity(message);
            }
        });
    };

    FormHandler.prototype.addOrderHandler = function (fn) {
        console.log('Setting order handler for form');
        this.$formElement.on('input', '[name="strength"]', function (event) {
            var $coffeeInput = this.$formElement.find('[name="coffee"]')[0];
            var $strengthInput = event.target;
            handleOrder($coffeeInput, $strengthInput, fn);
        }.bind(this));

        this.$formElement.on('input', '[name="coffee"]', function (event) {
            var $coffeeInput = event.target;
            var $strengthInput = this.$formElement.find('[name="strength"]')[0];
            handleOrder($coffeeInput, $strengthInput, fn);
        }.bind(this));
    };

    function handleOrder($coffeeInput, $strengthInput, fn) {
        var message = '';
        if (fn($coffeeInput.value, $strengthInput.value)) {
            $($strengthInput).setCustomValidity('');
        } else {
            message = $strengthInput.value + ' is too strong for decaf!';
            $($strengthInput).setCustomValidity(message);
        }
    }

    App.FormHandler = FormHandler;
    window.App = App;
})(window);