'use strict';

angular.module('meriApp.version', [
  'meriApp.version.interpolate-filter',
  'meriApp.version.version-directive'
])

.value('version', '0.1');
