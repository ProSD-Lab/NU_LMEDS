(function(){

'use strict';

angular.module('lmeds2App')
.controller('SurveyController', SurveyController);

SurveyController.$inject = ['$location', 'participantIdService'];
function SurveyController($location,  participantIdService){
	var vm = this;
	vm.languageBackground;

	vm.next = function(){
		var ref = firebase.database().ref('survey/' + participantIdService.workerId + "/");
		var pushData = {};
		pushData.nativeEnglishSpeaker = vm.languageBackground;
		pushData.timestamp = firebase.database.ServerValue.TIMESTAMP;
		ref.push(pushData);
		$location.path("/markup");
	}




}

})();
