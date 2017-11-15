

$(document).ready(function(){
	
	createMenu();
	goHome();
	
	$(".nav-link").on('click', function(){
		displayMenu($(this).attr("id"));
	});	
});

function activateMenu(e){
	
	$(".nav-link").removeClass("active");
	$("#"+e).addClass("active");
}

function goHome(){
	$("#main").html("");
	$(".nav-link").removeClass("active");
	$("#menu-home").addClass("active");




}

function displayMenu(menuId){
	activateMenu(menuId);
	switch(menuId) {		
		case "menu-statclan" :	
			showLoader();
			setTimeout(function(){
				
				var htmlString =   '<div class="row"><div class="col-md-6"><div id="clans-win" style="width:100%; height:400px;"></div></div><div class="col-md-6"><div id="clans-played" style="width:100%; height:400px;"></div></div></div>';
				

				$('#main').html(htmlString);		
				var stat = new statsClans();
				stat.clansWin();		
				stat.clansPlayed();
				hideLoader();
			}, 2000);		
			
			
			break;

		case "menu-autrestat" :

		// ### PB Authetincate
			var machainemongo = [
				{$match:{
					version:{$regex:"0\.3."},
					kind:"end",
					time: { $gt : 20 },
					playerCount : { $gt : 2 },
					$and: [ 
						{ mode:{$regex:"Team"}},
						{ mode : {$regex:"^((?!2V2V2).)*$" } },
					],
					allowedVictories:127,
					
				}},
				{$group:
					{ _id : { clan : "$clan" },
					count:{$sum:1}
					}
				},
				{$project:{
					clan:"$_id.clan", 
					count:"$count",
					_id:0
				}}    
			];
		
			showLoader();
			$.ajax({
				url: "/aggregate",
				data: {args: JSON.stringify({collection:"log",pipeline:machainemongo})},

			}).done(function(data) {
				hideLoader();
				console.info(data);
			});
			break;
			
		default :
			goHome();
	}
}
	
function createMenu(){
	var menu = {
		"menu-home" : "HOME",
		"menu-statclan" : "Statistiques Clans",
		"menu-autrestat" : "Autre Stat"
	}
	
	for (var key in menu){		
		var tabString = "<li class='nav-item'><a id='"+key+"' class='nav-link' href='#'>"+menu[key]+"</a></li>"
		
		$('#main-menu').append(tabString);
		
	}
}

function showLoader(){
	$('#loader').show();
}

function hideLoader(){
	$('#loader').hide();
}

