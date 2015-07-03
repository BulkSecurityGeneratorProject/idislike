'use strict';

idislikeApp.controller('PersonController', function ($scope, resolvedPerson, Person) {

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

//        $scope.dislike = function (id) {
//            $scope.person = Person.get({id: id});
//            $scope.person.score =+ 1;
//        };

        $scope.clear = function () {
            $scope.person = {name: null, picture: null, score: null, id: null};
        };
    });
