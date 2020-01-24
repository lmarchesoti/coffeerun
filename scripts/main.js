(function (window) {
    'use strict';
    var FORM_SELECTOR = '[data-coffee-order="form"]';
    var EMAIL_INPUT_SELECTOR = '#emailInput';
    var POWERUP_CONTAINER_SELECTOR = '#powerUpsContainer';
    var MODAL_SELECTOR = '#powerupConfirmation';
    var App = window.App;
    var Truck = App.Truck;
    var DataStore = App.DataStore;
    var FormHandler = App.FormHandler;
    var EmailHandler = App.EmailHandler;
    var PowerUpHandler = App.PowerUpHandler;
    var PowerUserList = App.PowerUserList;
    var ConfirmationHandler = App.ConfirmationHandler;
    var myTruck = new Truck('ncc-1701', new DataStore());
    window.myTruck = myTruck;
    var confirmationHandler = new ConfirmationHandler(MODAL_SELECTOR);
    var powerUserlist = new PowerUserList(confirmationHandler);
    var formHandler = new FormHandler(FORM_SELECTOR);
    var emailHandler = new EmailHandler(EMAIL_INPUT_SELECTOR);
    var powerUpHandler = new PowerUpHandler(POWERUP_CONTAINER_SELECTOR);

    formHandler.addSubmitHandler([myTruck.createOrder.bind(myTruck),
        powerUserlist.tryAddingPowerUser.bind(powerUserlist)]);
    console.log(formHandler);

    emailHandler.addChangeHandler(powerUserlist.isPowerUser.bind(powerUserlist),
        powerUpHandler.show.bind(powerUpHandler), powerUpHandler.hide.bind(powerUpHandler));
    console.log(emailHandler);
})(window);
