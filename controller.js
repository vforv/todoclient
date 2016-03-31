angular.module('todo')
        .controller("MainController", mainData)
        .controller("DashboardController", dashData)
        .controller("SinginController", controllerData)
        .controller("LoginController", loginData)


function mainData() {

}

function controllerData(CreateUser) {

    var vm = this;
    vm.submit = submit;
    vm.success = false;
    function submit() {
        CreateUser.saveUser(vm.user, vm.password)
                .then(function (user) {
                    if (user.status === 200) {
                        vm.success = true;
                    }
                });
    }



}


function loginData(LoginUser, $location) {
    var vm = this;

    vm.submit = submit;

    function submit() {

        LoginUser.getToken(vm.user, vm.password)
                .then(function (user) {
                    if (user.status === 200) {
                        localStorage.setItem('auth_token', user.data.token);
                        return $location.path('/dashboard');
                    } else {
                        return $location.path('/login');
                    }

                });
    }
}

function dashData($http,$location) {
    var vm = this;
    vm.todos;
    vm.addTodo = addTodo;
    vm.updateStatus = updateStatus;
    vm.logout = logout;

    $http.get('https://pure-bayou-79286.herokuapp.com/todos')
            .then(function (todos) {
                vm.todos = todos.data;
            });



    function addTodo() {
        $http({
            method: "POST",
            url: "https://pure-bayou-79286.herokuapp.com/todos",
            data: {description: vm.desc}
        }).then(function (item) {
            vm.todos.push(item.data);
        });
    }

    function updateStatus(id, todo) {
        $http({
            method: "PUT",
            url: "https://pure-bayou-79286.herokuapp.com/todos/" + id,
            data: {status: true}
        }).then(function (item) {
            todo.status = item.data.status;
        });
    }

    function logout() {
        $http.delete("https://pure-bayou-79286.herokuapp.com/user/logout")
                .then(function () {
                    localStorage.clear();
                return $location.path('/login');
                });
    }
}

 