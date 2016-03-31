angular.module('todo')
        .config(tasks)
        .config(header);

function header($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
}
        
function tasks($routeProvider) {
    $routeProvider.
            when('/dashboard', {
                controller: "DashboardController",
                controllerAs: "vm",
                templateUrl: '/views/dashboard.html'

            }).
            when('/', {
                templateUrl: '/views/dashboard.html'

            }).
            when('/login', {
                controller: "LoginController",
                controllerAs: "vm",
                templateUrl: '/views/login.html'

            }).
            when('/singin', {
                controller: "SinginController",
                controllerAs: "vm",
                templateUrl: '/views/singin.html'

            }).
            otherwise({
                    redirectTo: '/dashboard'
            });


}
          