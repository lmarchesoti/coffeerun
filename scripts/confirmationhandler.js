(function (window) {
    'use strict';
    var App = window.App || {};
    var $ = window.jQuery;

    function ConfirmationHandler(selector, condition, action) {
        if (!selector) {
            throw new Error('No selector provided');
        }

        this.$confirmationModal = $(selector);
        if (this.$confirmationModal.length === 0) {
            throw new Error('Could not find element with selector: ' + selector);
        }

        this.$condition = condition;
        this.$action = action;
    }

    ConfirmationHandler.prototype.confirm = function (order) {
        if (this.$condition(order)) {
            console.log('Adding event listener for confirmation.');
            this.$confirmationModal.on('click', function (event) {
                event.preventDefault();
                this.$action(order);
            }.bind(this));

            console.log('Showing confirmation modal.');
            this.$confirmationModal.modal('show');
        } else {
            console.log('User does not qualify.')
        }
    };

    App.ConfirmationHandler = ConfirmationHandler;
    window.App = App;
})(window);