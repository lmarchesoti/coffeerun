(function (window) {
    'use strict';
    var App = window.App || {};
    var Promise = window.Promise;

    function DataStoreProxy(remoteDS, localDS) {
        this.remoteDS = remoteDS;
        this.localDS = localDS;
    }

    // function promiseResolvedWith(value) {
    //     return new Promise(function (resolve, reject) {
    //         resolve(value);
    //     });
    // }

    DataStoreProxy.prototype.add = function (key, val) {
        return new Promise(function (resolve, reject) {
            this.remoteDS.add(key, val).then(function (serverResponse) {
                    resolve(serverResponse);
                },
                function (serverResponse) {
                    resolve(this.localDS.add(key, val));
                }.bind(this))
        }.bind(this));
    };

    DataStoreProxy.prototype.get = function (key) {
        return new Promise(function (resolve, reject) {
            this.remoteDS.get(key).then(function (serverResponse) {
                    resolve(serverResponse);
                },
                function (serverResponse) {
                    resolve(this.localDS.get(key));
                }.bind(this))
        }.bind(this));
    };

    DataStoreProxy.prototype.getAll = function () {
        return new Promise(function (resolve, reject) {
            this.remoteDS.getAll().then(function (serverResponse) {
                    resolve(serverResponse);
                },
                function (serverResponse) {
                    resolve(this.localDS.getAll());
                }.bind(this))
        }.bind(this));
    };

    DataStoreProxy.prototype.remove = function (key) {
        return new Promise(function (resolve, reject) {
            this.remoteDS.remove(key).then(function (serverResponse) {
                    resolve(serverResponse);
                },
                function (serverResponse) {
                    resolve(this.localDS.remove(key));
                }.bind(this))
        }.bind(this));
    };

    App.DataStoreProxy = DataStoreProxy;
    window.App = App;
})(window);
