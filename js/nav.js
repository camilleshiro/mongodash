

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
			var htmlString =   '<div class="row"><div class="col-md-6"><div id="clans-win" style="width:100%; height:400px;"></div></div><div class="col-md-6"><div id="clans-winrate-bymonth" style="width:100%; height:400px;"></div></div></div>'
			$('#main').html(htmlString);		
			var stat = new statsClans();
			stat.clansWin();		
			
			break;
		case "menu-autrestat" :
			
			var stat = new statsClans();
			
			stat.clansPlayed();
			$("#main").html("");
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