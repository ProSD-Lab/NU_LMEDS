(function(){
	'use strict';

	angular.module('lmeds2App')
	.factory('listService', listService);

	listService.$inject = ['$q', '$http'];
	function listService($q, $http){
		var listService = {};
		listService.list = [];

		listService.loadList = function(listFilename, shuffle){
			var defer = $q.defer();
			var d = new Date();
			$http.get('experiment/' + listFilename + "?" + d.getTime()).then(function(result){
				listService.list = result.data;
				if(shuffle == true){
					listService.list = shuffleArray(listService.list);
				}
				var k=0;
				for(k=0;k<listService.list.length;k++){
					var words = listService.list[k].text.split(" ");
					listService.list[k].words = [];
					var l=0;
					for(l=0;l<words.length;l++){
						var obj = {};
						obj.word = words[l];
						obj.prominence = false;
						obj.boundary = false;
						listService.list[k].words.push(obj);
					}
				}
				defer.resolve();
			}, function(error){
				alert("Could not load setup file");
				defer.reject('Could not load setup file');
			})
			return(defer.promise)
		}

		function shuffleArray(array) {
			var currentIndex = array.length, temporaryValue, randomIndex;
			while (0 !== currentIndex) {
				randomIndex = Math.floor(Math.random() * currentIndex);
				currentIndex -= 1;
				temporaryValue = array[currentIndex];
				array[currentIndex] = array[randomIndex];
				array[randomIndex] = temporaryValue;
			}
			return array;
		}


		return(listService)
	}


})()
