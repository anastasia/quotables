angular.module('templates-app', ['home.tpl.jade', 'login.tpl.jade', 'partials/navbar.tpl.jade', 'partials/new.quote.tpl.jade', 'quotes/list.tpl.jade', 'signup.tpl.jade', 'tags/list.tpl.jade']);

angular.module("home.tpl.jade", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("home.tpl.jade",
    "<!DOCTYPE html><html ng-app=\"app\"><script src=\"dist/built.js\"></script><script src=\"app.js\"></script><link type=\"text/css\" rel=\"stylesheet\" href=\"styles.css\"><body ui-view=\"\"><div class=\"home-content\"><div class=\"sidebar\"><div class=\"logo\"></div><div class=\"account-btn\"></div><div ui-view=\"tags\"></div></div><div class=\"main-view\">   <q-navbar></q-navbar><q-new-quote></q-new-quote><div ui-view=\"quotes\"></div></div></div></body></html>");
}]);

angular.module("login.tpl.jade", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("login.tpl.jade",
    "<!DOCTYPE html><html ng-app=\"app\"><script src=\"dist/built.js\"></script><script src=\"app.js\"></script><link type=\"text/css\" rel=\"stylesheet\" href=\"styles.css\"><body ui-view=\"\"><div ng-controller=\"LoginCtrl as ctrl\" class=\"login-page\"><h1>Log in</h1><form><p><label for=\"email\">Email:</label><input type=\"text\" name=\"email\" ng-model=\"ctrl.user.email\" required=\"required\" class=\"form-control\"></p><p><label for=\"password\">Password:</label><input type=\"password\" name=\"password\" ng-model=\"ctrl.user.password\" required=\"required\" class=\"form-control\"></p><button ng-click=\"ctrl.login()\">Submit</button></form><button ng-click=\"ctrl.goToSignupPage()\">Sign up</button></div></body></html>");
}]);

angular.module("partials/navbar.tpl.jade", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("partials/navbar.tpl.jade",
    "<div class=\"navbar\"><input type=\"text\" ng-change=\"nav.filterByText()\" ng-model=\"nav.searchval\" ng-disabled=\"nav.addingQuote\" placeholder=\"{{nav.searchPlaceholder}}\" class=\"searchbar\"><button ng-click=\"nav.clearSearch()\" ng-if=\"nav.searchval.length &gt; 0\" class=\"clear-btn\"></button><button ng-class=\"{clicked:nav.addingQuote == true}\" ng-click=\"nav.toggleNewQuote()\" class=\"add-quote-btn\"></button></div>");
}]);

angular.module("partials/new.quote.tpl.jade", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("partials/new.quote.tpl.jade",
    "<div ng-if=\"newquote.shown == true\" class=\"new-quote\"><form><div class=\"header\">author</div><input ng-model=\"newquote.author\" class=\"author field field-small\"><div class=\"header\">content</div><textarea ng-model=\"newquote.body\" class=\"content field field-big\"></textarea><div class=\"header\">origin</div><input ng-model=\"newquote.origin\" class=\"origin field field-small\"><div class=\"header\">tags (separate by spaces)</div><input ng-model=\"newquote.tags\" class=\"tags field field-small\"><input ng-click=\"newquote.addQuote()\" type=\"button\" value=\"submit\" class=\"submit\"></form></div>");
}]);

angular.module("quotes/list.tpl.jade", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("quotes/list.tpl.jade",
    "<div ng-controller=\"QuotesCtrl as qc\" class=\"quote-list-container\"><div ng-click=\"qc.viewQuote(quote._id)\" ng-repeat=\"quote in qc.quotes | filter: qc.filterText\" ng-class=\"{'in-focus':qc.quoteViewed == quote._id}\" class=\"single-quote\"><div class=\"content\">{{ quote.content.body }}</div></div></div>");
}]);

angular.module("signup.tpl.jade", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("signup.tpl.jade",
    "<!DOCTYPE html><html ng-app=\"app\"><script src=\"dist/built.js\"></script><script src=\"app.js\"></script><link type=\"text/css\" rel=\"stylesheet\" href=\"styles.css\"><body ui-view=\"\"><div ng-controller=\"SignupCtrl as ctrl\" class=\"signup-page\"><h1>Sign Up</h1><form class=\"form-group\"><br><label for=\"email\">Email:</label><br><input type=\"text\" name=\"email\" ng-model=\"ctrl.user.email\" required=\"required\"><br><label for=\"password\">Password:</label><br><input type=\"password\" name=\"password\" ng-model=\"ctrl.user.password\" required=\"required\"><br><label for=\"password\">Confirm password:</label><br><input type=\"password\" name=\"password\"><br><button ng-click=\"ctrl.sendConfirmationEmail()\">Send a confirmation email</button></form><button ng-click=\"ctrl.goToLoginPage()\">Log in</button></div></body></html>");
}]);

angular.module("tags/list.tpl.jade", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("tags/list.tpl.jade",
    "<div ng-controller=\"TagsCtrl as tagsctrl\" class=\"tags-list-container\"><div class=\"tags-header\">TAGS</div><div ng-repeat=\"tag in tagsctrl.allTags track by $index\" ng-click=\"tagsctrl.updateWithTag(tag)\" ng-class=\"{'selected':tagsctrl.tagSelected(tag)}\" class=\"tag\"> <a>{{ tag }}</a></div></div>");
}]);
