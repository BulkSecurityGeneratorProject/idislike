'use strict';

angular.module('idislike.user')

.controller('ActivationController', function ($scope, $routeParams, Activate) {
    Activate.get({key: $routeParams.key},
        function (value, responseHeaders) {
            $scope.error = null;
            $scope.success = 'OK';
        },
        function (httpResponse) {
            $scope.success = null;
            $scope.error = "ERROR";
        });
})

.controller('LoginController', function ($scope, $location, AuthenticationSharedService) {
    $scope.rememberMe = true;
    $scope.login = function () {
        AuthenticationSharedService.login({
            username: $scope.username,
            password: $scope.password,
            rememberMe: $scope.rememberMe
        });
    }
})


.controller('LogoutController', function ($location, AuthenticationSharedService) {
    AuthenticationSharedService.logout();
})


.controller('PasswordController', function ($scope, Password) {
    $scope.success = null;
    $scope.error = null;
    $scope.doNotMatch = null;
    $scope.changePassword = function () {
        if ($scope.password != $scope.confirmPassword) {
            $scope.doNotMatch = "ERROR";
        } else {
            $scope.doNotMatch = null;
            Password.save($scope.password,
                function (value, responseHeaders) {
                    $scope.error = null;
                    $scope.success = 'OK';
                },
                function (httpResponse) {
                    $scope.success = null;
                    $scope.error = "ERROR";
                });
        }
    };
})


.controller('RegisterController', function ($scope, $translate, Register) {
    $scope.success = null;
    $scope.error = null;
    $scope.doNotMatch = null;
    $scope.errorUserExists = null;
    $scope.register = function () {
        if ($scope.registerAccount.password != $scope.confirmPassword) {
            $scope.doNotMatch = "ERROR";
        } else {
            $scope.registerAccount.langKey = $translate.use();
            $scope.doNotMatch = null;
            $scope.success = null;
            $scope.error = null;
            $scope.errorUserExists = null;
            $scope.errorEmailExists = null;
            Register.save($scope.registerAccount,
                function (value, responseHeaders) {
                    $scope.success = 'OK';
                },
                function (httpResponse) {
                    if (httpResponse.status === 400 && httpResponse.data === "login already in use") {
                        $scope.error = null;
                        $scope.errorUserExists = "ERROR";
                    } else if (httpResponse.status === 400 && httpResponse.data === "e-mail address already in use") {
                        $scope.error = null;
                        $scope.errorEmailExists = "ERROR";
                    } else {
                        $scope.error = "ERROR";
                    }
                });
        }
    }
})


.controller('SessionsController', function ($scope, resolvedSessions, Sessions) {
    $scope.success = null;
    $scope.error = null;
    $scope.sessions = resolvedSessions;
    $scope.invalidate = function (series) {
        Sessions.delete({series: encodeURIComponent(series)},
            function (value, responseHeaders) {
                $scope.error = null;
                $scope.success = "OK";
                $scope.sessions = Sessions.get();
            },
            function (httpResponse) {
                $scope.success = null;
                $scope.error = "ERROR";
            });
    };
})


.controller('SettingsController', function ($scope, Account) {
    $scope.success = null;
    $scope.error = null;
    $scope.settingsAccount = Account.get();

    $scope.save = function () {
        $scope.success = null;
        $scope.error = null;
        $scope.errorEmailExists = null;
        Account.save($scope.settingsAccount,
            function (value, responseHeaders) {
                $scope.error = null;
                $scope.success = 'OK';
                $scope.settingsAccount = Account.get();
            },
            function (httpResponse) {
                if (httpResponse.status === 400 && httpResponse.data === "e-mail address already in use") {
                    $scope.errorEmailExists = "ERROR";
                } else {
                    $scope.error = "ERROR";
                }
            });
    };
});