angular.module('templates-app', ['quotes/list.tpl.jade']);

angular.module("quotes/list.tpl.jade", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("quotes/list.tpl.jade",
    "<!DOCTYPE html><html ng-app=\"app\"><script src=\"dist/built.js\"></script><script src=\"app.js\"></script><head><title>Quotables</title><h1>Quotables</h1></head><body ui-view=\"\"><div>yo</div><h1>Quotes</h1><div ng-controller=\"SomeCtrl\">app is working. hello there!!!</div></body></html>");
}]);

(function() {
  angular.module('app', ['ui.router', 'templates-app']).config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
    return $stateProvider.state('/', {
      templateUrl: 'quotes/list.tpl.jade',
      url: '/'
    });
  });

}).call(this);

(function() {
  angular.module("app").controller("SomeCtrl", function() {
    return console.log("SomeCtrl");
  });

}).call(this);
