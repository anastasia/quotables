angular.module('templates-app', ['home.tpl.jade', 'login.tpl.jade', 'partials/navbar.tpl.jade', 'partials/new.quote.tpl.jade', 'quotes/list.tpl.jade', 'quotes/view.quote.tpl.jade', 'signup.tpl.jade', 'tags/list.tpl.jade']);

angular.module("home.tpl.jade", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("home.tpl.jade",
    "<!DOCTYPE html><html ng-app=\"app\"><script src=\"dist/built.js\"></script><script src=\"app.js\"></script><link rel=\"stylesheet\" href=\"https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css\"><link rel=\"stylesheet\" href=\"http://fonts.googleapis.com/css?family=Playfair+Display:400,700|Asap:400,700,700italic\" type=\"text/css\"><link type=\"text/css\" rel=\"stylesheet\" href=\"styles.css\"><body ui-view=\"\"><div class=\"home-content\"><div class=\"sidebar\"><div class=\"logo\"></div><div ui-view=\"tags\"></div></div><div class=\"main-view\">   <q-navbar></q-navbar><q-new-quote></q-new-quote><div ui-view=\"quotes\"></div></div></div></body></html>");
}]);

angular.module("login.tpl.jade", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("login.tpl.jade",
    "<!DOCTYPE html><html ng-app=\"app\"><script src=\"dist/built.js\"></script><script src=\"app.js\"></script><link rel=\"stylesheet\" href=\"https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css\"><link rel=\"stylesheet\" href=\"http://fonts.googleapis.com/css?family=Playfair+Display:400,700|Asap:400,700,700italic\" type=\"text/css\"><link type=\"text/css\" rel=\"stylesheet\" href=\"styles.css\"><body ui-view=\"\"><div ng-controller=\"LoginCtrl as ctrl\" class=\"login-page\"><h1>Log in</h1><form><p><label for=\"email\">Email:</label><input type=\"text\" name=\"email\" ng-model=\"ctrl.user.email\" required=\"required\" class=\"form-control\"></p><p><label for=\"password\">Password:</label><input type=\"password\" name=\"password\" ng-model=\"ctrl.user.password\" required=\"required\" class=\"form-control\"></p><button ng-click=\"ctrl.login()\">Submit</button></form><button ng-click=\"ctrl.goToSignupPage()\">Sign up</button></div></body></html>");
}]);

angular.module("partials/navbar.tpl.jade", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("partials/navbar.tpl.jade",
    "<div class=\"navbar\"><div class=\"searchbar-container\"><input type=\"text\" ng-change=\"nav.filterByText()\" ng-model=\"nav.searchval\" ng-disabled=\"nav.addingQuote\" ng-if=\"nav.selectedTags.length &lt; 1\" placeholder=\"{{nav.searchPlaceholder}}\" class=\"searchbar\"></div><div class=\"btn-container\"><button ng-click=\"nav.clearSearch()\" class=\"nav-btn\"><div class=\"lookup-icon\"></div></button><button ng-class=\"{clicked:nav.addingQuote == true}\" ng-click=\"nav.toggleNewQuote()\" class=\"nav-btn\"><div class=\"plus-icon\"></div></button></div><div class=\"selected-tags\"><div ng-repeat=\"tag in nav.selectedTags track by $index\" ng-class=\"nav.getClass(tag)\" class=\"selected-tag\"> <span class=\"content\">{{tag}}</span><div ng-click=\"nav.updateWithTag(tag)\" class=\"delete-btn\"></div></div></div></div>");
}]);

angular.module("partials/new.quote.tpl.jade", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("partials/new.quote.tpl.jade",
    "<div ng-if=\"newquote.shown == true\" class=\"new-quote\"><form><div class=\"header\">author</div><input ng-model=\"newquote.author\" class=\"author field field-small\"><div class=\"header\">content</div><textarea ng-model=\"newquote.body\" class=\"content field field-big\"></textarea><div class=\"header\">origin</div><input ng-model=\"newquote.origin\" class=\"origin field field-small\"><div class=\"header\">tags (separate by spaces)</div><input ng-model=\"newquote.tags\" class=\"tags field field-small\"><input ng-click=\"newquote.addQuote()\" type=\"button\" value=\"submit\" class=\"submit\"></form></div>");
}]);

