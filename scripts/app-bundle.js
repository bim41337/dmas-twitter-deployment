define('admin',['exports', 'aurelia-framework', './services/tweeter-service'], function (exports, _aureliaFramework, _tweeterService) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Admin = undefined;

  var _tweeterService2 = _interopRequireDefault(_tweeterService);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var Admin = exports.Admin = (_dec = (0, _aureliaFramework.inject)(_aureliaFramework.Aurelia, _tweeterService2.default), _dec(_class = function () {
    function Admin(au, ts) {
      _classCallCheck(this, Admin);

      this.aurelia = au;
      this.service = ts;
    }

    Admin.prototype.configureRouter = function configureRouter(config, router) {
      config.map([{
        route: ['', 'stats'],
        name: 'adm-stats',
        moduleId: 'viewmodels/admin/stats/stats',
        nav: true,
        title: 'Statistics',
        settings: { root: true }
      }, {
        route: 'users',
        name: 'adm-users',
        moduleId: 'viewmodels/admin/users/users',
        nav: true,
        title: 'Manage Users',
        settings: { root: true }
      }, {
        route: 'tweets',
        name: 'adm-tweets',
        moduleId: 'viewmodels/admin/tweets/tweets',
        nav: true,
        title: 'Manage Tweets',
        settings: { root: true }
      }, {
        route: 'logout',
        name: 'adm-logout',
        moduleId: 'viewmodels/logout/logout',
        nav: true,
        title: 'Logout',
        settings: { root: true }
      }]);
      this.router = router;

      config.mapUnknownRoutes('stats');
    };

    return Admin;
  }()) || _class);
});
define('app',['exports', 'aurelia-framework', 'aurelia-event-aggregator', './services/messages', './services/tweeter-service'], function (exports, _aureliaFramework, _aureliaEventAggregator, _messages, _tweeterService) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.App = undefined;

  var _tweeterService2 = _interopRequireDefault(_tweeterService);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var App = exports.App = (_dec = (0, _aureliaFramework.inject)(_aureliaFramework.Aurelia, _tweeterService2.default, _aureliaEventAggregator.EventAggregator), _dec(_class = function () {
    function App(au, ts, ea) {
      var _this = this;

      _classCallCheck(this, App);

      this.au = au;
      this.service = ts;

      ea.subscribe(_messages.LoginStatus, function (msg) {
        _this.router.reset();
        _this.router.navigate('', { replace: true, trigger: false });
        if (msg.status.success === true) {
          au.setRoot(msg.isAdmin ? 'admin' : 'home');
        } else {
          au.setRoot('app');
        }
      });
    }

    App.prototype.attached = function attached() {
      var _this2 = this;

      if (this.service.isAuthenticated()) {
        var userId = JSON.parse(localStorage.tweeter).userId;
        this.service.getUserData(userId);
        this.au.setRoot('home').then(function () {
          _this2.router.navigateToRoute('yourtweets');
        });
      }
    };

    App.prototype.configureRouter = function configureRouter(config, router) {
      config.map([{
        route: ['', 'welcome'],
        name: 'home',
        moduleId: 'viewmodels/welcome/welcome',
        nav: true,
        title: 'Welcome',
        settings: { root: true }
      }, {
        route: 'login',
        name: 'login',
        moduleId: 'viewmodels/login/login',
        nav: true,
        title: 'Login',
        settings: { root: true }
      }, {
        route: 'signup',
        name: 'signup',
        moduleId: 'viewmodels/signup/signup',
        nav: true,
        title: 'Signup',
        settings: { root: true }
      }, {
        route: 'adm-login',
        name: 'adm-login',
        moduleId: 'viewmodels/admin/login/login',
        nav: false,
        title: 'Administration login',
        settings: { root: false }
      }]);
      this.router = router;

      config.mapUnknownRoutes('');
    };

    return App;
  }()) || _class);
});
define('environment',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    debug: true,
    testing: true
  };
});
define('home',['exports', 'aurelia-framework', './services/tweeter-service'], function (exports, _aureliaFramework, _tweeterService) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Home = undefined;

  var _tweeterService2 = _interopRequireDefault(_tweeterService);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var Home = exports.Home = (_dec = (0, _aureliaFramework.inject)(_aureliaFramework.Aurelia, _tweeterService2.default), _dec(_class = function () {
    function Home(au, ts) {
      _classCallCheck(this, Home);

      this.aurelia = au;
      this.service = ts;
    }

    Home.prototype.configureRouter = function configureRouter(config, router) {
      config.map([{
        route: 'settings',
        name: 'settings',
        moduleId: 'viewmodels/settings/settings',
        nav: true,
        title: 'Settings',
        settings: { root: true }
      }, {
        route: 'logout',
        name: 'logout',
        moduleId: 'viewmodels/logout/logout',
        nav: true,
        title: 'Logout',
        settings: { root: true }
      }, {
        route: ['', 'home', 'wall'],
        name: 'yourtweets',
        moduleId: 'viewmodels/wall/wall',
        nav: true,
        title: 'Your tweets',
        settings: { root: false }
      }, {
        route: 'followings',
        name: 'followings',
        moduleId: 'viewmodels/followings/followings',
        nav: true,
        title: 'Followings',
        settings: { root: false }
      }, {
        route: 'firehose',
        name: 'firehose',
        moduleId: 'viewmodels/firehose/firehose',
        nav: true,
        title: 'Firehose',
        settings: { root: false }
      }, {
        route: 'browse-users',
        name: 'browse-users',
        moduleId: 'viewmodels/browse-users/browse-users',
        nav: true,
        title: 'Browse Users',
        settings: { root: false }
      }, {
        route: 'view-user',
        name: 'view-user',
        moduleId: 'viewmodels/view-user/view-user',
        nav: false,
        title: 'View User Timeline',
        settings: { root: false }
      }]);
      this.router = router;

      config.mapUnknownRoutes('home');
    };

    return Home;
  }()) || _class);
});
define('main',['exports', './environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;

  var _environment2 = _interopRequireDefault(_environment);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function configure(aurelia) {
    aurelia.use.standardConfiguration().plugin('aurelia-validation').feature('resources');

    if (_environment2.default.debug) {
      aurelia.use.developmentLogging();
    }

    if (_environment2.default.testing) {
      aurelia.use.plugin('aurelia-testing');
    }

    aurelia.start().then(function () {
      return aurelia.setRoot();
    });
  }
});
define('filters/child-item-filter',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var ChildItemFilterValueConverter = exports.ChildItemFilterValueConverter = function () {
    function ChildItemFilterValueConverter() {
      _classCallCheck(this, ChildItemFilterValueConverter);
    }

    ChildItemFilterValueConverter.prototype.toView = function toView(array) {
      return array.filter(function (item) {
        return item.settings.root === false;
      });
    };

    return ChildItemFilterValueConverter;
  }();
});
define('filters/root-item-filter',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var RootItemFilterValueConverter = exports.RootItemFilterValueConverter = function () {
    function RootItemFilterValueConverter() {
      _classCallCheck(this, RootItemFilterValueConverter);
    }

    RootItemFilterValueConverter.prototype.toView = function toView(array) {
      return array.filter(function (item) {
        return item.settings.root === true;
      });
    };

    return RootItemFilterValueConverter;
  }();
});
define('helpers/blob-to-url',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var BlobToUrlValueConverter = exports.BlobToUrlValueConverter = function () {
    function BlobToUrlValueConverter() {
      _classCallCheck(this, BlobToUrlValueConverter);
    }

    BlobToUrlValueConverter.prototype.toView = function toView(blob) {
      return URL.createObjectURL(blob);
    };

    return BlobToUrlValueConverter;
  }();
});
define('helpers/data-uri',['exports', 'buffer'], function (exports, _buffer) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.DataUriValueConverter = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var DataUriValueConverter = exports.DataUriValueConverter = function () {
    function DataUriValueConverter() {
      _classCallCheck(this, DataUriValueConverter);
    }

    DataUriValueConverter.prototype.toView = function toView(value) {
      var imgString = _buffer.Buffer.from(value.data).toString('base64');
      return 'data:image/jpeg;base64,' + imgString;
    };

    return DataUriValueConverter;
  }();
});
define('helpers/date-format',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var DateFormatValueConverter = exports.DateFormatValueConverter = function () {
    function DateFormatValueConverter() {
      _classCallCheck(this, DateFormatValueConverter);
    }

    DateFormatValueConverter.prototype.toView = function toView(value) {
      var dateValue = new Date(value);
      return dateValue.toLocaleString('en-GB');
    };

    return DateFormatValueConverter;
  }();
});
define('helpers/file-list-to-array',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var FileListToArrayValueConverter = exports.FileListToArrayValueConverter = function () {
    function FileListToArrayValueConverter() {
      _classCallCheck(this, FileListToArrayValueConverter);
    }

    FileListToArrayValueConverter.prototype.toView = function toView(fileList) {
      var files = [];
      if (!fileList) {
        return files;
      }
      for (var _iterator = fileList, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
        var _ref;

        if (_isArray) {
          if (_i >= _iterator.length) break;
          _ref = _iterator[_i++];
        } else {
          _i = _iterator.next();
          if (_i.done) break;
          _ref = _i.value;
        }

        var file = _ref;

        if (file.size <= 524288) {
          files.push(fileList.item(file));
        }
      }
      return files;
    };

    return FileListToArrayValueConverter;
  }();
});
define('resources/index',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;
  function configure(config) {}
});
define('services/async-http-client',['exports', 'aurelia-framework', 'aurelia-http-client', './fixtures', 'aurelia-event-aggregator', './messages'], function (exports, _aureliaFramework, _aureliaHttpClient, _fixtures, _aureliaEventAggregator, _messages) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;

  var _fixtures2 = _interopRequireDefault(_fixtures);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var AsyncHttpClient = (_dec = (0, _aureliaFramework.inject)(_aureliaHttpClient.HttpClient, _fixtures2.default, _aureliaEventAggregator.EventAggregator), _dec(_class = function () {
    function AsyncHttpClient(httpClient, fixtures, ea) {
      _classCallCheck(this, AsyncHttpClient);

      this.http = httpClient;
      this.http.configure(function (http) {
        http.withBaseUrl(fixtures.baseUrl);
      });
      this.evtAgg = ea;
    }

    AsyncHttpClient.prototype.authenticate = function authenticate(url, user, isAdmin) {
      var _this = this;

      return this.http.post(url, user).then(function (response) {
        var status = response.content;
        if (status.success) {
          localStorage.tweeter = JSON.stringify(response.content);
          _this.http.configure(function (configuration) {
            configuration.withHeader('Authorization', 'bearer ' + response.content.token);
          });
        }
        _this.evtAgg.publish(new _messages.LoginStatus(status, isAdmin));

        return response.content.userId;
      }).catch(function (error) {
        var status = {
          success: false,
          message: 'service not available'
        };
        _this.evtAgg.publish(new _messages.LoginStatus(status));
      });
    };

    AsyncHttpClient.prototype.clearAuthentication = function clearAuthentication() {
      localStorage.tweeter = null;
      this.http.configure(function (configuration) {
        configuration.withHeader('Authorization', '');
      });
    };

    AsyncHttpClient.prototype.isAuthenticated = function isAuthenticated() {
      var authenticated = false;
      var tweeter = localStorage.tweeter;

      if (tweeter !== undefined && tweeter !== 'null') {
        authenticated = true;
        this.http.configure(function (http) {
          var auth = JSON.parse(tweeter);
          http.withHeader('Authorization', 'bearer ' + auth.token);
        });
      }
      return authenticated;
    };

    AsyncHttpClient.prototype.get = function get(url) {
      return this.http.get(url);
    };

    AsyncHttpClient.prototype.post = function post(url, obj) {
      return this.http.post(url, obj);
    };

    AsyncHttpClient.prototype.put = function put(url, obj) {
      return this.http.put(url, obj);
    };

    AsyncHttpClient.prototype.delete = function _delete(url) {
      return this.http.delete(url);
    };

    return AsyncHttpClient;
  }()) || _class);
  exports.default = AsyncHttpClient;
});
define('services/fixtures',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var Fixtures = function Fixtures() {
    _classCallCheck(this, Fixtures);

    this.baseUrl = 'https://tweeter-bim41337.herokuapp.com';
  };

  exports.default = Fixtures;
});
define('services/messages',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var LoginStatus = exports.LoginStatus = function LoginStatus(status, isAdmin) {
    _classCallCheck(this, LoginStatus);

    this.status = status;
    this.isAdmin = isAdmin;
  };

  var UserUpdate = exports.UserUpdate = function UserUpdate(changedUser) {
    _classCallCheck(this, UserUpdate);

    this.changedUser = changedUser;
  };

  var ViewUserUpdate = exports.ViewUserUpdate = function ViewUserUpdate(userData) {
    _classCallCheck(this, ViewUserUpdate);

    this.userData = userData;
  };

  var BrowseUsersUpdate = exports.BrowseUsersUpdate = function BrowseUsersUpdate() {
    _classCallCheck(this, BrowseUsersUpdate);
  };

  var TweetUpdate = exports.TweetUpdate = function TweetUpdate(section, tweets) {
    _classCallCheck(this, TweetUpdate);

    this.tweetSection = section;
    this.tweets = tweets;
  };

  var FollowingsUpdate = exports.FollowingsUpdate = function FollowingsUpdate() {
    _classCallCheck(this, FollowingsUpdate);
  };

  var AdministrationAction = exports.AdministrationAction = function AdministrationAction(section) {
    _classCallCheck(this, AdministrationAction);

    this.USER_ACTION = 'user';
    this.TWEET_ACTION = 'tweet';

    this.section = section;
  };
});
define('services/tweeter-service',['exports', 'aurelia-framework', 'aurelia-router', 'aurelia-event-aggregator', './async-http-client', './messages'], function (exports, _aureliaFramework, _aureliaRouter, _aureliaEventAggregator, _asyncHttpClient, _messages) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;

  var _asyncHttpClient2 = _interopRequireDefault(_asyncHttpClient);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var TweeterService = (_dec = (0, _aureliaFramework.inject)(_aureliaEventAggregator.EventAggregator, _asyncHttpClient2.default, _aureliaRouter.Router), _dec(_class = function () {
    function TweeterService(ea, ac, rt) {
      _classCallCheck(this, TweeterService);

      this.USER_LABEL = 'user';
      this.TWEETS_LABEL = 'tweets';
      this.FIREHOSE_LABEL = 'firehose';
      this.FOLLOWINGS_LABEL = 'followings';
      this.userData = null;
      this.userTweets = [];
      this.browseUsers = [];
      this.followingsUsers = [];
      this.followingsTweets = [];
      this.firehoseTweets = [];
      this.viewUserId = null;

      this.evtAgg = ea;
      this.httpClient = ac;
      this.router = rt;
    }

    TweeterService.prototype.makeTweet = function makeTweet(formData) {
      var _this = this;

      this.httpClient.post('/api/tweets', formData).then(function (res) {
        _this.getUserTweets();
      });
    };

    TweeterService.prototype.removeTweet = function removeTweet(tweetId) {
      return this.httpClient.delete('/api/tweets/' + tweetId);
    };

    TweeterService.prototype.register = function register(nickname, email, password) {
      var _this2 = this;

      var newUser = {
        nickname: nickname,
        email: email,
        password: password,
        followings: []
      };
      this.httpClient.post('/api/users', newUser).then(function (res) {
        console.log(res);
        _this2.router.navigate('login');
      });
    };

    TweeterService.prototype.getViewUserData = function getViewUserData(userId) {
      var _this3 = this;

      this.httpClient.get('/api/users/' + userId).then(function (res) {
        _this3.evtAgg.publish(new _messages.ViewUserUpdate(res.content));
      });
    };

    TweeterService.prototype.getUserData = function getUserData(userId, publish, withoutFetch) {
      var _this4 = this;

      this.httpClient.get('/api/users/' + userId).then(function (res) {
        console.log('Set active user: ' + res.content.user.nickname);
        _this4.userData = res.content.user;
        if (publish === true) {
          _this4.evtAgg.publish(new _messages.UserUpdate(_this4.userData.user));
        }
        if (!withoutFetch) {
          _this4.getUserTweets();
        }
      });
    };

    TweeterService.prototype.getBrowseUsers = function getBrowseUsers() {
      var _this5 = this;

      console.log('TS: Fetching users for browsing');
      this.httpClient.get('/api/users').then(function (res) {
        _this5.browseUsers = res.content.filter(function (usr) {
          return usr._id !== _this5.userData._id;
        });
        _this5.evtAgg.publish(new _messages.BrowseUsersUpdate());
      });
    };

    TweeterService.prototype.getTweets = function getTweets(userId) {
      var _this6 = this;

      console.log('TS: Fetching tweets');
      this.httpClient.get('/api/tweets/user/' + userId).then(function (res) {
        _this6.evtAgg.publish(new _messages.TweetUpdate(_this6.TWEETS_LABEL, res.content));
      });
    };

    TweeterService.prototype.getUserTweets = function getUserTweets() {
      var _this7 = this;

      console.log('TS: Fetching user tweets');
      this.httpClient.get('/api/tweets/user/' + this.userData._id).then(function (res) {
        _this7.userTweets = res.content;
        _this7.evtAgg.publish(new _messages.TweetUpdate(_this7.USER_LABEL));
      });
    };

    TweeterService.prototype.getFollowingsUsers = function getFollowingsUsers() {
      var _this8 = this;

      console.log('TS: Fetching followings users');
      this.httpClient.get('/api/users/' + this.userData._id + '/followings').then(function (res) {
        _this8.followingsUsers = res.content;
        _this8.evtAgg.publish(new _messages.FollowingsUpdate());
      });
    };

    TweeterService.prototype.getFollowingsTweets = function getFollowingsTweets() {
      var _this9 = this;

      console.log('TS: Fetching followings tweets');
      this.httpClient.get('/api/tweets/user/' + this.userData._id + '/followings').then(function (res) {
        _this9.followingsTweets = res.content;
        _this9.evtAgg.publish(new _messages.TweetUpdate(_this9.FOLLOWINGS_LABEL));
      });
    };

    TweeterService.prototype.addFollowing = function addFollowing() {
      var _this10 = this;

      console.log('TS: Adding following entry');
      this.httpClient.post('/api/users/' + this.userData._id + '/followings', { follId: this.viewUserId }).then(function (res) {
        _this10.router.navigate('followings');
      });
    };

    TweeterService.prototype.removeFollowing = function removeFollowing() {
      var _this11 = this;

      console.log('TS: Removing following entry');
      this.httpClient.put('/api/users/' + this.userData._id + '/followings', { follId: this.viewUserId }).then(function (res) {
        _this11.router.navigate('followings');
      });
    };

    TweeterService.prototype.getFirehoseTweets = function getFirehoseTweets() {
      var _this12 = this;

      console.log('TS: Fetching firehose tweets');
      this.httpClient.get('/api/tweets').then(function (res) {
        _this12.firehoseTweets = res.content;
        _this12.evtAgg.publish(new _messages.TweetUpdate(_this12.FIREHOSE_LABEL));
      });
    };

    TweeterService.prototype.changeUserData = function changeUserData(changedUser) {
      var _this13 = this;

      this.httpClient.put('/api/users/' + this.userData._id, changedUser).then(function (res) {
        _this13.userData = res.content;
        _this13.evtAgg.publish(new _messages.UserUpdate(_this13.userData));
        _this13.router.navigate('wall');
      });
    };

    TweeterService.prototype.viewUser = function viewUser(userId) {
      this.viewUserId = userId;
      this.router.navigate('view-user');
    };

    TweeterService.prototype.getAllUsers = function getAllUsers() {
      console.log('TS: Fetching all users for administration');
      return this.httpClient.get('/api/users');
    };

    TweeterService.prototype.getAllTweets = function getAllTweets() {
      console.log('TS: Fetching all tweets for administration');
      return this.httpClient.get('/api/tweets');
    };

    TweeterService.prototype.removeUser = function removeUser(userId) {
      return this.httpClient.delete('/api/users/' + userId);
    };

    TweeterService.prototype.removeAllTweetsForUser = function removeAllTweetsForUser(userId) {
      return this.httpClient.delete('/api/tweets/user/' + userId);
    };

    TweeterService.prototype.getUserStats = function getUserStats() {
      return this.httpClient.get('/api/stats/users');
    };

    TweeterService.prototype.getTweetsStats = function getTweetsStats() {
      return this.httpClient.get('/api/stats/tweets');
    };

    TweeterService.prototype.getConnectionsStats = function getConnectionsStats() {
      return this.httpClient.get('/api/stats/connections');
    };

    TweeterService.prototype.login = function login(email, password) {
      var _this14 = this;

      var user = {
        email: email,
        password: password
      };
      this.httpClient.authenticate('/api/users/authenticate', user).then(function (res) {
        if (res) {
          _this14.getUserData(res, true);
        }
      });
    };

    TweeterService.prototype.admLogin = function admLogin(email, password) {
      var _this15 = this;

      var user = {
        email: email,
        password: password
      };
      this.httpClient.authenticate('/api/users/authenticate', user, true).then(function (res) {
        if (res) {
          _this15.getUserData(res, false, true);
        }
      });
    };

    TweeterService.prototype.logout = function logout() {
      var status = {
        success: false,
        message: ''
      };
      this.httpClient.clearAuthentication();
      this.userData = null;
      this.evtAgg.publish(new _messages.LoginStatus(status));
    };

    TweeterService.prototype.isAuthenticated = function isAuthenticated() {
      return this.httpClient.isAuthenticated();
    };

    return TweeterService;
  }()) || _class);
  exports.default = TweeterService;
});
define('viewmodels/firehose/firehose',['exports', 'aurelia-framework', 'aurelia-event-aggregator', './../../services/tweeter-service', '../../services/messages'], function (exports, _aureliaFramework, _aureliaEventAggregator, _tweeterService, _messages) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Firehose = undefined;

  var _tweeterService2 = _interopRequireDefault(_tweeterService);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var Firehose = exports.Firehose = (_dec = (0, _aureliaFramework.inject)(_tweeterService2.default, _aureliaEventAggregator.EventAggregator), _dec(_class = function () {
    function Firehose(ts, ea) {
      var _this = this;

      _classCallCheck(this, Firehose);

      this.firehoseTweets = [];

      this.service = ts;
      this.evtAgg = ea;

      this.evtAgg.subscribe(_messages.TweetUpdate, function (msg) {
        if (msg.tweetSection === _this.service.FIREHOSE_LABEL) {
          _this.firehoseTweets = _this.service.firehoseTweets;
        }
      });
    }

    Firehose.prototype.attached = function attached() {
      this.refreshFirehose();
    };

    Firehose.prototype.refreshFirehose = function refreshFirehose() {
      this.service.getFirehoseTweets();
    };

    return Firehose;
  }()) || _class);
});
define('viewmodels/browse-users/browse-users',['exports', 'aurelia-framework', 'aurelia-event-aggregator', '../../services/tweeter-service', '../../services/messages'], function (exports, _aureliaFramework, _aureliaEventAggregator, _tweeterService, _messages) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.BrowseUsers = undefined;

  var _tweeterService2 = _interopRequireDefault(_tweeterService);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var BrowseUsers = exports.BrowseUsers = (_dec = (0, _aureliaFramework.inject)(_tweeterService2.default, _aureliaEventAggregator.EventAggregator), _dec(_class = function () {
    function BrowseUsers(ts, ea) {
      var _this = this;

      _classCallCheck(this, BrowseUsers);

      this.users = [];

      this.service = ts;
      this.evtAgg = ea;

      this.evtAgg.subscribe(_messages.BrowseUsersUpdate, function (msg) {
        _this.users = _this.service.browseUsers;
      });
    }

    BrowseUsers.prototype.attached = function attached() {
      this.service.getBrowseUsers();
    };

    BrowseUsers.prototype.viewUser = function viewUser(userId) {
      this.service.viewUser(userId);
    };

    BrowseUsers.prototype.refreshUsers = function refreshUsers() {
      this.service.getBrowseUsers();
    };

    return BrowseUsers;
  }()) || _class);
});
define('viewmodels/followings/followings',['exports', 'aurelia-framework', 'aurelia-event-aggregator', './../../services/tweeter-service', '../../services/messages'], function (exports, _aureliaFramework, _aureliaEventAggregator, _tweeterService, _messages) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Followings = undefined;

  var _tweeterService2 = _interopRequireDefault(_tweeterService);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var Followings = exports.Followings = (_dec = (0, _aureliaFramework.inject)(_tweeterService2.default, _aureliaEventAggregator.EventAggregator), _dec(_class = function () {
    function Followings(ts, ea) {
      var _this = this;

      _classCallCheck(this, Followings);

      this.followingsUsers = [];
      this.followingsTweets = [];

      this.service = ts;
      this.evtAgg = ea;

      this.evtAgg.subscribe(_messages.TweetUpdate, function (msg) {
        if (msg.tweetSection === _this.service.FOLLOWINGS_LABEL) {
          _this.followingsTweets = _this.service.followingsTweets;
        }
      });
      this.evtAgg.subscribe(_messages.FollowingsUpdate, function (msg) {
        _this.followingsUsers = _this.service.followingsUsers;
      });
    }

    Followings.prototype.viewUser = function viewUser(userId) {
      this.service.viewUser(userId);
    };

    Followings.prototype.attached = function attached() {
      this.refreshFollowings();
    };

    Followings.prototype.refreshFollowings = function refreshFollowings() {
      this.service.getFollowingsUsers();
      this.service.getFollowingsTweets();
    };

    return Followings;
  }()) || _class);
});
define('viewmodels/login/login',['exports', 'aurelia-framework', 'aurelia-event-aggregator', 'aurelia-validation', '../../services/tweeter-service', '../../services/messages'], function (exports, _aureliaFramework, _aureliaEventAggregator, _aureliaValidation, _tweeterService, _messages) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Login = undefined;

  var _tweeterService2 = _interopRequireDefault(_tweeterService);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var Login = exports.Login = (_dec = (0, _aureliaFramework.inject)(_tweeterService2.default, _aureliaEventAggregator.EventAggregator, _aureliaValidation.ValidationControllerFactory), _dec(_class = function () {
    function Login(ts, ea, vcf) {
      var _this = this;

      _classCallCheck(this, Login);

      this.email = '';
      this.password = '';

      this.service = ts;
      this.evtAgr = ea;
      this.valContr = vcf.createForCurrentScope();
      this.valContr.validateTrigger = _aureliaValidation.validateTrigger.change;

      this.evtAgr.subscribe(_messages.LoginStatus, function (msg) {
        if (!msg.status.success) {
          _this.valContr.addError(msg.status.message);
        }
      });
    }

    Login.prototype.login = function login(e) {
      var _this2 = this;

      this.valContr.validate().then(function (result) {
        if (result.valid) {
          console.log('Logging in: ' + _this2.email);
          _this2.valContr.reset();
          _this2.service.login(_this2.email, _this2.password);
        }
      });
    };

    return Login;
  }()) || _class);


  _aureliaValidation.ValidationRules.ensure('email').email().required().ensure('password').required().on(Login);
});
define('viewmodels/logout/logout',['exports', 'aurelia-framework', './../../services/tweeter-service'], function (exports, _aureliaFramework, _tweeterService) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Logout = undefined;

  var _tweeterService2 = _interopRequireDefault(_tweeterService);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var Logout = exports.Logout = (_dec = (0, _aureliaFramework.inject)(_tweeterService2.default), _dec(_class = function () {
    function Logout(ts) {
      _classCallCheck(this, Logout);

      this.service = ts;
    }

    Logout.prototype.logout = function logout() {
      console.log('Logging out');
      this.service.logout();
    };

    return Logout;
  }()) || _class);
});
define('viewmodels/signup/signup',['exports', 'aurelia-framework', '../../services/tweeter-service', 'aurelia-validation'], function (exports, _aureliaFramework, _tweeterService, _aureliaValidation) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Signup = undefined;

  var _tweeterService2 = _interopRequireDefault(_tweeterService);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var Signup = exports.Signup = (_dec = (0, _aureliaFramework.inject)(_tweeterService2.default, _aureliaValidation.ValidationControllerFactory), _dec(_class = function () {
    function Signup(ts, vcf) {
      _classCallCheck(this, Signup);

      this.nickname = '';
      this.email = '';
      this.password = '';

      this.service = ts;
      this.valContr = vcf.createForCurrentScope();
      this.valContr.validateTrigger = _aureliaValidation.validateTrigger.change;
    }

    Signup.prototype.register = function register(e) {
      var _this = this;

      this.valContr.validate().then(function (result) {
        if (result.valid) {
          console.log('New registration: ' + _this.email);
          _this.service.register(_this.nickname, _this.email, _this.password);
        }
      });
    };

    return Signup;
  }()) || _class);


  _aureliaValidation.ValidationRules.ensure('nickname').required().ensure('email').email().required().ensure('password').required().on(Signup);
});
define('viewmodels/settings/settings',['exports', 'aurelia-framework', 'aurelia-event-aggregator', 'aurelia-validation', '../../services/tweeter-service', '../../services/messages'], function (exports, _aureliaFramework, _aureliaEventAggregator, _aureliaValidation, _tweeterService, _messages) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Settings = undefined;

  var _tweeterService2 = _interopRequireDefault(_tweeterService);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var Settings = exports.Settings = (_dec = (0, _aureliaFramework.inject)(_tweeterService2.default, _aureliaEventAggregator.EventAggregator, _aureliaValidation.ValidationControllerFactory), _dec(_class = function () {
    function Settings(ts, ea, vcf) {
      var _this = this;

      _classCallCheck(this, Settings);

      this.userData = null;

      this.service = ts;
      this.evtAgg = ea;
      this.valContr = vcf.createForCurrentScope();
      this.valContr.validateTrigger = _aureliaValidation.validateTrigger.change;

      this.evtAgg.subscribe(_messages.UserUpdate, function (msg) {
        _this.userData = msg.changedUser;
      });
    }

    Settings.prototype.attached = function attached() {
      this.userData = this.service.userData;
    };

    Settings.prototype.changeSettings = function changeSettings(e) {
      var _this2 = this;

      this.valContr.validate().then(function (result) {
        if (result.valid) {
          _this2.valContr.reset();
          _this2.service.changeUserData(_this2.userData);
        }
      });
    };

    return Settings;
  }()) || _class);


  _aureliaValidation.ValidationRules.ensure('userData.nickname').required().ensure('userData.email').email().required().ensure('userData.password').required().on(Settings);
});
define('viewmodels/view-user/view-user',['exports', 'aurelia-framework', 'aurelia-event-aggregator', './../../services/tweeter-service', '../../services/messages'], function (exports, _aureliaFramework, _aureliaEventAggregator, _tweeterService, _messages) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.ViewUser = undefined;

  var _tweeterService2 = _interopRequireDefault(_tweeterService);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var ViewUser = exports.ViewUser = (_dec = (0, _aureliaFramework.inject)(_tweeterService2.default, _aureliaEventAggregator.EventAggregator), _dec(_class = function () {
    function ViewUser(ts, ea) {
      var _this = this;

      _classCallCheck(this, ViewUser);

      this.viewUser = null;
      this.viewUserTweets = [];
      this.viewUserFollowingsCount = 0;
      this.isFollowedUser = undefined;

      this.service = ts;
      this.evtAgg = ea;

      this.evtAgg.subscribe(_messages.TweetUpdate, function (msg) {
        if (msg.tweetSection === _this.service.TWEETS_LABEL) {
          _this.viewUserTweets = msg.tweets;
        }
      });
      this.evtAgg.subscribe(_messages.ViewUserUpdate, function (msg) {
        _this.viewUser = msg.userData.user;
        _this.viewUserFollowingsCount = msg.userData.followersCount;
      });
    }

    ViewUser.prototype.calcFollowedUser = function calcFollowedUser() {
      var _this2 = this;

      this.isFollowedUser = this.service.followingsUsers.findIndex(function (usr) {
        return usr._id === _this2.service.viewUserId;
      }) !== -1;
    };

    ViewUser.prototype.doFollowingAction = function doFollowingAction() {
      if (this.isFollowedUser) {
        this.service.removeFollowing();
      } else {
        this.service.addFollowing();
      }
    };

    ViewUser.prototype.attached = function attached() {
      var userId = this.service.viewUserId;
      this.service.getTweets(userId);
      this.service.getViewUserData(userId);
      this.calcFollowedUser();
    };

    return ViewUser;
  }()) || _class);
});
define('viewmodels/wall/wall',['exports', 'aurelia-framework', 'aurelia-event-aggregator', 'aurelia-validation', 'buffer', './../../services/tweeter-service', 'moment-timezone', '../../services/messages'], function (exports, _aureliaFramework, _aureliaEventAggregator, _aureliaValidation, _buffer, _tweeterService, _momentTimezone, _messages) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Wall = undefined;

  var _tweeterService2 = _interopRequireDefault(_tweeterService);

  var moment = _interopRequireWildcard(_momentTimezone);

  function _interopRequireWildcard(obj) {
    if (obj && obj.__esModule) {
      return obj;
    } else {
      var newObj = {};

      if (obj != null) {
        for (var key in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
        }
      }

      newObj.default = obj;
      return newObj;
    }
  }

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var Wall = exports.Wall = (_dec = (0, _aureliaFramework.inject)(_tweeterService2.default, _aureliaEventAggregator.EventAggregator, _aureliaValidation.ValidationControllerFactory), _dec(_class = function () {
    function Wall(ts, ea, vcf) {
      var _this = this;

      _classCallCheck(this, Wall);

      this.userTweets = [];
      this.message = '';
      this.image = null;

      this.service = ts;
      this.evtAgg = ea;
      this.valContr = vcf.createForCurrentScope();
      this.valContr.validateTrigger = _aureliaValidation.validateTrigger.manual;

      this.evtAgg.subscribe(_messages.TweetUpdate, function (msg) {
        if (msg.tweetSection === _this.service.USER_LABEL) {
          _this.userTweets = _this.service.userTweets;
        }
      });
    }

    Wall.prototype.attached = function attached() {
      this.userTweets = this.service.userTweets;
    };

    Wall.prototype.makeTweet = function makeTweet(e) {
      var _this2 = this;

      this.valContr.validate().then(function (result) {
        if (result.valid) {
          var customFormData = {
            message: _this2.message,
            creation: moment.tz(),
            user: _this2.service.userData._id
          };

          if (_this2.image) {
            var imageInst = _this2.image.item(0);
            var fileReader = new FileReader();
            fileReader.onload = function () {
              customFormData.image = {
                data: _buffer.Buffer.from(fileReader.result),
                contentType: imageInst.type
              };
              _this2.service.makeTweet(customFormData);
            };
            fileReader.readAsArrayBuffer(imageInst);
          } else {
            _this2.service.makeTweet(customFormData);
          }

          _this2.valContr.reset();
          _this2.clearTweetForm();
        }
      });
    };

    Wall.prototype.removeTweet = function removeTweet(tweetId) {
      var _this3 = this;

      this.service.removeTweet(tweetId).then(function (res) {
        console.log('Removed tweet ' + tweetId);
        _this3.service.getUserTweets();
      });
    };

    Wall.prototype.clearTweetForm = function clearTweetForm() {
      this.message = '';
      this.image = null;
      this.fileInput.value = null;
    };

    Wall.prototype.refreshWall = function refreshWall() {
      this.service.getUserTweets();
    };

    return Wall;
  }()) || _class);


  _aureliaValidation.ValidationRules.ensure('message').required().satisfies(function (value, obj) {
    return value.trim().length <= 140;
  }).ensure('image').satisfies(function (value, obj) {
    if (value) {
      return value.length === 0 || value.item(0).size <= 524288;
    }
    return true;
  }).on(Wall);
});
define('viewmodels/welcome/welcome',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var Home = exports.Home = function Home() {
    _classCallCheck(this, Home);
  };
});
define('viewmodels/admin/login/login',['exports', 'aurelia-framework', 'aurelia-event-aggregator', 'aurelia-validation', '../../../services/tweeter-service'], function (exports, _aureliaFramework, _aureliaEventAggregator, _aureliaValidation, _tweeterService) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Login = undefined;

  var _tweeterService2 = _interopRequireDefault(_tweeterService);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var Login = exports.Login = (_dec = (0, _aureliaFramework.inject)(_tweeterService2.default, _aureliaEventAggregator.EventAggregator, _aureliaValidation.ValidationControllerFactory), _dec(_class = function () {
    function Login(ts, ea, vcf) {
      _classCallCheck(this, Login);

      this.email = 'admin@user.de';
      this.password = '';

      this.service = ts;
      this.evtAgr = ea;
      this.valContr = vcf.createForCurrentScope();
      this.valContr.validateTrigger = _aureliaValidation.validateTrigger.manual;
    }

    Login.prototype.login = function login(e) {
      var _this = this;

      this.valContr.validate().then(function (result) {
        if (result.valid) {
          console.log('Administration login');
          _this.valContr.reset();
          _this.service.admLogin(_this.email, _this.password);
        }
      });
    };

    return Login;
  }()) || _class);


  _aureliaValidation.ValidationRules.ensure('email').email().required().ensure('password').required().on(Login);
});
define('viewmodels/admin/stats/stats',['exports', 'aurelia-framework', 'aurelia-event-aggregator', '../../../services/tweeter-service', '../../../services/messages'], function (exports, _aureliaFramework, _aureliaEventAggregator, _tweeterService, _messages) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Stats = undefined;

  var _tweeterService2 = _interopRequireDefault(_tweeterService);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var Stats = exports.Stats = (_dec = (0, _aureliaFramework.inject)(_tweeterService2.default, _aureliaEventAggregator.EventAggregator), _dec(_class = function () {
    function Stats(ts, ea) {
      var _this = this;

      _classCallCheck(this, Stats);

      this.usersCount = undefined;
      this.tweetsCount = undefined;
      this.connectionsCount = undefined;

      this.service = ts;
      this.evtAgg = ea;

      this.evtAgg.subscribe(_messages.AdministrationAction, function (msg) {
        switch (msg.section) {
          case 'tweet':
            _this.refreshTweetsStats();
            break;
          case 'user':
            _this.refreshView();
            break;
          default:
            break;
        }
      });
    }

    Stats.prototype.attached = function attached() {
      if (this.usersCount === undefined) {
        this.refreshView();
      }
    };

    Stats.prototype.refreshUserStats = function refreshUserStats() {
      var _this2 = this;

      this.service.getUserStats().then(function (res) {
        _this2.usersCount = res.content.count;
      });
      this.service.getConnectionsStats().then(function (res) {
        _this2.connectionsCount = res.content.count;
      });
    };

    Stats.prototype.refreshTweetsStats = function refreshTweetsStats() {
      var _this3 = this;

      this.service.getTweetsStats().then(function (res) {
        _this3.tweetsCount = res.content.count;
      });
    };

    Stats.prototype.refreshView = function refreshView() {
      this.refreshUserStats();
      this.refreshTweetsStats();
    };

    return Stats;
  }()) || _class);
});
define('viewmodels/admin/tweets/tweets',['exports', 'aurelia-framework', 'aurelia-event-aggregator', '../../../services/tweeter-service', '../../../services/messages'], function (exports, _aureliaFramework, _aureliaEventAggregator, _tweeterService, _messages) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Tweets = undefined;

  var _tweeterService2 = _interopRequireDefault(_tweeterService);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var Tweets = exports.Tweets = (_dec = (0, _aureliaFramework.inject)(_tweeterService2.default, _aureliaEventAggregator.EventAggregator), _dec(_class = function () {
    function Tweets(ts, ea) {
      _classCallCheck(this, Tweets);

      this.allTweets = [];
      this.selectedTweets = [];

      this.service = ts;
      this.evtAgg = ea;
    }

    Tweets.prototype.attached = function attached() {
      if (this.allTweets.length === 0) {
        this.refreshTweets();
      }
    };

    Tweets.prototype.removeSingleTweet = function removeSingleTweet(tweetId) {
      var _this = this;

      this.service.removeTweet(tweetId).then(function (res) {
        console.log('Removed tweet with ID ' + tweetId);
        _this.refreshTweets();
      });
    };

    Tweets.prototype.removeSelectedTweets = function removeSelectedTweets() {
      var _this2 = this;

      var promises = [];
      for (var _iterator = this.selectedTweets, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
        var _ref;

        if (_isArray) {
          if (_i >= _iterator.length) break;
          _ref = _iterator[_i++];
        } else {
          _i = _iterator.next();
          if (_i.done) break;
          _ref = _i.value;
        }

        var tweet = _ref;

        promises.push(this.service.removeTweet(tweet._id));
      }
      Promise.all(promises).then(function (res) {
        console.log('Bulk removed ' + _this2.selectedTweets.length + ' tweets');
        _this2.refreshTweets();
        _this2.evtAgg.publish(new _messages.AdministrationAction('tweet'));
      }).catch(function (err) {
        console.log('Error during tweet bulk removal');
        console.log(err);
      });
    };

    Tweets.prototype.refreshTweets = function refreshTweets() {
      var _this3 = this;

      this.service.getAllTweets().then(function (res) {
        _this3.allTweets = res.content;
        _this3.selectedTweets = [];
      });
    };

    return Tweets;
  }()) || _class);
});
define('viewmodels/admin/users/users',['exports', 'aurelia-framework', 'aurelia-event-aggregator', '../../../services/tweeter-service', '../../../services/messages'], function (exports, _aureliaFramework, _aureliaEventAggregator, _tweeterService, _messages) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Users = undefined;

  var _tweeterService2 = _interopRequireDefault(_tweeterService);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var Users = exports.Users = (_dec = (0, _aureliaFramework.inject)(_tweeterService2.default, _aureliaEventAggregator.EventAggregator), _dec(_class = function () {
    function Users(ts, ea) {
      _classCallCheck(this, Users);

      this.allUsers = [];
      this.selectedUsers = [];

      this.service = ts;
      this.evtAgg = ea;
    }

    Users.prototype.attached = function attached() {
      if (this.allUsers.length === 0) {
        this.refreshUsers();
      }
    };

    Users.prototype.removeSingleUser = function removeSingleUser(userId, delayRefresh) {
      var _this = this;

      this.service.removeAllTweetsForUser(userId).then(function (res) {
        console.log('Removed all tweets for User-ID ' + userId);
        return _this.service.removeUser(userId);
      }).then(function (res) {
        console.log('Successfully removed user with ID ' + userId);
        if (!delayRefresh) {
          _this.refreshUsers();
          _this.evtAgg.publish(new _messages.AdministrationAction('user'));
        }
      }).catch(function (err) {
        console.log('Error while cascading remove option for user with ID ' + userId);
        console.log(err);
      });
    };

    Users.prototype.removeSelectedUsers = function removeSelectedUsers() {
      var _this2 = this;

      var promises = [];

      var _loop = function _loop() {
        if (_isArray) {
          if (_i >= _iterator.length) return 'break';
          _ref = _iterator[_i++];
        } else {
          _i = _iterator.next();
          if (_i.done) return 'break';
          _ref = _i.value;
        }

        var user = _ref;

        promises.push(_this2.service.removeAllTweetsForUser(user._id).then(function (res) {
          console.log('Removed all tweets for User-ID ' + user._id);
          return _this2.service.removeUser(user._id);
        }));
      };

      for (var _iterator = this.selectedUsers, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
        var _ref;

        var _ret = _loop();

        if (_ret === 'break') break;
      }
      Promise.all(promises).then(function (res) {
        console.log('Bulk removed ' + _this2.selectedUsers.length + ' tweets');
        _this2.refreshUsers();
        _this2.evtAgg.publish(new _messages.AdministrationAction('user'));
      }).catch(function (err) {
        console.log('Error during user bulk removal');
        console.log(err);
      });
    };

    Users.prototype.refreshUsers = function refreshUsers() {
      var _this3 = this;

      this.service.getAllUsers().then(function (res) {
        _this3.allUsers = res.content.filter(function (usr) {
          return usr._id !== _this3.service.userData._id;
        });
        _this3.selectedUsers = [];
      });
    };

    return Users;
  }()) || _class);
});
define('text!admin.html', ['module'], function(module) { module.exports = "<template><require from=\"./partials/nav-bar.html\"></require><section class=\"ui container page-host\" id=\"main-content\"><nav-bar containerless router.bind=\"router\" admin-root.bind=\"true\"></nav-bar><router-view></router-view></section></template>"; });
define('text!app.html', ['module'], function(module) { module.exports = "<template><require from=\"./partials/nav-bar.html\"></require><section class=\"ui container page-host\" id=\"main-content\"><nav-bar containerless router.bind=\"router\"></nav-bar><router-view></router-view></section></template>"; });
define('text!home.html', ['module'], function(module) { module.exports = "<template><require from=\"./partials/nav-bar.html\"></require><section class=\"ui container page-host\" id=\"main-content\"><nav-bar containerless router.bind=\"router\" user-data.bind=\"service.userData\" home-root.bind=\"true\"></nav-bar><router-view></router-view></section></template>"; });
define('text!partials/formerror.html', ['module'], function(module) { module.exports = "<template bindable=\"controller\"><div show.bind=\"controller.errors.length > 0\" class=\"ui negative message\"><div class=\"header\">Error <i class=\"frown large icon\"></i></div><ul class=\"list\"><li repeat.for=\"err of controller.errors\">${err.message}</li></ul></div></template>"; });
define('text!partials/nav-bar.html', ['module'], function(module) { module.exports = "<template bindable=\"router, userData, homeRoot, adminRoot\"><require from=\"./../filters/root-item-filter\"></require><require from=\"./../filters/child-item-filter\"></require><nav class=\"ui main ${homeRoot ? 'top attached' : ''} menu\"><div class=\"header item\" href=\"/\"><img class=\"logo\" src=\"images/logo-128.png\"> <span class=\"custom-main-logo-text\">Tweeter</span></div><div if.bind=\"userData\" class=\"header item\"><i class=\"user circle outline large icon\"></i> ${userData.nickname} </div><div if.bind=\"adminRoot\" class=\"red header item\"><i class=\"settings large red icon\"></i> ADM</div><div class=\"right menu\"><a repeat.for=\"row of router.navigation | rootItemFilter\" class=\"${row.isActive ? 'active header' : ''} item\" href.bind=\"row.href\">${row.title}</a></div></nav><nav class=\"ui bottom attached menu\" if.bind=\"homeRoot\"><a repeat.for=\"row of router.navigation | childItemFilter\" class=\"${row.isActive ? 'active header' : ''} item\" href.bind=\"row.href\">${row.title}</a></nav></template>"; });
define('text!partials/no-content.html', ['module'], function(module) { module.exports = "<template bindable=\"text\"><div class=\"ui compact segment\"><i class=\"meh big icon\"></i> ${text} </div></template>"; });
define('text!partials/tweeter-card.html', ['module'], function(module) { module.exports = "<template><div class=\"ui centered raised card\"><div class=\"image\"><img src=\"images/logo-1000.png\" class=\"ui medium image\"></div><div class=\"center aligned content\"><h3 class=\"ui header\">Tweeter</h3><div class=\"description\">Lets you connect and share</div></div></div></template>"; });
define('text!partials/tweets-list.html', ['module'], function(module) { module.exports = "<template bindable=\"tweets\"><require from=\"./no-content.html\"></require><require from=\"./../helpers/date-format\"></require><require from=\"./../helpers/data-uri\"></require><div class=\"ui compact segments\"><article repeat.for=\"tweet of tweets\" class=\"ui compact segment ${$even ? '' : 'secondary'} tweet\"><h5 class=\"ui dividing header\"> ${tweet.user.nickname} <div class=\"sub header\"> ${tweet.creation | dateFormat} </div></h5><p>${tweet.message}</p><div class=\"ui medium bordered image\" if.bind=\"tweet.image\"><img src.bind=\"tweet.image | dataUri\" alt=\"tweet-image\"></div></article><no-content if.bind=\"tweets.length === 0\" containerless text.bind=\"'No tweets available'\"></no-content></div></template>"; });
define('text!viewmodels/browse-users/browse-users.html', ['module'], function(module) { module.exports = "<template><require from=\"./../../partials/no-content.html\"></require><div class=\"ui raised segment\"><h3 class=\"ui dividing header\">Browse users <a click.delegate=\"refreshUsers()\" class=\"ui blue label\"><i class=\"refresh icon\"></i> Refresh</a></h3><div class=\"ui stackable cards\" if.bind=\"users.length > 0\"><div class=\"ui card\" repeat.for=\"user of users\"><div class=\"content\"><i class=\"right floated user circle big icon\"></i><div class=\"header\">${user.nickname}</div><div class=\"meta\">${user.email}</div></div><div class=\"extra centered content\"><button click.delegate=\"viewUser(user._id)\" class=\"ui fluid orange labeled icon button\"><i class=\"arrow circle outline right large icon\"></i> View timeline</button></div></div></div><no-content if.bind=\"users.length === 0\" containerless text.bind=\"'No tweets available'\"></no-content></div></template>"; });
define('text!viewmodels/firehose/firehose.html', ['module'], function(module) { module.exports = "<template><require from=\"./../../partials/tweets-list.html\"></require><div class=\"ui raised segment\"><h3 class=\"ui dividing header\">Firehose - All tweets <a click.delegate=\"refreshFirehose()\" class=\"ui blue label\"><i class=\"refresh icon\"></i> Refresh</a></h3><div class=\"ui two column grid\"><div class=\"nine wide column\"><tweets-list containerless tweets.bind=\"firehoseTweets\"></tweets-list></div><aside class=\"seven wide centered column\"><div class=\"ui centered raised card\"><div class=\"center aligned image\"><i class=\"massive icons\"><i class=\"sun big orange loading icon\"></i> <i class=\"twitter icon\"></i></i></div><div class=\"center aligned content\"><h3 class=\"ui header\">Displaying</h3><div class=\"ui orange inverted large header\">${firehoseTweets.length}</div><h3 class=\"ui header\">Messages</h3></div></div></aside></div></div></template>"; });
define('text!viewmodels/followings/followings.html', ['module'], function(module) { module.exports = "<template><require from=\"./../../partials/tweets-list.html\"></require><div class=\"ui raised segment\"><h3 class=\"ui dividing header\">Followings <a click.delegate=\"refreshFollowings()\" class=\"ui blue label\"><i class=\"refresh icon\"></i> Refresh</a></h3><div class=\"ui two column grid\"><div class=\"nine wide column\"><tweets-list containerless tweets.bind=\"followingsTweets\"></tweets-list></div><aside class=\"seven wide centered column\"><div class=\"ui raised segment\"><h4 class=\"ui header\">Following</h4><div class=\"ui middle aligned divided selection link list\" if.bind=\"followingsUsers.length > 0\"><a class=\"item\" repeat.for=\"user of followingsUsers\" click.delegate=\"viewUser(user._id)\"><i class=\"user circle outline large icon\"></i><div class=\"content\"> ${user.nickname} </div></a></div><strong if.bind=\"followingsUsers.length === 0\">---</strong></div></aside></div></div></template>"; });
define('text!viewmodels/login/login.html', ['module'], function(module) { module.exports = "<template><require from=\"./../../partials/formerror.html\"></require><section class=\"ui raised segment\"><div class=\"ui middle aligned two column grid\"><div class=\"column\"><div class=\"ui fluid raised form segment\"><a route-href=\"adm-login\" class=\"ui red right corner label\"><i class=\"setting icon\"></i></a><form submit.delegate=\"login($event)\"><h3 class=\"ui header\">Log in to Tweeter</h3><div class=\"field\"><label>Email</label><input placeholder=\"Email\" type=\"text\" value.bind=\"email & validate\"></div><div class=\"field\"><label>Password</label><input type=\"password\" value.bind=\"password & validate\"></div><button class=\"ui orange submit button\">Login</button></form><formerror controller.bind=\"valContr\" containerless></formerror></div></div><aside class=\"column\"><compose containerless view=\"./../../partials/tweeter-card.html\"></compose></aside></div></section></template>"; });
define('text!viewmodels/logout/logout.html', ['module'], function(module) { module.exports = "<template><section class=\"ui middle aligned center aligned raised segment\"><form submit.delegate=\"logout($event)\" class=\"ui form\"><h3 class=\"ui header\">Sure you want to log out?</h3><button class=\"ui blue orange button\">Yes</button></form></section></template>"; });
define('text!viewmodels/settings/settings.html', ['module'], function(module) { module.exports = "<template><require from=\"./../../partials/formerror.html\"></require><section class=\"ui raised segment\"><div class=\"ui middle aligned two column grid\"><div class=\"column\"><div class=\"ui fluid raised form segment\"><form submit.delegate=\"changeSettings($event)\"><h3 class=\"ui header\">Change settings</h3><div class=\"two fields\"><div class=\"field\"><label>Nickname</label><input placeholder=\"Your nickname\" type=\"text\" value.bind=\"userData.nickname & validate\" autofocus></div></div><div class=\"field\"><label>E-Mail</label><input placeholder=\"Email\" type=\"text\" value.bind=\"userData.email & validate\"></div><div class=\"field\"><label>Password</label><input type=\"password\" value.bind=\"userData.password & validate\"></div><button class=\"ui orange submit button\">Submit</button></form><formerror controller.bind=\"valContr\" containerless></formerror></div></div><aside class=\"column\"><compose containerless view=\"./../../partials/tweeter-card.html\"></compose></aside></div></section></template>"; });
define('text!viewmodels/signup/signup.html', ['module'], function(module) { module.exports = "<template><require from=\"./../../partials/formerror.html\"></require><section class=\"ui raised segment\"><div class=\"ui middle aligned two column grid\"><div class=\"column\"><div class=\"ui raised fluid form segment\"><form submit.delegate=\"register($event)\"><h3 class=\"ui header\">Sign up to Tweeter</h3><div class=\"two fields\"><div class=\"field\"><label>Nickname</label><input placeholder=\"Your nickname\" type=\"text\" value.bind=\"nickname & validate\" autofocus></div></div><div class=\"field\"><label>E-Mail</label><input placeholder=\"E-Mail Address\" type=\"text\" value.bind=\"email & validate\"></div><div class=\"field\"><label>Password</label><input type=\"password\" value.bind=\"password & validate\"></div><button class=\"ui orange submit button\">Submit</button></form><formerror controller.bind=\"valContr\" containerless></formerror></div></div><aside class=\"column\"><compose containerless view=\"./../../partials/tweeter-card.html\"></compose></aside></div></section></template>"; });
define('text!viewmodels/view-user/view-user.html', ['module'], function(module) { module.exports = "<template><require from=\"./../../partials/tweets-list.html\"></require><div class=\"ui raised segment\"><h3 class=\"ui dividing header\"> ${viewUser.nickname} <a route-href=\"route: yourtweets\" class=\"ui label\"><i class=\"left arrow icon\"></i> Back</a></h3><div class=\"ui two column grid\"><div class=\"nine wide column\"><tweets-list containerless tweets.bind=\"viewUserTweets\"></tweets-list></div><aside class=\"seven wide centered column\"><div class=\"ui raised segment\"><div class=\"ui card\"><div class=\"content\"><i class=\"right floated user circle big icon\"></i><div class=\"header\">${viewUser.nickname}</div><div class=\"meta\">${viewUser.email}</div><div class=\"description\"><i class=\"twitter large icon\"></i> ${viewUserFollowingsCount} </div></div><div class=\"extra centered content\"><button click.delegate=\"doFollowingAction()\" class=\"ui fluid orange labeled icon button\"><i class=\"${isFollowedUser ? 'minus' : 'plus'} large icon\"></i> ${isFollowedUser ? 'Stop following!' : 'Follow!'} </button></div></div></div></aside></div></div></template>"; });
define('text!viewmodels/wall/wall.html', ['module'], function(module) { module.exports = "<template><require from=\"./../../partials/formerror.html\"></require><require from=\"./../../partials/no-content.html\"></require><require from=\"./../../helpers/date-format\"></require><require from=\"./../../helpers/file-list-to-array\"></require><require from=\"./../../helpers/blob-to-url\"></require><require from=\"./../../helpers/data-uri\"></require><section class=\"ui raised segment\"><h3 class=\"ui dividing header\">Your tweets <a click.delegate=\"refreshWall()\" class=\"ui blue label\"><i class=\"refresh icon\"></i> Refresh</a></h3><div class=\"ui two column grid\"><div class=\"nine wide column\"><article class=\"ui compact segment\" repeat.for=\"tweet of userTweets\"><h5 class=\"ui dividing header\"> ${tweet.user.nickname} <div class=\"sub header\"> ${tweet.creation | dateFormat} </div></h5><a class=\"ui top right attached label\" click.delegate=\"removeTweet(tweet._id)\"><i class=\"orange remove icon\"></i></a><p>${tweet.message}</p><div class=\"ui medium bordered image\" if.bind=\"tweet.image\"><img src.bind=\"tweet.image | dataUri\" alt=\"tweet-image\"></div></article><no-content if.bind=\"userTweets.length === 0\" containerless text.bind=\"'No tweets available'\"></no-content></div><aside class=\"seven wide centered column\"><div class=\"ui raised fluid form segment\" id=\"tweet-form\"><form submit.delegate=\"makeTweet($event)\" accept=\"image/jpeg\" enctype=\"multipart/form-data\"><h3 class=\"ui header\">Make a tweet!</h3><div class=\"ui top right attached label\" id=\"tweet-label\">${message.trim().length} / 140</div><div class=\"field\"><textarea value.bind=\"message & validate\" maxlength=\"140\" rows=\"2\"></textarea></div><div class=\"field\"><input ref=\"fileInput\" type=\"file\" files.bind=\"image & validate\" accept=\"image/jpeg\"></div><button class=\"ui orange ${message.length === 0 ? 'disabled' : ''} submit button\">Share</button> <button class=\"ui button\" click.delegate=\"clearTweetForm()\">Clear</button></form><div class=\"ui basic center aligned segment\" if.bind=\"image.length > 0\"><div class=\"ui medium bordered image\"><img repeat.for=\"img of image | fileListToArray\" src.bind=\"img | blobToUrl\" alt=\"tweet-image\"></div></div><formerror controller.bind=\"valContr\" containerless></formerror></div></aside></div></section></template>"; });
define('text!viewmodels/welcome/welcome.html', ['module'], function(module) { module.exports = "<template><section class=\"ui raised segment\"><div class=\"ui two column middle aligned grid\"><div class=\"column\"><div class=\"ui raised segment\"><header class=\"ui dividing center aligned header\">Final project app - Markus Biersack</header><ul class=\"ui left aligned list\"><li>Single page application using Aurelia deployed on Github: <a href=\"https://bim41337.github.io/dmas-twitter-deployment/\">Tweeter-SPA@Github</a></li><li>Full SPA source project on Github with commit history: <a href=\"https://github.com/bim41337/dmas-twitter-app-client\">SPA-Sources@Github</a></li><li>API backend deployed at Heroku: <a href=\"https://tweeter-bim41337.herokuapp.com/\">Tweeter-Backend@Heroku</a></li><li>Backend source project on Github with commit history: <a href=\"https://github.com/bim41337/dmas-twitter-app\">Backend-Sources@Github</a><br>Also includes sources for server rendered version of the app which was developed until the labs for the Aurelia client were fully visible</li></ul></div></div><div class=\"column\"><compose containerless view=\"./../../partials/tweeter-card.html\"></compose></div></div></section></template>"; });
define('text!viewmodels/admin/login/login.html', ['module'], function(module) { module.exports = "<template><require from=\"./../../../partials/formerror.html\"></require><section class=\"ui raised segment\"><div class=\"ui middle aligned two column grid\"><div class=\"column\"><div class=\"ui fluid raised form segment\"><form submit.delegate=\"login($event)\"><h3 class=\"ui header\">Administration login</h3><div class=\"field\"><label>Password</label><input type=\"password\" value.bind=\"password & validate\"></div><button class=\"ui orange submit button\">Login</button></form><formerror containerless controller.bind=\"valContr\"></formerror></div></div><aside class=\"column\"><div class=\"ui centered raised card\"><div class=\"center aligned image\"><i class=\"settings massive red icon\"></i></div><div class=\"center aligned content\"><h3 class=\"ui header\">Tweeter administration</h3></div></div></aside></div></section></template>"; });
define('text!viewmodels/admin/stats/stats.html', ['module'], function(module) { module.exports = "<template><div class=\"ui raised segment\"><h3 class=\"ui dividing header\">Tweeter statistics <a click.delegate=\"refreshView()\" class=\"ui blue label\"><i class=\"refresh icon\"></i> Refresh</a></h3><table class=\"ui striped celled table\"><tbody><tr><td>Users registered</td><td>${usersCount}</td></tr><tr><td>Tweets visible</td><td>${tweetsCount}</td></tr><tr><td>User connections (Followings)</td><td>${connectionsCount}</td></tr></tbody></table></div></template>"; });
define('text!viewmodels/admin/tweets/tweets.html', ['module'], function(module) { module.exports = "<template><require from=\"./../../../partials/no-content.html\"></require><require from=\"./../../../helpers/date-format\"></require><require from=\"./../../../helpers/data-uri\"></require><div class=\"ui raised segment\"><h3 class=\"ui dividing header\">Tweet administration <a click.delegate=\"refreshTweets()\" class=\"ui blue label\"><i class=\"refresh icon\"></i> Refresh</a></h3><button class=\"ui red labeled small icon button ${selectedTweets.length > 0 ? '' : 'disabled'}\" click.delegate=\"removeSelectedTweets()\"><i class=\"trash icon\"></i> Remove selected</button><table class=\"ui striped celled table\" if.bind=\"allTweets.length > 0\"><thead><tr><th class=\"one wide\">&nbsp;</th><th class=\"three wide\">Data</th><th class=\"eleven wide\">Content</th><th class=\"one wide\">&nbsp;</th></tr></thead><tbody><tr repeat.for=\"tweet of allTweets\"><td>${$index + 1}</td><td><h5 class=\"ui header\"> ${tweet.user.nickname} <div class=\"sub header\"> ${tweet.creation | dateFormat} </div></h5></td><td><p>${tweet.message}</p><div class=\"ui divider\" if.bind=\"tweet.image\"></div><div class=\"ui bordered image\" if.bind=\"tweet.image\"><img src.bind=\"tweet.image | dataUri\" alt=\"tweet-image\"></div></td><td><div class=\"ui checkbox\"><input type=\"checkbox\" model.bind=\"tweet\" checked.bind=\"selectedTweets\"><label>&nbsp;</label></div><div class=\"ui vertical hidden divider\"></div><button class=\"ui mini red icon button\" show.bind=\"selectedTweets.length === 0\" click.delegate=\"removeSingleTweet(tweet._id)\"><i class=\"trash icon\"></i></button></td></tr></tbody></table><no-content if.bind=\"allTweets.length === 0\" containerless text.bind=\"'No tweets available'\"></no-content></div></template>"; });
define('text!viewmodels/admin/users/users.html', ['module'], function(module) { module.exports = "<template><require from=\"./../../../partials/no-content.html\"></require><div class=\"ui raised segment\"><h3 class=\"ui dividing header\">User administration <a click.delegate=\"refreshUsers()\" class=\"ui blue label\"><i class=\"refresh icon\"></i> Refresh</a></h3><button class=\"ui red labeled small icon button ${selectedUsers.length > 0 ? '' : 'disabled'}\" click.delegate=\"removeSelectedUsers()\"><i class=\"trash icon\"></i> Remove selected</button><div class=\"ui middle aligned divided relaxed list\" if.bind=\"allUsers.length > 0\"><div class=\"item\" repeat.for=\"user of allUsers\"><div class=\"right floated content\"><div class=\"ui checkbox\"><input type=\"checkbox\" model.bind=\"user\" checked.bind=\"selectedUsers\"><label>&nbsp;</label></div><div class=\"ui vertical hidden divider\"></div><button class=\"ui mini red icon button\" show.bind=\"selectedUsers.length === 0\" click.delegate=\"removeSingleUser(user._id)\"><i class=\"trash icon\"></i></button></div><i class=\"user circle outline big icon\"></i><div class=\"content\"><h5 class=\"header\">${user.nickname}</h5><div class=\"description\">${user._id}</div></div></div></div><no-content if.bind=\"allUsers.length === 0\" containerless text.bind=\"'No users registered'\"></no-content></div></template>"; });
//# sourceMappingURL=app-bundle.js.map