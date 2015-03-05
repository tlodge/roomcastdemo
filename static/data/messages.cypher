//create a thread

CREATE (t1:Thread {	threadId:'t_1', 
					threadName: 'the cleaning button was pressed',
					body: 'the cleaning button was pressed', 
					timestamp: 1425573031}
		)

//create some messages
CREATE (m1: Message { messageId: 'm_1', 
					  body: 'Thanks we will be with you soon.', 
					  timestamp: 1425572031})
		
CREATE (m2: Message { messageId: 'm_2', 
					  body: 'That is brilliant thank you', 
					  timestamp: 1425569031})
		
CREATE (m3: Message { messageId: 'm_3', 
					  body: 'All done now, nice and clean', 
					  timestamp: 1425549031})


//create the message authors
CREATE (user1)-[:CREATED]->(t1)
CREATE (staff1)-[:CREATED]->(m1)
CREATE (user1)-[:CREATED]->(m2)
CREATE (staff1)-[:CREATED]->(m3)

//create the message chain
CREATE (t1)-[:FIRSTMESSAGE]->(m1)
CREATE (m1)-[:NEXT]->(m2)
CREATE (m2)-[:NEXT]->(m3)
		
