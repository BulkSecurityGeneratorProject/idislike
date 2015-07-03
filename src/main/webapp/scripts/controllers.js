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

    $scope.dislike = function (person) {
        $http.put('app/rest/persons/' +  person.id)
            .success(function (data, status, headers, config) {
                person.score += 1;

            }).error(function (data, status, headers, config) {
                console.log("dislike failed")
            });
    };

    $scope.clear = function () {
        $scope.person = {name: null, picture: null, score: null, id: null};
    };
});

idislikeApp.controller('TopicController', function ($scope, $routeParams, $http, Person) {

    $scope.topic = $routeParams.topic;

    $scope.persons = Person.getByTopic({topic : $scope.topic});

    $scope.dislike = function (person) {
        $http.put('app/rest/persons/' +  person.id)
            .success(function (data, status, headers, config) {
                person.score += 1;

            }).error(function (data, status, headers, config) {
                console.log("dislike failed")
            });
    };

});

//Controller de la page index
idislikeApp.controller('MainController', function ($scope, Topic) {

    $scope.topics = Topic.query();


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
