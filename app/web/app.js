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

(function() {
  angular.module('app', ['ui.router', 'templates-app', 'restangular', 'ui.bootstrap', 'xeditable']).config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise(function($injector, $location) {
      var GuardService;
      GuardService = $injector.get('GuardService');
      return GuardService.redirect();
    });
    $urlRouterProvider.when('', function(GuardService) {
      return GuardService.redirect();
    });
    return $stateProvider.state('home', {
      url: '/list?tags',
      controller: 'MainCtrl',
      views: {
        '@': {
          templateUrl: 'home.tpl.jade'
        },
        'quotes@home': {
          templateUrl: 'quotes/list.tpl.jade'
        },
        'tags@home': {
          templateUrl: 'tags/list.tpl.jade'
        }
      },
      resolve: {
        quotes: function(QuoteService) {
          return QuoteService.getQuotes().then(function() {
            return QuoteService.populateTags();
          });
        }
      }
    }).state('login', {
      url: '/login',
      templateUrl: 'login.tpl.jade'
    }).state('signup', {
      url: '/signup',
      templateUrl: 'signup.tpl.jade'
    });
  }).run(function($rootScope, GuardService, editableOptions) {
    return $rootScope.$on('$stateChangeStart', GuardService.stateChange);
  }).service('GuardService', function($state, AuthService) {
    var guards;
    return guards = {
      redirect: function() {
        return AuthService.isLoggedIn().then(function() {
          return $state.go('home');
        })["catch"](function() {
          return $state.go('login');
        });
      },
      stateChange: function(event, toState, toParams) {
        if (toState.name === "login") {
          return;
        }
        if (AuthService.loggedInUser) {
          return;
        }
        event.preventDefault();
        return AuthService.isLoggedIn().then(function() {
          return $state.go(toState.name);
        })["catch"](function() {
          return $state.go('login');
        });
      }
    };
  }).service('AuthService', function($q, $http) {
    var obj;
    return obj = {
      startSession: function(user) {
        return this.loggedInUser = user;
      },
      endSession: function() {
        return this.loggedInUser = null;
      },
      login: function(user) {
        var deferred;
        deferred = $q.defer();
        $http.post('/login', {
          email: user.email,
          password: user.password
        }).then((function(_this) {
          return function() {
            _this.startSession(user);
            return deferred.resolve(user);
          };
        })(this))["catch"]((function(_this) {
          return function() {
            _this.endSession();
            return deferred.reject('user is not logged in');
          };
        })(this));
        return deferred.promise;
      },
      loggedInUser: {},
      isLoggedIn: function() {
        var deferred;
        deferred = $q.defer();
        $http.get('/loggedin').then((function(_this) {
          return function(res) {
            _this.loggedInUser = res.data.user;
            return deferred.resolve(res.data.user);
          };
        })(this))["catch"]((function(_this) {
          return function() {
            _this.loggedInUser = null;
            return deferred.reject('user is not logged in');
          };
        })(this));
        return deferred.promise;
      }
    };
  });

}).call(this);

(function() {
  angular.module("app").directive("qNavbar", function() {
    return {
      templateUrl: 'partials/navbar.tpl.jade',
      controllerAs: 'nav',
      controller: function($scope, QuoteService, $stateParams, TagService) {
        this.searchval = '';
        this.selectedTags = [];
        this.searchPlaceholder = "SEARCH";
        this.clearSearch = function() {
          this.searchval = '';
          TagService.selectedTags = [];
          return this.filterByText('');
        };
        $scope.$watch(function() {
          return QuoteService.filterText;
        }, (function(_this) {
          return function() {
            return _this.searchval = QuoteService.filterText;
          };
        })(this));
        $scope.$watch(function() {
          return TagService.selectedTags;
        }, (function(_this) {
          return function() {
            return _this.selectedTags = TagService.selectedTags;
          };
        })(this));
        this.removeTag = function(index) {
          return TagService.selectedTags.splice(index, 1);
        };
        this.filterByText = function() {
          return QuoteService.filterText = this.searchval;
        };
        this.toggleNewQuote = function() {
          this.addingQuote = !this.addingQuote;
          this.searchPlaceholder = this.addingQuote ? "ADD A QUOTE" : "SEARCH";
          return QuoteService.addingQuote = this.addingQuote;
        };
        this.updateWithTag = function(tag) {
          return TagService.updateWithTag(tag);
        };
        this.getClass = function(tag) {
          return TagService.getClass(tag);
        };
      }
    };
  });

}).call(this);

