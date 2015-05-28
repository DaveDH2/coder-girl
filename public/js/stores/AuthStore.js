/* 
* @Author: nimi
* @Date:   2015-05-22 11:03:34
* @Last Modified by:   Mark Bennett
* @Last Modified time: 2015-05-27 12:40:50
*/

'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var AppConstants = require('../constants/AppConstants');
var objectAssign = require('react/lib/Object.assign');
var CHANGE_EVENT = 'change';

var _authStore = {
  currentUser: null
};

var setCurrentUser = function(data){
  console.log("DATA: ", data.username);
  _authStore.currentUser = data.username;
  var userToken = JSON.stringify(data.token);
  window.localStorage.setItem('io.codergirl', userToken);
};

var clearCurrentUser = function() {
  _authStore.currentUser = null;
  window.localStorage.removeItem('io.codergirl');
};

var userStore = objectAssign({}, EventEmitter.prototype, {
  addChangeListener: function(cb) {
    this.on(CHANGE_EVENT, cb);
  },
  removeChangeListener: function(cb) {
    this.removeListener(CHANGE_EVENT, cb);
  },
  emitChange: function(){
    this.emit(CHANGE_EVENT);
  },
  getUser: function(){
    return _authStore.currentUser;
  }
});

AppDispatcher.register(function(payload) {
  var action = payload.action;

  switch (action.actionType) {

    case AppConstants.LOGIN_USER:
      console.log('login user');
      setCurrentUser(action.data);
      userStore.emitChange();
      break;

    case AppConstants.LOGOUT_USER:
      clearCurrentUser();
      userStore.emitChange();
      break;

    case AppConstants.INSTAGRAM_SET_CURRENT_USER:
      console.log('setting current user via instagram');
      setCurrentUser(action.data);
      userStore.emitChange();

    default:
      return true;
  }
});

module.exports = userStore;