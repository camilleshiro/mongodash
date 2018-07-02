class statToHtml {
    errors(result, version){

        var cols = ["devices", "users", "stacks","count","version","msg", "call"]; 
        
        var html ='<div class="col-md-6"><table id="myerrors" class="table table-striped table-bordered dt-responsive nowrap" cellspacing="0" width="100%"><thead><tr></tr></thead><tbody></tbody></table></div><div class="col-md-6"><div id="error-content"></div></div>';
        ///var html ='<div class="col-md-6"><table class="table">  <thead>    <tr>      <th>#</th>      <th>First Name</th>      <th>Last Name</th>      <th>Username</th>    </tr>  </thead>  <tbody>    <tr>      <th scope="row">1</th>      <td>Mark</td>      <td>Otto</td>      <td>@mdo</td>    </tr>    <tr>      <th scope="row">2</th>      <td>Jacob</td>      <td>Thornton</td>      <td>@fat</td>    </tr>    <tr>      <th scope="row">3</th>      <td>Larry</td>      <td>the Bird</td>      <td>@twitter</td>    </tr>  </tbody></table></div>';


        
        $('#mongoresult').html(html);
        var writeHeaders = true;
        for(var key in result){            
            
            if(writeHeaders == true){                                
                writeHeaders = false;                    
                for(var col in cols){                                                            
                   $('#myerrors thead tr').append('<th id=th-'+cols[col]+'>'+cols[col]+'</th>')                    
                }
            }


            
            
            var tds="";
            for(var col in cols){
                
                var myString = String(result[key][cols[col]]);                
                
                var myTruncatedString = myString;
                if(cols[col] == "users" || cols[col] == "devices" || cols[col] == "stacks" || cols[col] == "msg" || cols[col] == "call")
                    myTruncatedString = myString.substring(0,20) + "...";
                tds += '<td class="error-record" record-key='+key+' col-name='+cols[col]+' >'+htmlEntities(myTruncatedString)+'</td>';                                        
                  
               
            }

            $('#myerrors tbody').append('<tr record-key='+key+'>'+tds+'</tr>');
           
           
        }      

      
    }

}