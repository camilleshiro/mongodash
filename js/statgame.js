class statsGames {


    gameType(queryResult){
		var statData = [];		
		var statX = [];
		var totalGames = 0;
        
        for (var key in queryResult){
            if(queryResult[key].version != null){
                totalGames += queryResult[key].count;
            }
        }

        for (var key in queryResult){
            if(queryResult[key].version != null){
                statX.push(queryResult[key].version);
                statData.push({
                    name : queryResult[key].version,
                    y : queryResult[key].count,
                    percentage : Math.round((queryResult[key].count * 10000) / totalGames) / 100
                })
            }

        }
        

		



        Highcharts.chart('game-type', {
            chart: {
                type: 'bar'
            },
            title: {
                text: 'Games types'
            },
            subtitle: {
                text: 'Parties - Total : '+totalGames
            },
            
            xAxis: {
				categories: statX,
			},
            tooltip: {
                valueSuffix: ' millions'
            },
            plotOptions: {
                bar: {
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.y}</b> - {point.percentage:.1f} %',
                    }
                }
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'top',
                x: -40,
                y: 80,
                floating: true,
                borderWidth: 1,
                backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
                shadow: true
            },
            credits: {
                enabled: false
            },
            series: [{
                showInLegend: false, 
				name : 'Parties - Total : '+totalGames,
                colorByPoint: true,               
				data: statData
			}]
        });
		
	}
}