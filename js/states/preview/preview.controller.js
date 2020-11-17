(function(){

'use strict';

angular.module('lmeds2App')
.controller('PreviewController', PreviewController);

PreviewController.$inject = ['$location', '$timeout', '$mdDialog'];
function PreviewController($location, $timeout, $mdDialog){
	var vm = this;
	vm.soundAvailable;
	vm.soundPlayed;
	vm.isPlaying;

	function init(){
		vm.soundAvailable = false
		vm.soundPlayed = false;
		vm.isPlaying = false;
		//preload audio
		$mdDialog.show({
			template: '<md-content layout-margin><h2>Audio Loading, please wait...<h2></md-content>',
			clickOutsideToClose:false
		})
		createjs.Sound.removeAllSounds();
		var testAudioQueue = new createjs.LoadQueue();
		testAudioQueue.installPlugin(createjs.Sound);
		testAudioQueue.on("complete", function(){
			$timeout(function(){
				vm.soundAvailable = true;
				$mdDialog.hide();
			}, 0);
		});
		testAudioQueue.loadManifest({id:"testAudio", src:"js/states/preview/test_audio.mp3"});
	}
	init();

	vm.playTestAudio = function(){
		if(vm.isPlaying == true){
			createjs.Sound.stop();
			vm.isPlaying = false;
		} else {
			createjs.Sound.activePlugin.context.resume();
			createjs.Sound.stop();
			vm.soundPlayed = true;
			vm.isPlaying = true;
			var soundInstance = createjs.Sound.play("testAudio");
			soundInstance.on("complete", function(){
				$timeout(function(){
					vm.isPlaying = false;
				}, 0)
			})
		}
	}

	vm.no = function(){
		createjs.Sound.stop();
		vm.isPlaying = false;
		$mdDialog.show({
			template: '<md-content layout-margin><p>Your browser may not support audio playback. Please contact the experimenter if you have any questions.<p></md-content>',
			clickOutsideToClose:true
		})

	}

	vm.yes = function(){
		createjs.Sound.stop();
		vm.isPlaying = false;
		$location.path("/consent")
	}

}

})();
