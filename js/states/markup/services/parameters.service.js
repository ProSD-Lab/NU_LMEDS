(function(){
	'use strict';

	angular.module('lmeds2App')
	.factory('parametersService', parametersService);

	parametersService.$inject = ['$q', "$http"];

	function parametersService($q, $http){
		var parametersService = {};
		parametersService.parameters;

		parametersService.loadParameters = function(){
			var defer = $q.defer();
			var d = new Date();
			$http.get('experiment/setup.json?' + d.getTime()).then(
				function(result){
					parametersService.parameters = result.data;
					defer.resolve();
				}
			, function(error){
				alert("Could not load setup file");
				defer.reject('Could not load setup file');
			});

			return(defer.promise);
		}

		return(parametersService)
	}


})()
