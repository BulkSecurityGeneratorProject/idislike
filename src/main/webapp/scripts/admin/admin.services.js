'use strict';

angular.module('idislike.admin')

.factory('AuditsService', function ($http) {
    return {
        findAll: function() {
            var promise = $http.get('app/rest/audits/all').then(function (response) {
                return response.data;
            });
            return promise;
        },
        findByDates: function(fromDate, toDate) {
            var promise = $http.get('app/rest/audits/byDates', {params: {fromDate: fromDate, toDate: toDate}}).then(function (response) {
                return response.data;
            });
            return promise;
        }
    }
})


.factory('ConfigurationService', function ($rootScope, $filter, $http) {
    return {
        get: function() {
            var promise = $http.get('configprops').then(function(response){
                var properties = [];
                angular.forEach(response.data, function(data) {
                    properties.push(data);
                });
                var orderBy = $filter('orderBy');
                return orderBy(properties, 'prefix');;
            });
            return promise;
        }
    };
})


.factory('ThreadDumpService', function ($http) {
    return {
        dump: function() {
            var promise = $http.get('dump').then(function(response){
                return response.data;
            });
            return promise;
        }
    };
})


.factory('HealthCheckService', function ($rootScope, $http) {
    return {
        check: function() {
            var promise = $http.get('health').then(function(response){
                return response.data;
            });
            return promise;
        }
    };
});


idislikeApp.factory('LogsService', function ($resource) {
    return $resource('app/rest/logs', {}, {
        'findAll': { method: 'GET', isArray: true},
        'changeLevel':  { method: 'PUT'}
    });
})


.factory('MetricsService',function ($http) {
    return {
        get: function() {
            var promise = $http.get('metrics/metrics').then(function(response){
                return response.data;
            });
            return promise;
        }
    };
});
