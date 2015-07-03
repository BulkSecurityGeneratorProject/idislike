'use strict';

idislikeApp.controller('PersonController', function ($scope, $http, resolvedPerson, Person) {

    $scope.persons = resolvedPerson;

    $scope.create = function () {
        Person.save($scope.person,
            function () {
                $scope.persons = Person.query();
                $('#savePersonModal').modal('hide');
                $scope.clear();
            });
    };

    $scope.update = function (id) {
        $scope.person = Person.get({id: id});
        $('#savePersonModal').modal('show');
    };

    $scope.delete = function (id) {
        Person.delete({id: id},
            function () {
                $scope.persons = Person.query();
            });
    };

    $scope.dislike = function (id) {
        $http.put('rest/persons/' +  id)
            .success(function (data, status, headers, config) {
                console.log("dislike success")

            }).error(function (data, status, headers, config) {
                console.log("dislike failed")
            });
    };

    $scope.clear = function () {
        $scope.person = {name: null, picture: null, score: null, id: null};
    };
});

idislikeApp.controller('MainController', function ($scope) {
    });

idislikeApp.controller('AdminController', function ($scope) {
    });

idislikeApp.controller('MenuController', function ($scope) {
    });

idislikeApp.controller('LanguageController', function ($scope, $translate, LanguageService) {
        $scope.changeLanguage = function (languageKey) {
            $translate.use(languageKey);

            LanguageService.getBy(languageKey).then(function(languages) {
                $scope.languages = languages;
            });
        };

        LanguageService.getBy().then(function (languages) {
            $scope.languages = languages;
        });
    });