(function() {
  angular.module("app").directive("qNewQuote", function() {
    return {
      templateUrl: 'partials/new.quote.tpl.jade',
      controllerAs: 'newquote',
      controller: function($scope, QuoteService, TagService) {
        this.shown = null;
        this.addQuote = function() {
          var obj;
          obj = {
            body: this.body,
            author: this.author,
            origin: this.origin,
            title: "",
            tags: this.tags
          };
          return QuoteService.createQuote(obj).then(function() {
            return console.log("success!");
          })["catch"](function(e) {
            return console.log("error!", e);
          });
        };
        $scope.$watch(function() {
          return QuoteService.addingQuote;
        }, (function(_this) {
          return function() {
            return _this.shown = QuoteService.addingQuote;
          };
        })(this));
      }
    };
  });

}).call(this);

(function() {
  angular.module("app").service("QuoteService", function(Restangular) {
    var obj, quoteApi;
    quoteApi = Restangular.all('quotes');
    obj = {
      filterText: "",
      quotes: [],
      selectedQuote: {},
      createQuote: function(obj) {
        return quoteApi.customPOST(obj, 'new').then((function(_this) {
          return function() {
            return _this.getQuotes();
          };
        })(this)).then(function() {
          return "success!";
        })["catch"](function(e) {
          return console.log("getting back error:", e);
        });
      },
      updateQuote: function(updates) {
        return quoteApi.one(updates.id).patch(updates);
      },
      getQuotes: function() {
        return quoteApi.getList().then((function(_this) {
          return function(quotes) {
            var i, len, quote;
            for (i = 0, len = quotes.length; i < len; i++) {
              quote = quotes[i];
              quote.tagsArray = _.pluck(quote.tags, "value");
              _this.quotes.push(quote);
            }
          };
        })(this));
      },
      populateTags: function() {
        var i, j, len, len1, quote, ref, tag, tags, uniqueTags;
        tags = [];
        ref = this.quotes;
        for (i = 0, len = ref.length; i < len; i++) {
          quote = ref[i];
          tags = tags.concat(quote.tags);
        }
        uniqueTags = {};
        for (j = 0, len1 = tags.length; j < len1; j++) {
          tag = tags[j];
          uniqueTags[tag.value] = true;
        }
        this.tags = Object.keys(uniqueTags);
      },
      filterByTags: function(tags) {
        var filteredQuotes, i, j, len, len1, quote, quotePushed, ref, tag;
        if (!tags) {
          this.filterText = "";
          return this.quotes;
        }
        filteredQuotes = [];
        ref = this.quotes;
        for (i = 0, len = ref.length; i < len; i++) {
          quote = ref[i];
          quotePushed = false;
          for (j = 0, len1 = tags.length; j < len1; j++) {
            tag = tags[j];
            if (quotePushed) {
              continue;
            }
            if (_.indexOf(quote.tagsArray, tag) > -1 && !quotePushed) {
              filteredQuotes.push(quote);
              quotePushed = true;
            }
          }
        }
        return filteredQuotes;
      }
    };
    return obj;
  });

}).call(this);

(function() {
  angular.module("app").service("TagService", function($state) {
    var obj;
    obj = {
      selectedTags: [],
      updateWithTag: function(tag) {
        var selected, tagIndex;
        tagIndex = _.indexOf(this.selectedTags, tag);
        selected = tagIndex > -1;
        if (selected) {
          this.selectedTags.splice(tagIndex, 1);
        } else {
          this.selectedTags.push(tag);
        }
        $state.current.reloadOnSearch = false;
        $state.transitionTo("home", {
          notify: false,
          location: "replace",
          reload: false,
          inherit: false,
          'tags': this.selectedTags.join(',')
        });
        return $state.current.reloadOnSearch = void 0;
      },
      getClass: function(tag) {
        var num;
        num = tag.length;
        if (num % 6 === 0) {
          return "five";
        }
        if (num % 7 === 0) {
          return "one";
        }
        if (num % 3 === 0) {
          return "three";
        }
        if (num % 5 === 0) {
          return "four";
        }
        if (num % 2 === 0) {
          return "two";
        }
        return "five";
      }
    };
    return obj;
  });

}).call(this);

(function() {
  angular.module("app").controller("LoginCtrl", function($state, AuthService) {
    console.log("LOGINCTRL", AuthService);
    this.user = {
      email: null,
      password: null
    };
    this.login = function() {
      console.log("loginctrl.login", this.user);
      return AuthService.login(this.user).then(function() {
        return $state.go('home');
      })["catch"](function() {
        return $state.go('login');
      });
    };
    this.goToSignupPage = function() {
      console.log("goToSignupPage");
      return $state.go('signup');
    };
  });

}).call(this);

(function() {
  angular.module("app").controller("MainCtrl", function($stateParams, QuoteService) {});

}).call(this);

