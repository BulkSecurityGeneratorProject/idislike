'use strict';

/* App Module */

var idislikeApp = angular.module('idislikeApp', [
    'http-auth-interceptor',
    'idislike.cst',
    'tmh.dynamicLocale',
    'ngResource',
    'ngRoute',
    'ngCookies',
    'idislikeAppUtils',
    'pascalprecht.translate',
    'idislike.admin',
    'idislike.user',
    'truncate']);

idislikeApp
    .config(function ($routeProvider, $httpProvider, $translateProvider, tmhDynamicLocaleProvider, USER_ROLES) {
            $routeProvider
                .when('/error', {
                    templateUrl: 'views/error.html',
                    access: {
                        authorizedRoles: [USER_ROLES.all]
                    }
                })
                .when('/configuration', {
                    templateUrl: 'views/admin/configuration.html',
                    controller: 'ConfigurationController',
                    resolve:{
                        resolvedConfiguration:['ConfigurationService', function (ConfigurationService) {
                            return ConfigurationService.get();
                        }]
                    },
                    access: {
                        authorizedRoles: [USER_ROLES.all]
                    }
                })
                .when('/logout', {
                    templateUrl: 'views/main.html',
                    controller: 'LogoutController',
                    access: {
                        authorizedRoles: [USER_ROLES.all]
                    }
                })
                .when('/main', {
                    templateUrl: 'views/main.html',
                    controller: 'MainController',
                    access: {
                        authorizedRoles: [USER_ROLES.all]
                    }
                })
                .when('/home', {
                    templateUrl: 'views/home.html',
                    controller: 'PersonController',
                    resolve:{
                        resolvedPerson: ['Person', function (Person) {
                            return Person.query().$promise;
                        }]
                    },
                    access: {
                        authorizedRoles: [USER_ROLES.all]
                    }
                })
                .when('/topics/:topic', {
                    templateUrl: 'views/home.html',
                    controller: 'TopicController',
                    access: {
                        authorizedRoles: [USER_ROLES.all]
                    }
                })
                .otherwise({
                    templateUrl: 'views/home.html',
                    controller: 'PersonController',
                    resolve:{
                        resolvedPerson: ['Person', function (Person) {
                            return Person.query().$promise;
                        }]
                    },
                    access: {
                        authorizedRoles: [USER_ROLES.all]
                    }
                });

            // Initialize angular-translate
            $translateProvider.useStaticFilesLoader({
                prefix: 'i18n/',
                suffix: '.json'
            });

            $translateProvider.preferredLanguage('en');

            $translateProvider.useCookieStorage();

            tmhDynamicLocaleProvider.localeLocationPattern('bower_components/angular-i18n/angular-locale_{{locale}}.js')
            tmhDynamicLocaleProvider.useCookieStorage('NG_TRANSLATE_LANG_KEY');
        })
        .run(function($rootScope, $location, $http, AuthenticationSharedService, Session, USER_ROLES) {
                $rootScope.authenticated = false;
                $rootScope.$on('$routeChangeStart', function (event, next) {
                    $rootScope.isAuthorized = AuthenticationSharedService.isAuthorized;
                    $rootScope.userRoles = USER_ROLES;
                    AuthenticationSharedService.valid(next.access.authorizedRoles);
                });

                // Call when the the client is confirmed
                $rootScope.$on('event:auth-loginConfirmed', function(data) {
                    $rootScope.authenticated = true;
                    if ($location.path() === "/login") {
                        var search = $location.search();
                        if (search.redirect !== undefined) {
                            $location.path(search.redirect).search('redirect', null).replace();
                        } else {
                            $location.path('/').replace();
                        }
                    }
                });

                // Call when the 401 response is returned by the server
                $rootScope.$on('event:auth-loginRequired', function(rejection) {
                    Session.invalidate();
                    $rootScope.authenticated = false;
                    if ($location.path() !== "/" && $location.path() !== "" && $location.path() !== "/register" &&
                            $location.path() !== "/activate" && $location.path() !== "/login") {
                        var redirect = $location.path();
                        $location.path('/login').search('redirect', redirect).replace();
                    }
                });

                // Call when the 403 response is returned by the server
                $rootScope.$on('event:auth-notAuthorized', function(rejection) {
                    $rootScope.errorMessage = 'errors.403';
                    $location.path('/error').replace();
                });

                // Call when the user logs out
                $rootScope.$on('event:auth-loginCancelled', function() {
                    $location.path('');
                });
        });
