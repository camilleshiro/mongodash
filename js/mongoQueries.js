class mongoQuery {
	getVersions(){
        var machainemongo = [
            {$match:{ kind:"start"}},
            {$group:
                { _id : { version : "$version"}
                ,count:{$sum:1}
                }
             }, 
             
             {$project:{version:"$_id.version", count:"$count",_id:0}},
             
        ];	
        return(machainemongo);
    }


	getPlayedGamesByClan()
	{
        var machainemongo = [
            {$match:{
            kind:"end",
            
            time: { $gt : 20 },
            playerCount : { $gt : 1 },
            $and: [
                { mode:{$regex:"Team"}},
                { mode : {$regex:"^((?!2V2V2).)*$" } },
            ],
            allowedVictories:127,
        }},
            {$group:
                { _id : {
                    clan : "$clan",
                    version : "$version"
                    },
                    count:{$sum:1}
                }
            },
        
            {$sort:{count : -1}},
            {$project:{
                clan:"$_id.clan",
                version:"$_id.version",
                count:"$count",
                _id:0
            }}    
        ];	
	return(machainemongo);
	}


	getWinRateClan()
	{
			
	var returnArray = 	[
        {$match:{
            
            kind:"end",
            time: { $gt : 20 },
            //playerCount : { $gt : 1 },
            playerCount : 2 ,
            $and: [ 
                { mode:{$regex:"FreeForAll" }},
                //{ mode : {$regex:"^((?!2V2V2).)*$" } },
            ],
            allowedVictories:127,
        }},
        {$group:
            { _id : { win : "$win", clan : "$clan", version : "$version" },
              count:{$sum:1}
            }
        },
        {$sort:{ clan : -1 }},
        {$project:{version:"$_id.version", clan:"$_id.clan", win:"$_id.win", count:"$count",_id:0, areEqual: {$eq: ["$playerCount", "$totalClans"]}}},
        //{$project: {uid:"$uid", kind:"$kind", version:"$version", clan:"$clan", totalClans:"$totalClans", playerCount:"$playerCount", win:"$_id.win", count:"$count", areEqual: {$eq: ["$playerCount", "$totalClans"]}}},    
        {$match : {"areEqual":true}},
    ];
    
		
	
		
		
	return(returnArray);
	}
    
    getGameTypes(){
        var returnArray = 	[
            {$match:{ kind:"start" }},
            {$group:
                { _id : { mode : "$mode"}
                  ,count:{$sum:1}
                }
             },
             {$sort:{ version : -1 }},
             {$project:{version:"$_id.mode", count:"$count",_id:0}}
        ];
        
            
        
            
            
        return(returnArray);   
    }

    getTakenTech(tech, eclan){
        var returnArray =  [
            {$match:{
                
                kind:"end",
                clan:eclan,
                time: { $gt : 20 },
                playerCount : { $gt : 1 },
                $and: [ 
                    { mode:{$regex:"Team"} },
                    { mode : {$regex:"^((?!2V2V2).)*$" } },
                ],
                allowedVictories:127,
                techTree:{$regex:tech},
            }},
            {$group:
                { _id : { clan : "$clan" , version : "$version"},
                
                  count:{$sum:1}
                }
            },
            {$project:{
        clan:"$_id.clan", 
        count:"$count",
        version:"$_id.version",
        _id:0
            }}    
        ];
        
        return(returnArray);   
    }



    getAllTakenTechs(versions){
        
        var tabVersion = [];
        for (var k in versions){
            tabVersion.push(versions[k]);
        }
        
        var returnArray = [
            {$match:{
                // ### PENSER A REMETTRE LE TAB DE VERSION
                version: {$in : tabVersion},
                //version: "0.3.6656-beta",
                
                kind:"end",
                time: { $gt : 20 },
                playerCount : { $gt : 1 },
                $and: [ 
                    { mode:{$regex:"Team"} },
                    { mode : {$regex:"^((?!2V2V2).)*$" } },
                ],
                
                allowedVictories:127,
                
            }},
            
            {$project:{
        clan:"$clan", 
        tech:"$techTree",
        version:"$version",
        kind:"$kind",
        _id:0
            }}    
        ];
        
    return(returnArray);
    
}
    


getErrorsByVersion(version){
    var machainemongo = [
        
            {$match:{version:{$regex:version },ecount:1}},
            {$group:
                { _id : { msg : "$msg", call : { $arrayElemAt : [{ $split : ["$stack","\n"] },1] } }
                  ,count:{$sum:1}
                  ,version:{$max:"$version"}
                  ,devices:{$addToSet:"$device"}
                  ,users:{$addToSet:"$uid"}
                  ,stacks:{$addToSet:{$split:["$stack","\n"]}}
                }
             },
             {$addFields:{userCount:{$size:"$users"}}},
             {$sort:{ userCount : -1 }},
             {$project:{count:"$count",version:"$version",msg:"$_id.msg",call:"$_id.call",_id:0,devices:1,stacks:1,users:1}}
        
    
    ];	
    return(machainemongo);
}



}


   
