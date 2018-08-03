'use strict';

function brRightNavCtrl() {

}
angular.module('meriApp.brRightNav', ['ngRoute'])

// .config(['$routeProvider', function($routeProvider) {
//   $routeProvider.when('/view1', {
//     templateUrl: 'view1/view1.html',
//     controller: 'View1Ctrl'
//   });
// }])
.component('brRightNav', {
  templateUrl: 'components/br-right-nav/br-right-nav.tpl.html',
  controller: brRightNavCtrl,
  bindings: {
    hero: '='
  }
});