(function() {
  angular.module("app").controller("QuotesCtrl", function($scope, $stateParams, $window, QuoteService, $modal, TagService, $http) {
    var getQuotes;
    getQuotes = (function(_this) {
      return function() {
        var ref, tags;
        tags = (ref = $stateParams.tags) != null ? ref.split(',') : void 0;
        return _this.quotes = QuoteService.filterByTags(tags);
      };
    })(this);
    getQuotes();
    $scope.$on('$locationChangeSuccess', function() {
      return getQuotes();
    });
    $scope.$watch(function() {
      return QuoteService.filterText;
    }, (function(_this) {
      return function() {
        return _this.filterText = QuoteService.filterText;
      };
    })(this));
    this.viewQuote = function(quote) {
      var modalInstance;
      QuoteService.selectedQuote = quote;
      modalInstance = $modal.open({
        animation: false,
        templateUrl: 'quotes/view.quote.tpl.jade',
        controller: 'SingleQuoteCtrl',
        size: 10
      });
      return modalInstance.result.then(function(selectedItem) {
        return $scope.selected = selectedItem;
      }, function() {
        return console.log('Modal dismissed at: ' + new Date());
      });
    };
    this.openDeleteModal = function(quote) {
      var modalInstance;
      modalInstance = $modal.open({
        animation: false,
        template: "<div>DELETE</div>\n<div>\n  <button class=\"btn btn-primary\" ng-click=\"$scope.deleteQuote(quote)\">\n   YES\n  </button>\n  <button class=\"btn btn-default\">\n   NO\n  </button>",
        size: 10
      });
      return modalInstance.result.then(function(selectedItem) {
        return $scope.selected = selectedItem;
      }, function() {
        return console.log('Modal dismissed at: ' + new Date());
      });
    };
    this.deleteQuote = function(quote) {
      var remove;
      remove = confirm("Delete?");
      if (remove) {
        return $http.post("/quotes/" + quote._id).then(function() {
          return $window.location.reload();
        });
      } else {

      }
    };
    this.getClass = function(quote) {
      var date, s;
      date = new Date(quote.created_at);
      s = date.getTime();
      if (s % 6 === 0) {
        return "five";
      }
      if (s % 7 === 0) {
        return "one";
      }
      if (s % 3 === 0) {
        return "three";
      }
      if (s % 5 === 0) {
        return "four";
      }
      if (s % 2 === 0) {
        return "two";
      }
      return "five";
    };
  }).controller('SingleQuoteCtrl', function($scope, QuoteService) {
    this.quote = QuoteService.selectedQuote;
    this.updateQuote = function(field, update) {
      var changes;
      changes = {
        id: this.quote._id,
        field: field,
        update: update
      };
      return QuoteService.updateQuote(changes);
    };
    return;
  });

}).call(this);

(function() {
  angular.module("app").controller("SignupCtrl", function($state, AuthService, $http) {
    var generateHash, superSecretHash;
    generateHash = function() {
      var uuid;
      uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r, v;
        r = Math.random() * 16 | 0;
        v = c === 'x' ? r : r & 0x3 | 0x8;
        return v.toString(16);
      });
      return uuid;
    };
    superSecretHash = generateHash();
    this.user = {
      email: null,
      password: null,
      verified: false,
      supersecrethash: superSecretHash
    };
    this.goToLoginPage = function() {
      return $state.go('login');
    };
    this.signupUser = function() {
      var hash;
      hash = generateHash();
      return $http.post('/users/new', this.user).success(function(user) {
        console.log("user created!");
        return user;
      }).error(function(e) {
        return console.log("error creating user");
      });
    };
    this.sendConfirmationEmail = function() {
      return this.signupUser().then(function(obj) {
        var user;
        console.log("front end, signupUser", obj.data.user);
        user = obj.data.user;
        return $http.post('/email-verification', {
          supersecrethash: user.supersecrethash,
          email: user.email
        }).success(function(data) {
          return console.log("sendConfirmationEmail : getting back somehting?", data);
        }).error(function(e) {
          return console.log("sendConfirmationEmail error", e);
        });
      });
    };
  });

}).call(this);

(function() {
  angular.module('app').controller("TagsCtrl", function($stateParams, $state, $scope, TagService, QuoteService) {
    var tagIndex;
    this.allTags = QuoteService.tags;
    TagService.selectedTags = $stateParams.tags ? $stateParams.tags.split(',') : [];
    this.searchTags = TagService.selectedTags;
    tagIndex = null;
    $scope.$watch(function() {
      return TagService.selectedTags;
    }, (function(_this) {
      return function() {
        return _this.searchTags = TagService.selectedTags;
      };
    })(this));
    this.clearTags = function() {
      TagService.selectedTags = [];
      return $stateParams.tags = null;
    };
    this.updateWithTag = function(tag) {
      TagService.updateWithTag(tag);
      return QuoteService.filterText = TagService.selectedTags.join(' ');
    };
    this.tagSelected = function(tag) {
      tagIndex = _.indexOf(this.searchTags, tag);
      return tagIndex > -1;
    };
  });

}).call(this);
