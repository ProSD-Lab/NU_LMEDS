(function(){
	'use strict';

	angular.module('lmeds2App')
	.factory('participantIdService', participantIdService);

	participantIdService.$inject = ['$q','$routeParams'];
	function participantIdService($q,  $routeParams){
		var participantIdService = {};
		participantIdService.workerId;
		participantIdService.assignmentId;

		participantIdService.getParticipantId = function(){
			var defer = $q.defer();
			if($routeParams.workerId){
				participantIdService.workerId = $routeParams.workerId
				if($routeParams.assignmentId == 'ASSIGNMENT_ID_NOT_AVAILABLE' || $routeParams.assignmentId == '' || $routeParams.assignmentId == null){
					defer.reject();
				} else {
					participantIdService.assignmentId = $routeParams.assignmentId;
					defer.resolve();
				}
			} else {
				defer.reject();
			}

			return(defer.promise);
		}
		return(participantIdService)
	}


})()
