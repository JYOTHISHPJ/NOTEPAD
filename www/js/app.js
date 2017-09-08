// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic','starter.controller','starter.services','ngCordova'])




.run(function($ionicPlatform,$cordovaSQLite,$rootScope,$ionicSideMenuDelegate,$state,$ionicHistory,$ionicPopup) {
  $ionicPlatform.ready(function() {

    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();

    }
var db;
 db = $cordovaSQLite.openDB({name:"Test.db", location:'default'});
               $cordovaSQLite.execute(db, 'CREATE  TABLE IF NOT EXISTS Note (id INTEGER PRIMARY KEY AUTOINCREMENT, message TEXT)');

 $ionicPlatform.registerBackButtonAction(function(e){
    document.getElementById('hfTemp').value="test";

      e.preventDefault();
 if ($state.is('second')) {


                navigator.app.exitApp();

            }
else
{
       $state.go('second');
       }
      return false;
    },101);


  });

})


.config
(function($stateProvider, $urlRouterProvider) {
 $stateProvider






      .state('editor', {
            url: '/editor',
        cache: false,
            templateUrl: 'templates/editor.html',
   controller: 'EditCtrl'
        })

    .state('second', {
        url: '/second',
    cache: false,
        templateUrl: 'templates/second.html',
      controller: 'SecCtrl'
    });


 $urlRouterProvider.otherwise('/second');

});

