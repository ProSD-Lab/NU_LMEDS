(function(){

'use strict';

angular.module('lmeds2App', ['ngRoute', 'ngMaterial', 'ngMessages', 'ngAnimate', 'ngSanitize', 'blockUI', 'firebase'])
.config(config)
.factory('httpInterceptor', httpInterceptor)
.directive('showFocus', function($timeout) {
  return function(scope, element, attrs) {
    scope.$watch(attrs.showFocus,
      function (newValue) {
        $timeout(function() {
            newValue && element.focus();
        });
      },true);
  };
});

httpInterceptor.$inject = ['$q'];
function httpInterceptor($q){
	return {
		responseError: function(rejection) {
			if (rejection.status == 400 || rejection.status == 500) {
				alert("Server error: " + rejection.status + ". Please contact web administrator.");
			} else if(rejection.status == "403"){
				alert("Permission denied");
			} else if (rejection.status == -1){
				window.location.reload();
			}
			return $q.reject(rejection);
		}
	}
}

config.$inject = ['$routeProvider', '$mdThemingProvider', '$httpProvider'];
function config($routeProvider, $mdThemingProvider, $httpProvider){
	$mdThemingProvider.theme('default').primaryPalette("light-blue");

	var universalResolves = {};

	$httpProvider.interceptors.push('httpInterceptor');

	var customRouteProvider = angular.extend({}, $routeProvider, {
	when: function(path, route) {
		route.resolve = (route.resolve) ? route.resolve : {};
		angular.extend(route.resolve, universalResolves);
		$routeProvider.when(path, route);
		return this;
		}
	});

	customRouteProvider
    .when('/', {
        templateUrl: 'js/states/preview/preview.html',
        controller: 'PreviewController',
        controllerAs : 'previewCtrl'
      }
    )
    .when('/consent', {
        templateUrl: 'js/states/consent/consent.html',
        controller: 'ConsentController',
        controllerAs : 'consentCtrl'
      }
    )
    .when('/instructions', {
        templateUrl: 'js/states/instructions/instructions.html',
        controller: 'InstructionsController',
        controllerAs : 'instructionsCtrl'
      }
    )
    .when('/survey', {
        templateUrl: 'js/states/survey/survey.html',
        controller: 'SurveyController',
        controllerAs : 'surveyCtrl'
      }
    )
    .when('/markup', {
        templateUrl: 'js/states/markup/markup.html',
        controller: 'MarkupController',
        controllerAs : 'markupCtrl'
      }
    )
    .when('/end', {
        templateUrl: 'js/states/end/end.html',
        controller: 'EndController',
        controllerAs : 'endCtrl'
      }
    );

	}

})();
