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

    Checklist.prototype.addClickHandler = function (fn_click, fn_dblclick) {
        this.clicked = false;
        this.fnTimeout = null;
        this.removeTimeout = null;
        this.$element.on('click', 'input', function (event) {
            var email = event.target.value;
            if (this.clicked) {
                this.clicked = false;
                clearTimeout(this.removeTimeout);
                clearTimeout(this.fnTimeout);
                this.clearGrayOut(email);
                fn_dblclick(email);
            } else {
                this.clicked = true;
                this.grayOut(email);
                this.removeTimeout = setTimeout(this.removeRow.bind(this), 800, email);
                this.fnTimeout = setTimeout(fn_click, 800, email);
                setTimeout(function () {
                    this.clicked = false;
                }.bind(this), 800);
            }
        }.bind(this));
    };

    Checklist.prototype.addRow = function (coffeeOrder) {
        var row = this.findByEmail(coffeeOrder.emailAddress);
        if (row.length === 0) {
            var rowElement = new Row(coffeeOrder);
            this.$element.append(rowElement.$element);
        } else {
            this.editRow(row, coffeeOrder);
        }
    };

    Checklist.prototype.editRow = function(row, coffeeOrder) {
        row.find('label').contents().filter(function() {
            return this.nodeType === 3;
        }).last().replaceWith(createDescription(coffeeOrder));
    };

    Checklist.prototype.removeRow = function (email) {
        this.findByEmail(email)
            .remove();
    };

    Checklist.prototype.findByEmail = function (email) {
        return this.$element
            .find('[value="' + email + '"]')
            .closest('[data-coffee-order="checkbox"');
    };

    Checklist.prototype.grayOut = function (email) {
        this.findByEmail(email).addClass('gray-out');
    };

    Checklist.prototype.clearGrayOut = function (email) {
        this.findByEmail(email).removeClass('gray-out');
    };

    function createDescription(coffeeOrder) {
        var description = coffeeOrder.size + ' ';
        if (coffeeOrder.flavor) {
            description += coffeeOrder.flavor + ' ';
        }
        description += coffeeOrder.coffee + ', ';
        description += ' (' + coffeeOrder.emailAddress + ')';
        description += ' [' + coffeeOrder.strength + 'x]';
        return description;
    }

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
        var description = createDescription(coffeeOrder);

        $label.append($checkbox);
        $label.append(description);
        $div.append($label);

        this.$element = $div;
    }

    App.Checklist = Checklist;
    window.App = App;
})(window);