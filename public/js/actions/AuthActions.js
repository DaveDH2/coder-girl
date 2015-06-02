/* 
* @Author: nimi
* @Date:   2015-05-21 16:17:55
* @Last Modified by:   Mark Bennett
* @Last Modified time: 2015-05-28 17:53:28
*/

'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');

var authActions = {

  login: function(email, password) {
    var user = {
      email: email,
      password: password
    };
    $.ajax({
      url: '/api/users/login',
      dataType: 'json',
      type: 'POST',
      data: user,
      success: function(data) {
        AppDispatcher.handleViewAction({
          actionType: AppConstants.LOGIN_USER,
          data: data
        });
      },
      error: function(xhr, status, error) {
        throw (error);
      }.bind(this) // NOTE: we may need a .bind(this) here-ish
    });
  },

  signup: function(email, password, country) {
    var user = {
      email: email,
      password: password,
      country: country
    };
    $.ajax({
      url: '/api/users/signup',
      dataType: 'json',
      type: 'POST',
      data: user,
      success: function(data) {
        AppDispatcher.handleViewAction({
          actionType: AppConstants.SIGNUP_USER,
          data: data
        });
      },
      error: function(xhr, status, error) {
        console.error(xhr, status, error);
      }.bind(this)
    });
  },

  logout: function() {
    AppDispatcher.handleViewAction({
      actionType: AppConstants.LOGOUT_USER
    });
  },

  isAuth: function(tokenObject) {
    $.ajax({
      url: 'api/users/signedin',
      type: 'GET',
      headers: {
        'x-access-token': tokenObject
      },
      success: function(data) {
        AppDispatcher.handleServerAction({
          actionType: AppConstants.VERIFY_SIGNIN,
          data: data
        });
      },
      error: function(xhr, status, error) {
        console.error(xhr, status, error);
        AppDispatcher.handleServerAction({
          actionType: AppConstants.REDIRECT_USER
        });
      }.bind(this)
    });
  },

  instagramSetCurrentUser: function(data) {
    $.ajax({
      url: '/api/users/user',
      dataType: 'json',
      type: 'GET',
      data: data,
      success: function(user) {
        AppDispatcher.handleViewAction({
          actionType: AppConstants.INSTAGRAM_SET_CURRENT_USER,
          data: user
        });
      },
      error: function(xhr, status, error) {
        throw (error);
      }.bind(this) // NOTE: we may need a .bind(this) here-ish

    });
  }
};

module.exports = authActions;
