(function (window) {
    'use strict';

    var App = window.App || {};
    var $ = window.jQuery;

    function Checklist(selector) {
        if (!selector) {
            throw new Error('No selector provided');
        }

        this.$element = $(selector);
        if (this.$element.length === 0) {
            throw new Error('Could not find element with selector: ' + selector);
        }
    }

    Checklist.prototype.addClickHandler = function (fn) {
        this.$element.on('click', 'input', function (event) {
            var email = event.target.value;
            this.removeRow(email);
            fn(email);
        }.bind(this));
    };

    Checklist.prototype.addRow = function (coffeeOrder) {
        this.removeRow(coffeeOrder.emailAddress);
        var rowElement = new Row(coffeeOrder);
        this.$element.append(rowElement.$element);
    };

    Checklist.prototype.removeRow = function (email) {
        this.$element
            .find('[value="' + email + '"]')
            .closest('[data-coffee-order="checkbox"')
            .remove();
    };

    function Row(coffeeOrder) {
        var $div = $('<div></div>', {
            'data-coffee-order': 'checkbox',
            'class': 'checkbox'
        });

        var $label = $('<label></label>');

        var $checkbox = $('<input/>', {
            type: 'checkbox',
            value: coffeeOrder.emailAddress
        });

        var $description = $('<p></p>', {class: 'img-rounded order-description'});

        var description = coffeeOrder.size + ' ';
        if (coffeeOrder.flavor) {
            description += coffeeOrder.flavor + ' ';

                if (coffeeOrder.flavor === "caramel") {
                    $description.addClass("flavor-caramel");
                }
                if (coffeeOrder.flavor === "almond") {
                    $description.addClass("flavor-almond");
                }
                if (coffeeOrder.flavor === "mocha") {
                    $description.addClass("flavor-mocha");
                }
        }
        description += coffeeOrder.coffee + ', ';
        description += ' (' + coffeeOrder.emailAddress + ')';
        description += ' [' + coffeeOrder.strength + 'x]';

        $description.append(description);

        $label.append($checkbox);
        $label.append($description);
        $div.append($label);

        this.$element = $div;
    }

    App.Checklist = Checklist;
    window.App = App;
})(window);