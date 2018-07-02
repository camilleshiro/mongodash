
class statsClans {
	
	
	// Donne le nombre de fois que chaque clan a été joué en 2V2 ou 
	clansPlayed(queryResult){
		var statData = [];
		var tempArray = [];
		var statX = [];
		var dataClans = [];
			
		for (var key in queryResult){	
			if (tempArray[queryResult[key].version] == undefined)
				tempArray[queryResult[key].version] = [];			
			tempArray[queryResult[key].version][queryResult[key].clan] = queryResult[key].count;			
		}
		
		for(var k in _CLANS){		
			dataClans[_CLANS[k]] = [];
		}
		
		for (var kversion in tempArray){
			statX.push(kversion); 
			for(var kclan in dataClans){
				if(tempArray[kversion][kclan] == undefined){					
					dataClans[kclan].push(0);
				}else{
					dataClans[kclan].push(tempArray[kversion][kclan]);
				}
			}		
		}	
		
		for (var kclan in dataClans){			
			statData.push(
				{
					name : kclan,
					data : dataClans[kclan]
				})			
		}

		var myChart = Highcharts.chart('clans-played', {
			chart : {
			type : 'column'
			},
			title: {
				text: 'Games by Clan'
			},
			plotOptions: {				
				line: {
						dataLabels: {
							enabled: true
						},
						
				},
				column: {
					allowPointSelect: true,
					cursor: 'pointer',
					animation: {duration : 300},
					dataLabels: {
						enabled: true,						
						style: {
							color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
						}
					}
				}
			},
			xAxis: {
				categories: statX,
			},
			series: statData
			
		});

		
	}
		

	

	clansWinRate(queryResult){
		
		var statData = [];
		var tempArray = [];
		var statX = [];
		console.info(queryResult);
		//var nbParties = count(queryResult);

		for (var key in queryResult){
			//magnifique construction d'un tableau permettant de calculer les % de win ....
			if (tempArray[queryResult[key].version] == undefined)
				tempArray[queryResult[key].version] = [];
			if (tempArray[queryResult[key].version][queryResult[key].clan] == undefined)
				tempArray[queryResult[key].version][queryResult[key].clan] = []
			tempArray[queryResult[key].version][queryResult[key].clan][queryResult[key].win] = queryResult[key].count;			
		}
		
		var dataClans = [];
		for(var k in _CLANS){		
			dataClans[_CLANS[k]] = [];
		}

		for (var kversion in tempArray){
			statX.push(kversion); 
			for(var kclan in dataClans ){
				if(tempArray[kversion][kclan] == undefined){					
					percent = 0;
				}else{
					for (var kwin in tempArray[kversion][kclan] ){
						if(kwin == "true"){
							var win = tempArray[kversion][kclan][kwin];
						}else{
							var loose = tempArray[kversion][kclan][kwin];
						}
					}
					
					var percent = Math.round((100 * parseInt(win) / (parseInt(win)+parseInt(loose))));	
				}
				
				
				if(dataClans[kclan] == undefined)
					dataClans[kclan] = [];
				dataClans[kclan].push(percent);
			}
			
			
		}

		
	
	for (var kclan in dataClans){
		
		statData.push(
			{
				name : kclan,
				data : dataClans[kclan]
			})
		
	}


		var myChart = Highcharts.chart('clans-winrate', {
			chart : {
			type : 'column'
			},
			title: {
				text: 'Clan winrate by Major version'
			},
			plotOptions: {				
				line: {
						dataLabels: {
							enabled: true
						},
						
				},
				column: {
					allowPointSelect: true,
					cursor: 'pointer',
					animation: {duration : 300},
					dataLabels: {
						enabled: true,						
						style: {
							color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
						}
					}
				}
			},
			xAxis: {
				categories: statX,
			},
			series: statData
			
		});

		
	}

}