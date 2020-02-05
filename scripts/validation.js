(function (window) {
    'use strict';
    var App = window.App || {};

    var Validation = {
        isCompanyEmail: function (email) {
            return /.+@callink\.com\.br$/.test(email);
        },

        isDecaf: function (coffee, strength) {
            return !(/decaf/.test(coffee.toLowerCase()) && (strength > 20));
        }
    };

    App.Validation = Validation;
    window.App = App;
})(window);