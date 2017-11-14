class mongoQuery {
	
	getPlayedGamesByClan()
	{
			
	var returnArray = 	[	/* 1 */
		{
			"clan" : "Boar",
			"count" : 3.0
		},

		/* 2 */
		{
			"clan" : "Raven",
			"count" : 666.0
		},

		/* 3 */
		{
			"clan" : "Stag",
			"count" : 735.0
		},

		/* 4 */
		{
			"clan" : "Bear",
			"count" : 725.0
		},

		/* 5 */
		{
			"clan" : "Wolf",
			"count" : 620.0
		},

		/* 6 */
		{
			"clan" : "Goat",
			"count" : 869.0
		}]
		
	console.log(returnArray);
		
		
	return(returnArray);
	}
	
}