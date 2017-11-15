
class statsClans {
	// Donne le nombre de fois que chaque clan a été joué en 2V2 ou 
	clansPlayed(){
		var obj = new mongoQuery();
		
		var queryResult = obj.getPlayedGamesByClan();
		var statData = [];
		var statX = [];
		for (var key in queryResult){
			statData.push({name : queryResult[key].clan, y : queryResult[key].count})		
			statX.push(queryResult[key].clan);
		}
		console.log(statData);
		var myChart = Highcharts.chart('clans-played', {
			chart: {
				type: 'column'
			},
			title: {
				text: 'Games by clan'
			},
			plotOptions: {
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
			series: [{
				
				colorByPoint: true,
				data: statData
			}]
		});
		

	}
	
	// donne le pourcentage de victoire VS défaites, par clan.
	clansWin(){
		var myChart = Highcharts.chart('clans-win', {
			chart: {
				type: 'pie'
			},
			title: {
				text: 'Victories by clan'
			},
			plotOptions: {
				pie: {
					allowPointSelect: true,
					cursor: 'pointer',
					animation: {duration : 300},
					dataLabels: {
						enabled: true,
						format: '<b>{point.name}</b>: {point.percentage:.1f} %',
						style: {
							color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
						}
					}
				}
			},
			series: [{
				name: 'Clans',
				colorByPoint: true,
				data: [
					{name : 'Wolf', y : 10},
					{name : 'Stag', y : 12},
					{name : 'Goat', y : 15},
					{name : 'Raven', y : 18},
					{name : 'Bear', y : 15},
					{name : 'Boar', y : 30, sliced: true},
				]
			}]
		});
	};


	/*
		// clans win
		$(function () { 
		
	});

	// winrate par clan par mois
	$(function () { 
		var myChart = Highcharts.chart('clans-winrate-bymonth', {
			chart : {
			type : 'column'
			},
			title: {
				text: 'Clan winrate by month'
			},
			plotOptions: {
			line: {
				dataLabels: {
					enabled: true
				},
				//enableMouseTracking: false
			}
		},
			xAxis: {
				categories: ['0.2.5750', '0.3.6100', '0.3.6420', '0.3.6590']
			},
			
			series: [{
				name: 'Wolf',			
				data: [49, 43, 45, 46]		
			}, 
			{
				name: 'Stag',			
				data: [48, 41, 58, 50]		
			},
			{
				name: 'Goat',			
				data: [52, 50, 44, 42]			
			},
			{
				name: 'Raven',			
				data: [51, 48, 49, 52]			
			},
			{
				name: 'Bear',			
				data: [0, 48, 54, 52]			
			},
			{
				name: 'Boar',			
				data: [0, 0, 0, 50]		
			}
			]
		});
	});*/
}