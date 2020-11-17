(function(){

'use strict';

angular.module('lmeds2App')
.controller('InstructionsController', InstructionsController);

InstructionsController.$inject = ['$location', '$mdDialog', 'participantIdService'];
function InstructionsController($location, $mdDialog, participantIdService){
	var vm = this;
	vm.instructionsPath
	vm.ready;

	function init(){
		vm.ready = false;
		vm.instructionsPath = "experiment/instructions.html?d=" + (new Date()).getTime();
		$mdDialog.show({
			template: '<md-content layout-margin><h2>Instructions loading, please wait...<h2></md-content>',
			clickOutsideToClose:false
		})
	}
	init();

	vm.instructionsLoaded = function(){
		$mdDialog.hide();
		vm.ready = true;
	}

	vm.next = function(){
		$location.path("/survey");
	}




}

})();
