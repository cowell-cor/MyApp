'use strict';

function brLeftNavCtrl() {

}
angular.module('meriApp.brLeftNav', ['ngRoute'])

// .config(['$routeProvider', function($routeProvider) {
//   $routeProvider.when('/view1', {
//     templateUrl: 'view1/view1.html',
//     controller: 'View1Ctrl'
//   });
// }])
.component('brLeftNav', {
  templateUrl: 'components/br-left-nav/br-left-nav.tpl.html',
  controller: brLeftNavCtrl,
  bindings: {
    hero: '='
  }
});

