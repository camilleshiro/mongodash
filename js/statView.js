class statView {
    pie(Statdata, target){
        var myChart = Highcharts.chart(target, {
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
    }
}