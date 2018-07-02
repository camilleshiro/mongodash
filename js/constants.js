var _CLANS = ["Wolf", "Goat", "Stag","Raven","Bear","Boar"]; 

var _TEMPTABLE = [];

var _GENERAL_TECHS =  {
    "Growth": {
        // Growth, TER 0
        "Lumber" : {               
            "Ter" : 0,
            "Place" : 1,
            "Spec" : 0
        },
        // Growth, TER 1
        "Colonize" : {                    
            "Ter" : 1,
            "Place" : 1,
            "Spec" : 0
        },
        "Mining" : {                    
            "Ter" : 1,
            "Place" : 2,
            "Spec" : 0
        },
        // Growth, TER 2
        "Recruit" : {                    
            "Ter" : 2,
            "Place" : 1,
            "Spec" : 0
        },
        "Medecine" : {                    
            "Ter" : 2,
            "Place" : 2,
            "Spec" : 0
        },
        // Growth, TER 3
        "HeartStone" : {                    
            "Ter" : 3,
            "Place" : 1,
            "Spec" : 0
        },
        "SlotGrowth" : {                    
            "Ter" : 3,
            "Place" : 2,
            "Spec" : 0
        },
    },
    "Might": {
        // Might, TER 0
        "Weaponsmith" : {               
            "Ter" : 0,
            "Place" : 1,
            "Spec" : 0
        },
        // Might, TER 1
        "Coats" : {               
            "Ter" : 1,
            "Place" : 1,
            "Spec" : 0
        },
        "Defense" : {               
            "Ter" : 1,
            "Place" : 2,
            "Spec" : 0
        },
        // Might, TER 2
        "MilitaryStrategy" : {               
            "Ter" : 2,
            "Place" : 1,
            "Spec" : 0
        },
        "Security" : {               
            "Ter" : 2,
            "Place" : 2,
            "Spec" : 0
        },
        // Might, TER 3
        "Heroes" : {               
            "Ter" : 3,
            "Place" : 1,
            "Spec" : 0
        },
        "MonsterSlayer" : {               
            "Ter" : 3,
            "Place" : 2,
            "Spec" : 0
        },


    },
    "Wealth": {
        // Wealth, TER 0
        "ImprovedHall" : {               
            "Ter" : 0,
            "Place" : 1,
            "Spec" : 0
        },
        // Wealth, TER 1
        "Drakkars" : {               
            "Ter" : 1,
            "Place" : 1,
            "Spec" : 0
        },
        "Coinage" : {               
            "Ter" : 1,
            "Place" : 2,
            "Spec" : 0
        },
        // Wealth, TER 2
        "Knowledge" : {               
            "Ter" : 2,
            "Place" : 1,
            "Spec" : 0
        },
        "Upgrades" : {               
            "Ter" : 2,
            "Place" : 2,
            "Spec" : 0
        },
        // Wealth, TER 3
        "Negociate" : {               
            "Ter" : 3,
            "Place" : 1,
            "Spec" : 0
        },
        "SlotWealth" : {               
            "Ter" : 3,
            "Place" : 2,
            "Spec" : 0
        },
        

    }

    
};


var _SPECIAL_TECHS = {
    "Wolf" : {
        "Ascetic" : {    
            "Replace" : "SlotGrowth"
        },
        "Pillage" : {    
            "Replace" : "Defense"
        },
        "Plunder" : {    
            "Replace" : "Security"
        },
        "Conqueror" : {    
            "Replace" : "MonsterSlayer"
        },
        "Threats" : {    
            "Replace" : "SlotWealth"
        },        
    },
    "Goat" : {
        "MoreAssign" : {    
            "Replace" : "SlotGrowth"
        },
        "HomeCook" : {    
            "Replace" : "Colonize"
        },
        "MoreBuildings" : {    
            "Replace" : "Drakkars"
        },
        "Barricades" : {    
            "Replace" : "Defense"
        },
        "FoodTrade" : {    
            "Replace" : "SlotWealth"
        },
    }, 
    "Stag" : {
        "BetterSilo" : {    
            "Replace" : "Recruit"
        },
        "BuildingUpkeep" : {    
            "Replace" : "SlotGrowth"
        },
        "ProudStag" : {    
            "Replace" : "MilitaryStrategy"
        },
        "GreatDeeds" : {    
            "Replace" : "Drakkars"
        },
        "GloryClan" : {    
            "Replace" : "SlotWealth"
        },   
    },
    "Raven" : {
        "Rangers" : {    
            "Replace" : "Colonize"
        },
        "GreatRoutes" : {    
            "Replace" : "Negociate"
        },
        "MilitaryFunds" : {    
            "Replace" : "MilitaryStrategy"
        },
        "GreatExplorers" : {    
            "Replace" : "SlotGrowth"
        },
        "Wealth" : {    
            "Replace" : "SlotWealth"
        },   
    },
    "Bear" : {
        "Hibernate" : {    
            "Replace" : "Medecine"
        },
        "LandProtect" : {    
            "Replace" : "Coats"
        },
        "ShieldMaster" : {    
            "Replace" : "Security"
        },
        "Harpoons" : {    
            "Replace" : "SlotGrowth"
        },
        "WinterFestival" : {    
            "Replace" : "SlotWealth"
        },   
    },
    "Boar" : {
        "Bartering" : {    
            "Replace" : "ImprovedHall"
        }, 
        "LayLayLand" : {    
            "Replace" : "Mining"
        },
        "SimpleLiving" : {    
            "Replace" : "Coinage"
        },
        "Herbalism" : {    
            "Replace" : "Medecine"
        },
        "Handiwork" : {    
            "Replace" : "Upgrades"
        },
        "Legacy" : {    
            "Replace" : "SlotGrowth"
        },   
        "Osmosis" : {    
            "Replace" : "SlotWealth"
        },  
         
    },
    
    
       
}




