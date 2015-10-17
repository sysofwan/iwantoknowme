'use strict';

/**
 * @ngdoc overview
 * @name iwantoknowmeApp
 * @description
 * # iwantoknowmeApp
 *
 * Main module of the application.
 */
angular
  .module('iwantoknowmeApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/browsinghabit', {
        templateUrl: 'views/browsinghabit.html',
        controller: 'BrowsinghabitCtrl',
        controllerAs: 'browsinghabit'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
