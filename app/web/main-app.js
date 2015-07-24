(function() {
  angular.module('app', ['ui.router', 'templates-app', 'restangular']).config(function($stateProvider, $urlRouterProvider) {
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
    });
  }).run(function($rootScope, GuardService) {
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
      controller: function(QuoteService) {
        this.searchval = null;
        this.filterByText = function() {
          return QuoteService.filterText = this.searchval;
        };
      }
    };
  });

}).call(this);

(function() {
  angular.module("app").service("QuoteService", function(Restangular) {
    var obj, quoteApi;
    quoteApi = Restangular.all('quotes');
    obj = {
      quotes: [],
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
      },
      filterText: ""
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
  });

}).call(this);

(function() {
  angular.module("app").controller("MainCtrl", function($stateParams, QuoteService) {});

}).call(this);

(function() {
  angular.module("app").controller("QuotesCtrl", function($scope, $stateParams, QuoteService) {
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
  });

}).call(this);

(function() {
  angular.module('app').controller("TagsCtrl", function($stateParams, $state, $scope, QuoteService) {
    var tagIndex;
    this.allTags = QuoteService.tags;
    this.searchTags = $stateParams.tags ? $stateParams.tags.split(',') : [];
    tagIndex = null;
    this.clearTags = function() {
      this.searchTags = [];
      return $stateParams.tags = null;
    };
    this.updateWithTag = function(tag) {
      var selected;
      selected = this.tagSelected(tag);
      if (selected) {
        this.searchTags.splice(tagIndex, 1);
      } else {
        this.searchTags.push(tag);
      }
      $state.current.reloadOnSearch = false;
      $state.transitionTo("home", {
        notify: false,
        location: "replace",
        reload: false,
        inherit: false,
        'tags': this.searchTags.join(',')
      });
      return $state.current.reloadOnSearch = void 0;
    };
    this.tagSelected = function(tag) {
      tagIndex = _.indexOf(this.searchTags, tag);
      return tagIndex > -1;
    };
  });

}).call(this);
