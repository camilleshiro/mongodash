
class statPage {
    showGlobalNgPage(){                
					
        var htmlString =   '<div class="row"><div class="col-md-6"><div id="game-type" style="width:100%; height:400px;"></div></div><div class="col-md-6"><div id="clans-played" style="width:100%; height:400px;"></div></div></div>';
        htmlString +=   '<div class="row"><div class="col-md-6"><div id="clans-winrate" style="width:100%; height:400px;"></div></div><div class="col-md-6"><div id="" style="width:100%; height:400px;"></div></div></div>';

        $('#main').html(htmlString);	
        var objMongo = new mongoQuery();
        var stat = new statsClans();
        var statGame = new statsGames();
        

        // Chargement des versions
        
        showLoader("body");
        var mongoVersions = objMongo.getVersions();
        var versions = {};
        $.ajax({
            url: "aggregate",
            data: {args: JSON.stringify({collection:"log",pipeline:mongoVersions})},

        }).done(function(result) {
            versions = JSON.parse(result);
            
            hideLoader("body");

            var goodVersions = versions.filter(
                function (value) {
                    return (value.count > 10000);
                }
            );      


            // Stats by game type
            showLoader("#game-type");
            var mongoGamesTypes = objMongo.getGameTypes();
            $.ajax({
                url: "aggregate",
                data: {args: JSON.stringify({collection:"log",pipeline:mongoGamesTypes})},

            }).done(function(result) {
                result = JSON.parse(result)                            
                		
                statGame.gameType(result);            
                hideLoader("#game-type");
            });




            // Stats games played by clan / version 
            showLoader("#clans-played");
            var mongoGamesByClan = objMongo.getPlayedGamesByClan();
            $.ajax({
                url: "aggregate",
                data: {args: JSON.stringify({collection:"log",pipeline:mongoGamesByClan})},

            }).done(function(result) {
                result = JSON.parse(result)
                var filteredResult = result.filter(
                    function (value) {
                        for(var key in goodVersions){
                            
                            if(goodVersions[key].version == value.version)
                                return true
                        }
                        return false;
                    }
                );               
                	
                stat.clansPlayed(filteredResult);            
                hideLoader("#clans-played");
            });


            // Stats winrate by clan / version
            showLoader("#clans-winrate");
            var mongoWinrateByClan = objMongo.getWinRateClan();
            $.ajax({
                url: "aggregate",
                data: {args: JSON.stringify({collection:"log",pipeline:mongoWinrateByClan})},

            }).done(function(result) {      
                
                result = JSON.parse(result);
                var filteredResult = result.filter(
                    function (value) {
                        for(var key in goodVersions){
                            
                            if(goodVersions[key].version == value.version)
                                return true
                        }
                        return false;
                    }
                );
                
                stat.clansWinRate(filteredResult);
                hideLoader("#clans-winrate");
            });




        });    
    
        
    }

    showByClanPage(clan){   
        var statTech = new statsTechs();
        var selectedClanTechs = jQuery.extend(true, {}, _GENERAL_TECHS);

        if(_SPECIAL_TECHS[clan] != undefined){
            for( var specTech in _SPECIAL_TECHS[clan]){            
                for(var line in _GENERAL_TECHS){
                    for(var tech in _GENERAL_TECHS[line]){                                          
                        if(tech ==  _SPECIAL_TECHS[clan][specTech].Replace){                          
                            selectedClanTechs[line][specTech] = selectedClanTechs[line][tech];
                            delete selectedClanTechs[line][tech];
                        }
                    }
                }               
            }             
        }   
        
        // Chargement des versions
        var objMongo = new mongoQuery();
        showLoader("body");
        blockNav();
        var mongoVersions = objMongo.getVersions();
        var versions = {};
        
        $.ajax({
            url: "aggregate",
            data: {args: JSON.stringify({collection:"log",pipeline:mongoVersions})},

        }).done(function(result) {
            
            versions = JSON.parse(result);
            console.log(versions);
            

            var goodVersions = versions.filter(
                function (value) {
                    return (value.count > 20000);
                }
            );     
            
            console.log(goodVersions);
            var html = '<div class="row"><div class="col-md-12" id="main-versionschoice"></div></div>';
            var group = '<div class="btn-group" data-toggle="buttons"></div>'
            $('#main').append(html);
            $('#main-versionschoice').append(group);


            for(var v in goodVersions){
                var line = "<label class='btn btn-primary'><input type='checkbox' autocomplete='off' value='"+goodVersions[v].version+"'>"+goodVersions[v].version+"</label>";
                $('#main-versionschoice .btn-group').append(line);
            }

            var buttonsearch = "<input id='bt-search-techs' class='btn btn-primary'  type='button' value='Search' />";            
            $('#main-versionschoice').append(buttonsearch);

            
            hideLoader("body");
            allowNav();
            
            $('#bt-search-techs').on('click', function(){
                var checkedVersions = [];
                $('.btn-group label.active input[type="checkbox"]').each(function(){
                    checkedVersions.push($(this).val());
                });
                
                statTech.search(checkedVersions);
            });

        });   




    }

}