'use strict';

idislikeApp.controller('MainController', function ($scope) {
    });

idislikeApp.controller('AdminController', function ($scope) {
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

idislikeApp.controller('MenuController', function ($scope) {
    });

