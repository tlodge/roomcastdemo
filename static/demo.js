[
	{
		"category":"concierge",
		
		"buttons": 
		[
			{
				"name":"key release",
				"id": 0,
				"info": "use this button when you would like the concierge to provide a key to a <strong>visitor</strong> (a contractor or friend.)  We will need to know when the key is to be released and how long for",
				"options":
				[
					{
						"name":"when",
						"question":"roughly when would you like the key to be released?",
						"components":[
								{"name":"rows", "id":"rows", "type":"date", "min":"today", "max":10, "value":"today"}
						]
					},
					{
						"name":"duration",
						"question":"roughly how long for?",
						"components":[
							{"name":"duration", "id":"duration", "type":"slider", "min":1, "max":20, "value":10, "valueLabel":"hours"}				
						]
					},
					{
						"name":"contact",
						"question":"how shall we contact you?",
						"components":[
							{"name":"c1","id":"c1", "type":"button", "value": false, "label":"tlodge@gmail.com"},
							{"name":"c2","id":"c2", "type":"button", "value": false, "label":"07972639571"},
							{"name":"c3","id":"c3", "type":"button", "value": true, "label":"do not contact me!"}
						]
					}
				]		
			}
		]
	}
]