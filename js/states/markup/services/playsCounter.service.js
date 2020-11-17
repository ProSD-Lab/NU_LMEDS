(function(){
	'use strict';

	angular.module('lmeds2App')
	.factory('playsCounterService', playsCounterService);

	playsCounterService.$inject = [];

	function playsCounterService(){
		var playsCounterService = {};
		playsCounterService.plays = [];

		playsCounterService.reset = function(){
			playsCounterService.plays = [];
		}

		return(playsCounterService)
	}


})()
