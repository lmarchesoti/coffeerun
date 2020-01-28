(function (window) {
  'use strict';
  var App = window.App || {};

  function PowerUserList() {
    this.powerUsers = new Set(['lmarchesoti@gmail.com']);
  }

  PowerUserList.prototype.isPowerOrder = function (order) {
    return order.size === "grande" && order.strength === "100" && order.flavor !== "";
  };

  PowerUserList.prototype.isPowerUser = function (email) {
    return this.powerUsers.has(email);
  };

  PowerUserList.prototype.addPowerUser = function (order) {
    this.powerUsers.add(order['emailAddress']);
  };

  App.PowerUserList = PowerUserList;
  window.App = App;
})(window);
