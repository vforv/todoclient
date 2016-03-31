angular.module('todo')
        .factory("CreateUser", factoryData)
        .factory("LoginUser", loginUser)
        .factory("authInterceptor", authUser);
        

function factoryData($http) {

    return {
        saveUser: saveUser
    };

    function saveUser(email, password) {
        return $http({
            method: 'POST',
            url: 'https://pure-bayou-79286.herokuapp.com/user',
            data: {email: email, password: password}
        })
                .then(getUser);
    }

    function getUser(user) {
        return user;
    }
}

function loginUser($http) {
    return {
        getToken: getToken
    };

    function getToken(username, password) {
        return $http({
            method: "POST",
            url: "https://pure-bayou-79286.herokuapp.com/user/login",
            data: {email: username, password: password}
        })
                .then(function (user) {
                    return user;
                }, function (error) {
                    return error;
                });
    }
}

function authUser($q, $location) {
    return {
        request: function(config) {
            config.headers = config.headers || {};
            if(localStorage.auth_token) {
                config.headers.Auth = localStorage.auth_token;
            }else{
                $location.path("/login");
            }
            return config;
        },
        responseError: function (response) {
            if (response.status === 401) {
                $location.path("/login");
            }
            
            return $q.reject(response);
        }
    };
}