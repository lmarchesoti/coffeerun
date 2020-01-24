(function (window) {
  'use strict';
  var App = window.App || {};

  function PowerUserList(confirmationHandler) {
    this.$confirmationHandler = confirmationHandler;
    this.powerUsers = new Set();
  }

  function isPowerOrder(order) {
    return true;
  };

  PowerUserList.prototype.isPowerUser = function (email) {
    return this.powerUsers.has(email);
  };

  PowerUserList.prototype.addPowerUser = function (email) {
    this.powerUsers.add(email);
  };

  PowerUserList.prototype.tryAddingPowerUser = function (order) {
    console.log('Trying to add power user');
    if (isPowerOrder(order) && this.$confirmationHandler.confirm()) {
      console.log(order['emailAddress'] + ' is a Power User!');
      this.powerUsers.add(order['emailAddress']);
    }
  };

  App.PowerUserList = PowerUserList;
  window.App = App;
})(window);
