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

        this.fnClickTimeout = {};
        this.removeTimeout = {};
    }

    Checklist.prototype.addClickHandler = function (fn_click, fn_dblclick) {
        this.$element.on('click', 'input', function (event) {
            var email = event.target.value;
            if (this.rowClicked(email)) {
                this.rowDblClickEvent(email);
                fn_dblclick(email);
            } else {
                this.rowClickEvent(email, fn_click);
                this.grayOut(email);
            }
        }.bind(this));
    };

    Checklist.prototype.rowClicked = function (email) {
        return this.findByEmail(email).hasClass('gray-out');
    };

    Checklist.prototype.rowClickEvent = function (email, fn_click) {
        this.removeTimeout[email] = setTimeout(this.removeRow.bind(this), 800, email);
        this.fnClickTimeout[email] = setTimeout(fn_click, 800, email);
    };

    Checklist.prototype.rowDblClickEvent = function (email) {
        this.clearGrayOut(email);
        clearTimeout(this.removeTimeout[email]);
        delete this.removeTimeout[email];
        clearTimeout(this.fnClickTimeout[email]);
        delete this.fnClickTimeout[email];
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

    Checklist.prototype.editRow = function (row, coffeeOrder) {
        row.find('label').contents().filter(function () {
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

    App.Checklist = Checklist;
    window.App = App;
})(window);