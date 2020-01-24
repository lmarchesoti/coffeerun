(function (window) {
  'use strict';
  var FORM_SELECTOR = '[data-coffee-order="form"]';
  var EMAIL_INPUT_SELECTOR = '#emailInput';
  var App = window.App;
  var Truck = App.Truck;
  var DataStore = App.DataStore;
  var FormHandler = App.FormHandler;
  var EmailHandler = App.EmailHandler;
  var myTruck = new Truck('ncc-1701', new DataStore());
  window.myTruck = myTruck;
  var formHandler = new FormHandler(FORM_SELECTOR);
  var emailHandler = new EmailHandler(EMAIL_INPUT_SELECTOR);

  formHandler.addSubmitHandler(myTruck.createOrder.bind(myTruck));
  console.log(formHandler);

  emailHandler.addChangeHandler(myTruck.isPowerUser.bind(myTruck));
  console.log(emailHandler);
})(window);
