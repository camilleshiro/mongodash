class errorPage {
    showErrorsPage(version){

        var btversion = "<div class='row'><div class='col-md-12'><input type='text' value="+version+" id='numversion'/><button class='btn btn-primary' id='launchsearch'>GO !</button></div></div>"
        btversion += "<div class='row' id='mongoresult'></div>"
        $('#main').html(btversion);
        
        $('#launchsearch').on('click', function(){
            var pageErreur = new errorPage();
            pageErreur.showErrorsPage($('#numversion').val());
        })

        $("#numversion").keyup(function(e){ 
            var code = e.which; 
            if(code==13)e.preventDefault();
            if(code==32||code==13||code==188||code==186){
                var pageErreur = new errorPage();
                pageErreur.showErrorsPage($('#numversion').val());
                
            } 
        });



        if(version == null) return;
        showLoader("body");
        var toHtml = new statToHtml();
        var objMongo = new mongoQuery();
        var mongoErrorsByVersion = objMongo.getErrorsByVersion(String(version));
        $.ajax({
        url: "aggregate",
        data: {args: JSON.stringify({collection:"error",pipeline:mongoErrorsByVersion})},

        }).done(function(result) {
            
            result = JSON.parse(result)     
            
            
            if(result && result.length){
                toHtml.errors(result, version)
                $('#myerrors').DataTable();                

                $( document ).on( "dblclick", ".error-record", function() {                    
                    var key = $(this).attr("record-key");
                    var col = $(this).attr("col-name");
                   
                    
                    if(col == "stacks"){
                        console.info(result[key][col][0]);
                        for (var stack in result[key][col][0]){
                            console.info(stack)
                            $('#error-content').html(result[key][col][0][stack] + "</br>");                  
                        }
                    }                    
                    else{
                        $('#error-content').html(result[key][col]);                  
                    }


                });
                
            }

            

            hideLoader("body");
            
            
            allowNav();

           
        });
    }

    
    
}
