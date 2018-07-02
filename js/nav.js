

$(document).ready(function(){	
	createMenu();
	goHome();
	
	$(".nav-link").on('click', function(){
		displayMenu($(this).attr("id"));
	});	

	

});

function activateMenu(e){	
	
	$("#"+e).parent().parent().children(".nav-item").children(".nav-link").removeClass("active");
	$("#"+e).addClass("active");
}

function goHome(){
	$("#main").html("");
	$(".nav-link").removeClass("active");
	$("#menu-home").addClass("active");

}

function displayMenu(menuId){
	$('#main').html("");
	$('.submenu').html("");
	$('.submenu').hide();
	activateMenu(menuId);

	switch(menuId) {		
		case "menu-globalng" :
			var pageStat = new statPage();
			pageStat.showGlobalNgPage();		
			break;

		case "menu-techs" :			
			var pageStat = new statPage();
			pageStat.showByClanPage($(this).attr("id"));			
			break;
		case "menu-errors" :
			var pageErreur = new errorPage();
			pageErreur.showErrorsPage();
			break;
			
		default :
			goHome();
	}
}
	
function createMenu(){
	var menu = {
		"menu-home" : "HOME",
		"menu-globalng" : "Global Northgard",
		"menu-techs" : "Techs",
		"menu-errors" : "Erreurs"
	}
	
	for (var key in menu){		
		var tabString = "<li class='nav-item'><a id='"+key+"' class='nav-link' href='#'>"+menu[key]+"</a></li>"
		
		$('#main-menu').append(tabString);
		
	}
}

function showLoader(e){	
	$('#main-loader .loader').clone().appendTo( $(e))
	$(e + " .loader").show();
}

function hideLoader(e){
	$(e + " .loader").hide();
}

function blockNav(){	
	$('#cachetout').show();
}

function allowNav(){
	$('#cachetout').hide();
}

