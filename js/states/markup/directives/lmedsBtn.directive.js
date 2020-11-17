(function(){
	'use strict';

	angular.module('lmeds2App')
	.directive('lmedsBtn', lmedsBtn);

	function lmedsBtn(){
		var d = new Date();
		var directive = {
			restrict: 'E',
			scope: {
				word: '=',
				prominence: '=',
				boundary: '=',
				mode: '=',
				sticky: '=',
				click: '&'
			},
			controller: lmedsBtnController,
			controllerAs: 'lmedsBtnCtrl',
			bindToController: true,
			templateUrl: 'js/states/markup/directives/lmedsBtn.template.html?d=' + d.getTime()
		}
		return directive;
	}


	lmedsBtnController.$inject = ['$scope'];
	function lmedsBtnController($scope){
		var vm = this;
		vm.forceHideBoundary = false;
		vm.forceHideProminence = false;

		vm.btnClicked = function(){
			vm.click();
			if(vm.mode == "prominence"){
				if(vm.prominence == false){
					vm.prominence = true;
				} else {
					vm.prominence = false
				}
			} else {
				if(vm.boundary == false){
					vm.boundary = true;
				} else {
					vm.boundary = false
				}
			}
		}

		//watch for mode change
		$scope.$watch(angular.bind(this, function () {
			return vm.mode;
		}), function (newVal, oldVal) {
			if(vm.mode){
				if(vm.sticky == false){
					if(newVal == "boundary"){
						vm.forceHideProminence = true;
						vm.forceHideBoundary = false;
					} else {
						vm.forceHideProminence = false;
						vm.forceHideBoundary = true;
					}
				} else {
					vm.forceHideProminence = false;
					vm.forceHideBoundary = false;
				}
			}
		});

	}



})();
