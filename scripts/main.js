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
    var SliderDisplayValueHandler = App.SliderDisplayValueHandler;
    var myTruck = new Truck('ncc-1701', new DataStore());
    window.myTruck = myTruck;
    var formHandler = new FormHandler(FORM_SELECTOR);
    var sliderHandler = new SliderHandler(SLIDER_SELECTOR);
    var sliderDisplayValueHandler = new SliderDisplayValueHandler(SLIDER_DISPLAY_VALUE_SELECTOR);

    sliderHandler.addChangeHandler(sliderDisplayValueHandler.set.bind(sliderDisplayValueHandler));
    sliderHandler.reset();
    console.log(sliderHandler);

    formHandler.addSubmitHandler(myTruck.createOrder.bind(myTruck));
    formHandler.addResetHandler(sliderHandler.reset.bind(sliderHandler));
    console.log(formHandler);


})(window);