angular.module("quotes/list.tpl.jade", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("quotes/list.tpl.jade",
    "<div ng-controller=\"QuotesCtrl as qc\" class=\"quote-list-container\"><div data-ellipsis ng-repeat=\"quote in qc.quotes | filter: qc.filterText track by $index\" ng-class=\"qc.getClass(quote)\" class=\"single-quote\"><div ng-click=\"qc.deleteQuote(quote)\" class=\"delete-btn\"></div><div class=\"overlay-div\"></div><div ng-click=\"qc.viewQuote(quote)\" class=\"content-container\"><div class=\"content\">{{ quote.body }}</div></div><div ng-if=\"quote.tagsArray.length &gt; 0 &amp;&amp; quote.tagsArray[0].length &gt; 0\" class=\"tags-container\"><span ng-repeat=\"tag in quote.tagsArray\" class=\"tag-small\">{{tag}}</span></div></div></div>");
}]);

angular.module("quotes/view.quote.tpl.jade", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("quotes/view.quote.tpl.jade",
    "<div ng-controller=\"SingleQuoteCtrl as ctrl\" class=\"modal-container\"><h5>content</h5><div editable-textarea=\"ctrl.quote.body\" buttons=\"no\" blur=\"submit\" onbeforesave=\"ctrl.updateQuote('body', $data)\">{{ ctrl.quote.body || 'body' }}</div><h5>author</h5><div editable-text=\"ctrl.quote.author\" buttons=\"no\" blur=\"submit\" onbeforesave=\"ctrl.updateQuote('author', $data)\">{{ ctrl.quote.author }}</div><h5>url</h5><div editable-text=\"ctrl.quote.origin\" buttons=\"no\" blur=\"submit\" onbeforesave=\"ctrl.updateQuote('origin', $data)\">{{ ctrl.quote.origin }}</div></div>");
}]);

angular.module("signup.tpl.jade", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("signup.tpl.jade",
    "<!DOCTYPE html><html ng-app=\"app\"><script src=\"dist/built.js\"></script><script src=\"app.js\"></script><link rel=\"stylesheet\" href=\"https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css\"><link rel=\"stylesheet\" href=\"http://fonts.googleapis.com/css?family=Playfair+Display:400,700|Asap:400,700,700italic\" type=\"text/css\"><link type=\"text/css\" rel=\"stylesheet\" href=\"styles.css\"><body ui-view=\"\"><div ng-controller=\"SignupCtrl as ctrl\" class=\"signup-page\"><h1>Sign Up</h1><form class=\"form-group\"><br><label for=\"email\">Email:</label><br><input type=\"text\" name=\"email\" ng-model=\"ctrl.user.email\" required=\"required\"><br><label for=\"password\">Password:</label><br><input type=\"password\" name=\"password\" ng-model=\"ctrl.user.password\" required=\"required\"><br><label for=\"password\">Confirm password:</label><br><input type=\"password\" name=\"password\"><br><button ng-click=\"ctrl.sendConfirmationEmail()\">Send a confirmation email</button></form><button ng-click=\"ctrl.goToLoginPage()\">Log in</button></div></body></html>");
}]);

angular.module("tags/list.tpl.jade", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("tags/list.tpl.jade",
    "<div ng-controller=\"TagsCtrl as tagsctrl\" class=\"tags-list-container\"><div ng-repeat=\"tag in tagsctrl.allTags | orderBy track by $index\" ng-click=\"tagsctrl.updateWithTag(tag)\" ng-if=\"tag.length &gt; 0 &amp;&amp; tag\" ng-class=\"{'selected':tagsctrl.tagSelected(tag)}\" class=\"tag\"> <a class=\"tag-name\">{{ tag }}</a></div></div>");
}]);