/*
var _GENERAL_TECHS =  {
    "Growth": {
        "Lumber" : {               
            "Ter" : 0,
            "Place" : 1,
            "Spec" : 0
        },
        "Colonize" : {                    
            "Ter" : 1,
            "Place" : 1,
            "Spec" : 0
        },
        "Mining" : {                    
            "Ter" : 1,
            "Place" : 2,
            "Spec" : 0
        },
        "Recruit" : {                    
            "Ter" : 2,
            "Place" : 1,
            "Spec" : 0
        },
        "Medecine" : {                    
            "Ter" : 2,
            "Place" : 2,
            "Spec" : 0
        },
        "HeartStone" : {                    
            "Ter" : 3,
            "Place" : 1,
            "Spec" : 0
        },
        "SlotGrowth" : {                    
            "Ter" : 3,
            "Place" : 2,
            "Spec" : 0
        },
    },
    "Might": {
        "Weaponsmith" : {               
            "Ter" : 0,
            "Place" : 1,
            "Spec" : 0
        },
        "Coats" : {               
            "Ter" : 1,
            "Place" : 1,
            "Spec" : 0
        },
        "Militia" : {               
            "Ter" : 1,
            "Place" : 2,
            "Spec" : 0
        },
        "SharpWeapons" : {               
            "Ter" : 2,
            "Place" : 1,
            "Spec" : 0
        },
        "Defense" : {               
            "Ter" : 2,
            "Place" : 2,
            "Spec" : 0
        },
        "Heroes" : {               
            "Ter" : 3,
            "Place" : 1,
            "Spec" : 0
        },
        "Security" : {               
            "Ter" : 3,
            "Place" : 2,
            "Spec" : 0
        },


    },
    "Wealth": {
        "ImprovedHall" : {               
            "Ter" : 0,
            "Place" : 1,
            "Spec" : 0
        },
        "Drakkars" : {               
            "Ter" : 1,
            "Place" : 1,
            "Spec" : 0
        },
        "Coinage" : {               
            "Ter" : 1,
            "Place" : 2,
            "Spec" : 0
        },
        "Knowledge" : {               
            "Ter" : 2,
            "Place" : 1,
            "Spec" : 0
        },
        "Upgrades" : {               
            "Ter" : 2,
            "Place" : 2,
            "Spec" : 0
        },
        "Negociate" : {               
            "Ter" : 3,
            "Place" : 1,
            "Spec" : 0
        },
        "SlotWealth" : {               
            "Ter" : 3,
            "Place" : 2,
            "Spec" : 0
        },
        

    }

    
};


var _SPECIAL_TECHS = {
    "Wolf" : {
        "Ascetic" : {    
            "Replace" : "SlotGrowth"
        },
        "Pillage" : {    
            "Replace" : "Militia"
        },
        "Cartography" : {    
            "Replace" : "Defense"
        },
        "Conqueror" : {    
            "Replace" : "Security"
        },
        "Threats" : {    
            "Replace" : "SlotWealth"
        },        
    },
    "Goat" : {
        "MoreAssign" : {    
            "Replace" : "SlotGrowth"
        },
        "HomeCook" : {    
            "Replace" : "Colonize"
        },
        "MoreBuildings" : {    
            "Replace" : "Drakkars"
        },
        "Barricades" : {    
            "Replace" : "Militia"
        },
        "FoodTrade" : {    
            "Replace" : "SlotWealth"
        },
    }, 
    "Stag" : {
        "BetterSilo" : {    
            "Replace" : "Recruit"
        },
        "BuildingUpkeep" : {    
            "Replace" : "SlotGrowth"
        },
        "ProudStag" : {    
            "Replace" : "SharpWeapons"
        },
        "GreatDeeds" : {    
            "Replace" : "Coinage"
        },
        "GloryClan" : {    
            "Replace" : "SlotWealth"
        },   
    },
    "Raven" : {
        "Rangers" : {    
            "Replace" : "Colonize"
        },
        "GreatRoutes" : {    
            "Replace" : "Negociate"
        },
        "MilitaryFunds" : {    
            "Replace" : "SharpWeapons"
        },
        "GreatExplorers" : {    
            "Replace" : "SlotGrowth"
        },
        "Wealth" : {    
            "Replace" : "SlotWealth"
        },   
    },
    "Bear" : {
        "Hibernate" : {    
            "Replace" : "Medecine"
        },
        "LandProtect" : {    
            "Replace" : "Coats"
        },
        "ShieldMaster" : {    
            "Replace" : "SharpWeapons"
        },
        "Harpoons" : {    
            "Replace" : "SlotGrowth"
        },
        "WinterFestival" : {    
            "Replace" : "SlotWealth"
        },   
    },
    "Boar" : {
        "NatureGift" : {    
            "Replace" : "Upgrades"
        },
        "Herbalism" : {    
            "Replace" : "Medecine"
        },
        "Legacy" : {    
            "Replace" : "SlotGrowth"
        },
        "SimpleLiving" : {    
            "Replace" : "Coinage"
        },
        "Osmosis" : {    
            "Replace" : "SlotWealth"
        },   
        "Handiwork" : {    
            "Replace" : "Mining"
        },  
        "Bartering" : {    
            "Replace" : "ImprovedHall"
        },  
    },
    
    
       
}

*/

function htmlEntities(str) {
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}