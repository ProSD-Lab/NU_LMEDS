(function(){
	'use strict';

	angular.module('lmeds2App')
	.factory('preloadAudioService', preloadAudioService);

	preloadAudioService.$inject = ['$q', "$http", "$timeout"];

	function preloadAudioService($q, $http, $timeout){
		var preloadAudioService = {};

		preloadAudioService.preloadAudio = function(list){
			var defer = $q.defer();

			//preload audio with createjs
			createjs.Sound.removeAllSounds();
			var queue = new createjs.LoadQueue();
			queue.installPlugin(createjs.Sound);
			queue.on("complete", function(){
				$timeout(function(){
					defer.resolve();
				}, 0);
			});
			var k;
			var filesToLoad = [];
			for(k=0;k<list.length;k++){
				var obj = {};
				obj.id = list[k].audio;
				obj.src = "experiment/audio/" + list[k].audio + ".mp3";
				filesToLoad.push(obj);
			}
			queue.loadManifest(filesToLoad);

			return(defer.promise);
		}

		return(preloadAudioService)
	}


})()
