(function(){

'use strict';

angular.module('lmeds2App')
.controller('ConsentController', ConsentController);

ConsentController.$inject = ['$location', '$mdDialog', 'participantIdService'];
function ConsentController($location, $mdDialog, participantIdService){
	var vm = this;
	vm.ready;
	vm.consentPath;

	function init(){
		vm.ready = false;
		vm.consentPath = "experiment/consent.html?d=" + (new Date()).getTime();
		$mdDialog.show({
			template: '<md-content layout-margin><h2>Consent form loading, please wait...<h2></md-content>',
			clickOutsideToClose:false
		})
	}
	init();

	vm.consentLoaded = function(){
		$mdDialog.hide();
		vm.ready = true;
	}

	vm.accept = function(){
		participantIdService.getParticipantId().then(function(result){
			var ref = firebase.database().ref('consent/' + participantIdService.workerId + "/");
			var pushData = {};
			pushData.timestamp = firebase.database.ServerValue.TIMESTAMP;
			ref.push(pushData);
			$location.path('/instructions');
		}, function(error){
			$mdDialog.show({
				template: "<md-content layout-margin><p>You must accept this HIT to continue.<p></md-content>",
				clickOutsideToClose:true
			})
		})

	}

	vm.decline = function(){
		$mdDialog.show({
			template: "<md-content layout-margin><p>Please return this HIT by clicking the 'Return HIT' button at the top of this page. Thank you.<p></md-content>",
			clickOutsideToClose:true
		})
	}


}

})();
