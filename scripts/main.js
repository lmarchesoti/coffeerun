(function (window) {
  'use strict';
  var FORM_SELECTOR = '[data-coffee-order="form"]';
  var SLIDER_SELECTOR = '[strength-level="slider"]';
  var SLIDER_DISPLAY_VALUE_SELECTOR = '[strength-level="display-value"]';
  var App = window.App;
  var Truck = App.Truck;
  var DataStore = App.DataStore;
  var FormHandler = App.FormHandler;
  var SliderHandler = App.SliderHandler;
  var myTruck = new Truck('ncc-1701', new DataStore());
  window.myTruck = myTruck;
  var formHandler = new FormHandler(FORM_SELECTOR);
  var sliderHandler = new SliderHandler(SLIDER_SELECTOR);

  formHandler.addSubmitHandler(myTruck.createOrder.bind(myTruck));
  console.log(formHandler);

  sliderHandler.addChangeHandler(function (value) {
    console.log('Caffeine rating changed from ' + this.innerText + ' to ' + value);
    this.innerText = value;
  }.bind(document.querySelector(SLIDER_DISPLAY_VALUE_SELECTOR)));
  console.log(sliderHandler);
})(window);
