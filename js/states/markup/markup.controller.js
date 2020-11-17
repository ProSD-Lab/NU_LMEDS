(function(){

'use strict';

angular.module('lmeds2App')
.controller('MarkupController', MarkupController);

MarkupController.$inject = ['$location', '$scope', '$mdDialog', '$timeout', 'parametersService', 'listService', 'preloadAudioService', 'participantIdService', 'validationService', 'playsCounterService'];
function MarkupController($location, $scope, $mdDialog, $timeout, parametersService, listService, preloadAudioService, participantIdService, validationService, playsCounterService){
	var vm = this;
	var counter;
	var outerCounter;
	var innerCounter;
	var completed;

	vm.currentItem;
	vm.isPlaying;
	vm.validationService = validationService;
	vm.noMarkupsModel = false;
	vm.progressPercent = 0;
	vm.progressCounter;

	function init(){
		completed = false;

		//prevent browser close
		$scope.$on('$destroy', function() {
			window.onbeforeunload = undefined;
		});
		window.onbeforeunload = function (e) {
			 return "Are you sure you want to navigate away from this page";
		};

		//prevent back button
		$scope.$on('$locationChangeStart', function(event, next, current){
			if(completed == false){
				event.preventDefault();
			}
		});

		//modal dialog
		$mdDialog.show({
			template: '<md-content layout-margin><h2>Setting up, please wait...<h2></md-content>',
			clickOutsideToClose:false
		})

		//reset variables
		counter = 0;
		innerCounter = 0;
		outerCounter = 0;
		vm.currentItem = {};
		vm.isPlaying = false;

		//setup experiments
		parametersService.loadParameters().then(function(result){
			return(listService.loadList(parametersService.parameters.list, parametersService.parameters.shuffle))
		}).then(function(result){
			return(preloadAudioService.preloadAudio(listService.list))
		}).then(function(result){
			$mdDialog.hide();
			console.log("set up complete");
			getNextItem();
		})
	}
	init();


	function getNextItem(){
		if(outerCounter < listService.list.length){
			if(innerCounter < parametersService.parameters.presentationOrder.length){
				vm.currentItem.mode = parametersService.parameters.presentationOrder[innerCounter];
				vm.currentItem.sticky = parametersService.parameters.sticky;
				if(vm.currentItem.mode == "boundary"){
					vm.currentItem.instructions = parametersService.parameters.boundary.instructions;
					vm.currentItem.checkboxInstructions = parametersService.parameters.boundary.checkboxInstructions;
					validationService.minMarkups = parametersService.parameters.boundary.minMarkups;
					validationService.minPlays = parametersService.parameters.boundary.minPlays;
					validationService.maxPlays = parametersService.parameters.boundary.maxPlays;
				} else {
					vm.currentItem.instructions = parametersService.parameters.prominence.instructions;
					vm.currentItem.checkboxInstructions = parametersService.parameters.prominence.checkboxInstructions;
					validationService.minMarkups = parametersService.parameters.prominence.minMarkups;
					validationService.minPlays = parametersService.parameters.prominence.minPlays;
					validationService.maxPlays = parametersService.parameters.prominence.maxPlays;
				}
				if(innerCounter == 0){
					vm.currentItem.audio = listService.list[outerCounter].audio;
					vm.currentItem.text = listService.list[outerCounter].text;
					vm.currentItem.words = listService.list[outerCounter].words;
					vm.currentItem.context = listService.list[outerCounter].context;
				} else {
					playsCounterService.plays.push(validationService.plays);
				}
				innerCounter +=1;
				counter +=1;
				//console.log(counter / listService.list.length);
				vm.progressPercent = Math.floor(counter / (listService.list.length * parametersService.parameters.presentationOrder.length) * 100);
				vm.progressCounter = counter + "/" + (listService.list.length * parametersService.parameters.presentationOrder.length);

			} else {
				innerCounter = 0;
				outerCounter +=1;

				//store data on Firebase
				playsCounterService.plays.push(validationService.plays);
				var ref = firebase.database().ref('data/' + participantIdService.workerId + "/");
				var pushData = {};
				pushData.markups = JSON.parse(angular.toJson(vm.currentItem))
				pushData.plays = playsCounterService.plays;
				pushData.timestamp = firebase.database.ServerValue.TIMESTAMP;
				ref.push(pushData).then(function(){
					$timeout(function(){
						playsCounterService.reset();
						getNextItem();
					}, 0);
				});
			}
			validationService.reset();
			vm.noMarkupsModel = false;
			validationService.evaluateMarkups(vm.currentItem.words, vm.currentItem.mode);
		} else {
			completed = true;
			console.log("experiment end");
			$location.path('/end');
		}
	}

	vm.wordClicked = function(){
		$timeout(function(){
			vm.noMarkupsModel = false;
			validationService.evaluateMarkups(vm.currentItem.mode, vm.currentItem.words);
		}, 0);
	}

	vm.clearMarkups = function(){
		var k=0;
		for(k=0;k<vm.currentItem.words.length;k++){
			if(vm.currentItem.mode == "boundary"){
				vm.currentItem.words[k].boundary = false;
			} else {
				vm.currentItem.words[k].prominence = false;
			}
		}
	}

	vm.nextClicked = function(){
		getNextItem();
	}

	vm.playSound = function(){
		vm.isPlaying = true;
		validationService.playClicked();
		createjs.Sound.activePlugin.context.resume();
		var soundInstance = createjs.Sound.play(vm.currentItem.audio);
		soundInstance.on("complete", function(){
			$timeout(function(){
				//console.log("play completed");
				vm.isPlaying = false
			}, 0);
		});
	}

}

})();
