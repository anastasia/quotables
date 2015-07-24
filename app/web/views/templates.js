angular.module('templates-app', ['home.tpl.jade', 'login.tpl.jade', 'partials/navbar.tpl.jade', 'quotes/list.tpl.jade', 'tags/list.tpl.jade']);

angular.module("home.tpl.jade", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("home.tpl.jade",
    "<!DOCTYPE html><html ng-app=\"app\"><script src=\"dist/built.js\"></script><script src=\"app.js\"></script><link type=\"text/css\" rel=\"stylesheet\" href=\"styles.css\"><head><title>Quotables</title><div class=\"main-header\"><content>Q</content></div></head><body ui-view=\"\"><div class=\"home-content\"><div class=\"sidebar\"><div class=\"logo\"></div><div class=\"account-btn\"></div><div ui-view=\"tags\"></div></div><div class=\"main-view\">   <q-navbar></q-navbar><div ui-view=\"quotes\"></div></div></div></body></html>");
}]);

angular.module("login.tpl.jade", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("login.tpl.jade",
    "<!DOCTYPE html><html ng-app=\"app\"><script src=\"dist/built.js\"></script><script src=\"app.js\"></script><link type=\"text/css\" rel=\"stylesheet\" href=\"styles.css\"><head><title>Quotables</title><div class=\"main-header\"><content>Q</content></div></head><body ui-view=\"\"><h1>Log in</h1><form ng-controller=\"LoginCtrl as ctrl\"><p><label for=\"email\">Email:</label><input type=\"text\" name=\"email\" ng-model=\"ctrl.user.email\" required=\"required\" class=\"form-control\"></p><p><label for=\"password\">Password:</label><input type=\"password\" name=\"password\" ng-model=\"ctrl.user.password\" required=\"required\" class=\"form-control\"></p><button ng-click=\"ctrl.login()\">Submit</button></form></body></html>");
}]);

angular.module("partials/navbar.tpl.jade", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("partials/navbar.tpl.jade",
    "<div class=\"navbar\"><input type=\"text\" ng-change=\"nav.filterByText()\" ng-model=\"nav.searchval\" placeholder=\"SEARCH\" class=\"searchbar\"><button ng-click=\"nav.searchval = null;nav.filterByText('')\" ng-if=\"nav.searchval.length &gt; 0\" class=\"clear-btn\"></button><button class=\"add-quote-btn\"></button></div>");
}]);

angular.module("quotes/list.tpl.jade", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("quotes/list.tpl.jade",
    "<div ng-controller=\"QuotesCtrl as qc\" class=\"quote-list-container\"><div ng-repeat=\"quote in qc.quotes | filter: qc.filterText\" class=\"single-quote\"><div class=\"content\">{{ quote.content.body }}</div></div></div>");
}]);

angular.module("tags/list.tpl.jade", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("tags/list.tpl.jade",
    "<div ng-controller=\"TagsCtrl as tagsctrl\" class=\"tags-list-container\"><div class=\"tags-header\">TAGS</div><div ng-repeat=\"tag in tagsctrl.allTags track by $index\" ng-click=\"tagsctrl.updateWithTag(tag)\" ng-class=\"{'selected':tagsctrl.tagSelected(tag)}\" class=\"tag\"> <a>{{ tag }}</a></div></div>");
}]);
