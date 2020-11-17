(function(){

'use strict';

angular.module('lmeds2App')
.controller('EndController', EndController);

EndController.$inject = ['$location', '$routeParams'];
function EndController($location, $routeParams){
	var vm = this;

	vm.submitUrl = "";

	function init(){
		vm.submitUrl = $routeParams.turkSubmitTo + "/mturk/externalSubmit?assignmentId=" + $routeParams.assignmentId + "&score=0";
	}
	init();
}

})();
