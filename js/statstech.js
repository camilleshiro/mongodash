
class statsTechs {
	search(checkedVersions){
			var self = this;
			showLoader("body");
			blockNav();

		  	// Stats by game type
            //showLoader("#game-type");
			var objMongo = new mongoQuery();
            var mongoTech = objMongo.getAllTakenTechs(checkedVersions);
            $.ajax({
            url: "aggregate",
            data: {args: JSON.stringify({collection:"log",pipeline:mongoTech})},

            }).done(function(result) {
                
                result = JSON.parse(result)       
			
                				
                self.techsByClan(result);            
				
				$(function () {
					$('[data-toggle="tooltip"]').tooltip()
				  })
				hideLoader("body");
				allowNav();
            });

	}	
	// Donne le nombre de fois que chaque clan a été joué en 2V2 ou 
	techsByClan(queryResult){
		var html = '<div class="row"><div class="col-md-12" ><H3>GENERAL</H3></div></div>';
		html += '<div class="row"><div class="col-md-12 techtree" id="main-globaltechs"></div></div>';
		$('#main').append(html);
		var aTechs = [];
		var aTechsGlobal = [];
		var nbGamesByClan = [];
		
		for (var k in queryResult){
			var clan = queryResult[k].clan;
			// var version = queryResult[k].version;
			var techs = queryResult[k].tech;
			
			if(nbGamesByClan == undefined)
				nbGamesByClan= [];
			if(nbGamesByClan[clan] == undefined)
				nbGamesByClan[clan] = 0;
			nbGamesByClan[clan]++;

			if(aTechs ==  undefined)
				aTechs = [];
			if(aTechs[clan] == undefined)
				aTechs[clan] = [];
			if(aTechsGlobal == undefined)
				aTechsGlobal = [];
				

			var techSumPos = 0;
			for( var k in techs ){
				techSumPos++;

				

				if(aTechs[clan][techs[k]] == undefined){
					aTechs[clan][techs[k]] = []
					aTechs[clan][techs[k]]["count"] = 0
					aTechs[clan][techs[k]]["sumPos"] = 0
				}
					
				aTechs[clan][techs[k]]["count"] ++;
				aTechs[clan][techs[k]]["sumPos"] += techSumPos;

				if(aTechsGlobal[techs[k]] == undefined)
					aTechsGlobal[techs[k]] = [];

				if(aTechsGlobal[techs[k]]["count"] == undefined)
					aTechsGlobal[techs[k]]["count"] = 0;

				if(aTechsGlobal[techs[k]]["who"] == undefined)
					aTechsGlobal[techs[k]]["who"] = []

				if(aTechsGlobal[techs[k]]["who"][clan] == undefined)
					aTechsGlobal[techs[k]]["who"][clan] = 0

				aTechsGlobal[techs[k]]["count"] ++;
				aTechsGlobal[techs[k]]["who"][clan] ++;
				
			}		

		}

		
		// global
		var lineTop = 0;
		for(var lineTech in _GENERAL_TECHS ){
			lineTop += 100;
			for (var genTech in _GENERAL_TECHS[lineTech]){
				var nbUsedTech = 0;
				var percentUsage = 0;
				if (aTechsGlobal[genTech] != undefined) {
					if (aTechsGlobal[genTech]["count"] != undefined)
						nbUsedTech = aTechsGlobal[genTech]["count"];
					var nbConcernedGames = 0;
					for(var kclan in aTechsGlobal[genTech]["who"]){
						nbConcernedGames += nbGamesByClan[kclan];
					}
					var percentUsage = Math.round((nbUsedTech * 10000)/nbConcernedGames) / 100;
				}
				
				var divTop = 0;
				var divLeft = 20;
				if(_GENERAL_TECHS[lineTech][genTech].Ter == 0){
					divTop = lineTop;					
				}else{
					if(_GENERAL_TECHS[lineTech][genTech].Place == 1)
						divTop = lineTop - 20;
					if(_GENERAL_TECHS[lineTech][genTech].Place == 2)
						divTop = lineTop + 20;
				}
				
				if(_GENERAL_TECHS[lineTech][genTech].Ter == 1){
					divLeft = 270;					
				}

				if(_GENERAL_TECHS[lineTech][genTech].Ter == 2){
					divLeft = 520;
				}

				if(_GENERAL_TECHS[lineTech][genTech].Ter == 3){
					divLeft = 770;
				}

				var lowClass="";
				if(percentUsage < 20)
					lowClass+=" low";
				else if(percentUsage < 30)
					lowClass+=" quitelow";
				if(percentUsage > 70)
					lowClass+=" high";

				var html = "<div data-toggle='tooltip' title='nb tech:"+nbUsedTech+" / nbGames:"+nbConcernedGames+"' class='ng-tech' style='margin-top : "+divTop+"px; margin-left : "+divLeft+"px;'><span class='tech-label' >"+genTech+" : </span><span class='tech-percentage "+lowClass+"'> "+percentUsage+"%</span></div>";
				var madiv = $('#main-globaltechs').append(html);							
			}

		}
	
	// par clan
	
	for (var selectedClan in _CLANS){
		var html = '<div class="row"><div class="col-md-12" ><H3>'+_CLANS[selectedClan]+'</H3></div></div>';
		html += '<div class="row"><div class="col-md-12 techtree" id="main-techs-'+_CLANS[selectedClan]+'"></div></div>';
		$('#main').append(html);
		var selectedClanTechs = jQuery.extend(true, {}, _GENERAL_TECHS);
				
				
				if(_SPECIAL_TECHS[_CLANS[selectedClan]] != undefined){
					for( var specTech in _SPECIAL_TECHS[_CLANS[selectedClan]]){            
						for(var line in _GENERAL_TECHS){
							for(var tech in _GENERAL_TECHS[line]){                                          								
								if(tech ==  _SPECIAL_TECHS[_CLANS[selectedClan]][specTech].Replace){                          
									selectedClanTechs[line][specTech] = selectedClanTechs[line][tech];
									selectedClanTechs[line][specTech].Spec = 1;
									delete selectedClanTechs[line][tech];
								}
							}
						}               
					}             
				}   
		
		
				lineTop = 0;
				for(var lineTech in selectedClanTechs ){
					lineTop += 100;
					for (var genTech in selectedClanTechs[lineTech]){
						var nbUsedTech = 0;
						var percentUsage = 0;
						if (aTechs[_CLANS[selectedClan]][genTech] != undefined) {
							if (aTechs[_CLANS[selectedClan]][genTech]["count"] != undefined)
								nbUsedTech = aTechs[_CLANS[selectedClan]][genTech]["count"];
							var nbConcernedGames = 0;							
							nbConcernedGames = nbGamesByClan[_CLANS[selectedClan]];							
							var percentUsage = Math.round((nbUsedTech * 10000)/nbConcernedGames) / 100;
						}
						
						var divTop = 0;
						var divLeft = 20;
						if(selectedClanTechs[lineTech][genTech].Ter == 0){
							divTop = lineTop;					
						}else{
							if(selectedClanTechs[lineTech][genTech].Place == 1)
								divTop = lineTop - 20;
							if(selectedClanTechs[lineTech][genTech].Place == 2)
								divTop = lineTop + 20;
						}
						
						if(selectedClanTechs[lineTech][genTech].Ter == 1){
							divLeft = 270;					
						}
		
						if(selectedClanTechs[lineTech][genTech].Ter == 2){
							divLeft = 520;
						}
		
						if(selectedClanTechs[lineTech][genTech].Ter == 3){
							divLeft = 770;
						}
		
						var lowClass="";
						var panelClass="";
						if(percentUsage < 20)
							lowClass+=" low";
						else if(percentUsage < 30)
							lowClass+=" quitelow";
						if(percentUsage > 70)
							lowClass+=" high";
							
						
						if(selectedClanTechs[lineTech][genTech].Spec == 1){
							panelClass +=" spec";
						}
						var html = "<div data-toggle='tooltip' title='nb tech:"+nbUsedTech+" / nbGames:"+nbConcernedGames+"' class='ng-tech "+panelClass+"' style='margin-top : "+divTop+"px; margin-left : "+divLeft+"px;'><span class='tech-label' >"+genTech+" : </span><span class='tech-percentage "+lowClass+"'> "+percentUsage+"%</span></div>";
						var madiv = $('#main-techs-'+_CLANS[selectedClan]+'').append(html);							
					}
		
				}

				
		}
	}

}