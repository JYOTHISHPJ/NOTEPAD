angular.module('starter.services', [])

.factory('Details', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var details = [{
    id: 0,
    name: 'TEST1',
    msg: 'You on your way?',

  },{
        id: 0,
        name: 'TEST2',
        msg: 'You on your way?',

      }];

  return {
    all: function() {
      return details;
    },

    get: function() {

      return null;
    }
  };
});