(function(){
	'use strict';

	angular.module('lmeds2App')
	.factory('validationService', validationService);

	validationService.$inject = [];
	function validationService(){
		var validationService = {};
		validationService.minMarkups;
		validationService.markupsFulfilled = false;
		validationService.minPlays;
		validationService.maxPlays;
		validationService.playsFulfilled = false;
		validationService.maxedOutPlays = false;
		validationService.plays = 0;


		validationService.reset = function(){
			validationService.plays = 0;
			validationService.markupsFulfilled = false;
			validationService.playsFulfilled = false;
			validationService.maxedOutPlays = false;
		}

		validationService.playClicked = function(){
			validationService.plays +=1;
			if(validationService.plays >= validationService.minPlays){
				validationService.playsFulfilled = true;
			}
			if(validationService.plays >= validationService.maxPlays){
				validationService.maxedOutPlays = true;
			}
		}

		validationService.evaluateMarkups = function(mode, words){
			var k=0;
			var wordsSelected = 0;
			for(k=0;k<words.length;k++){
				if(mode == "boundary"){
						if(words[k].boundary == true){
							wordsSelected +=1;
						}
				} else {
					if(words[k].prominence == true){
						wordsSelected +=1;
					}
				}
			}
			if(wordsSelected >= validationService.minMarkups){
				validationService.markupsFulfilled = true;
			} else {
				validationService.markupsFulfilled = false;
			}
		}

		validationService.noMarkupsClicked = function(value){
			if(value == true){
				validationService.markupsFulfilled = true;
			} else {
				validationService.markupsFulfilled = false;
			}
		}


		return(validationService)
	}


})()
