var app = angular
			.module('technology',['ui.router','ngMessages', 'ngStorage'])
			.config(config)
			.run(run);


	function config($stateProvider, $urlRouterProvider) {
        // default route
        $urlRouterProvider.otherwise("/login");

        // app routes
        $stateProvider
            .state('technology', {
                url: '/technology',
                templateUrl: '/views/technology/tech.html',
                controller: 'techController'
            })
            .state('login', {
                url: '/login',
                templateUrl: '/views/login/login.html',
                controller: 'loginController'
            })
            .state('register', {
                url: '/register',
                templateUrl: '/views/register/register.html',
                controller: 'registerController'
            });
    }

    function run($rootScope, $http, $location, $localStorage) {
        // keep user logged in after page refresh
        if ($localStorage.currentUser) {
            $http.defaults.headers.common.Authorization = 'Bearer ' + $localStorage.currentUser.token;
        }

        // redirect to login page if not logged in and trying to access a restricted page
       /* $rootScope.$on('$locationChangeStart', function (event, next, current) {
            var publicPages = ['/login'];
            var restrictedPage = publicPages.indexOf($location.path()) === -1;
            if (restrictedPage && !$localStorage.currentUser) {
                $location.path('/login');
            }
        });*/
    }