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

  var resetSlider = function (value) {
    console.log('Caffeine rating changed from ' + this.innerText + ' to ' + value);
    this.innerText = value;
    this.classList.remove("text-success");
    this.classList.remove("text-warning");
    this.classList.remove("text-danger");
    var colorRating = Math.floor((value - 1) / 33);
    switch(colorRating) {
      case -1:
        this.classList.add("text-success");
        break;
      case 0:
        this.classList.add("text-success");
        break;
      case 1:
        this.classList.add("text-warning");
        break;
      case 2:
        this.classList.add("text-danger");
        break;
      case 3:
        this.classList.add("text-danger");
        break;
    };
  }.bind(document.querySelector(SLIDER_DISPLAY_VALUE_SELECTOR));

  sliderHandler.addChangeHandler(resetSlider);
  console.log(sliderHandler);

  window.resetSlider = resetSlider;
})(window);
