//get all nodes with name B3.4

MATCH (a:Apartment) WHERE a.name = "B3.4" RETURN a;
//or
MATCH (a:Apartment {name:"B3.4"}) RETURN a;

//get all apartments alongside all relationships and return relationship
MATCH (n:`Apartment`)-[r]-() RETURN r,n LIMIT 25 

//get all apartments alongside all above and adjacent and return relationship
MATCH (n:`Apartment`)-[r:`ADJACENT`|`ABOVE`]-() RETURN r,n LIMIT 25 
MATCH (a:`Apartment`)-[r:`ADJACENT`|`ABOVE`]-(b:`Apartment`) RETURN a,r,b
 
//get all adjacency relationships
MATCH (a)-[:`ADJACENT`]->(b) RETURN a,b LIMIT 25

//get all nodes adjacent to B3.3

MATCH (a:Apartment {name:"B3.3"})-[:`ADJACENT`]->(b) RETURN a,b LIMIT 25

//get all Apartments adjacent to adjacent to B3.3

MATCH (a:Apartment {name:"B3.3"})-[:`ADJACENT`*1..2]->(b) RETURN b LIMIT 25

//get all Apartments adjacent to adjacent to B3.3 to full depth

MATCH (a:Apartment {name:"B3.3"})-[:`ADJACENT`*]->(b) RETURN b LIMIT 25

//get all apartments on the ground floor

MATCH (a:Apartment)-[:ON]->(f:Floor {name:'Ground Floor'}) RETURN a LIMIT 25

//get all apartments on the second floor
MATCH (a:Apartment)-[:ON]->(f:Floor {name:'Second Floor'}) RETURN a LIMIT 25

//get all owners of apartments on the third floor
MATCH  (u:User)-[:OWNS]->(a:Apartment)-[:ON]->(f:Floor {name:'Third Floor'}) RETURN u,a LIMIT 25

//get all users living in apartments on the third floor
MATCH  (u:User)-[:LIVES_IN]->(a:Apartment)-[:ON]->(f:Floor {name:'Third Floor'}) RETURN u,a LIMIT 25

//get all users living on the third floor who are NOT owners
MATCH (u:User)-[:LIVES_IN]->(a:Apartment)-[:ON]->(f:Floor {name:'Third Floor'}) 
WHERE NOT (u)-[:OWNS]->(a)
RETURN u,a LIMIT 25

//count all users living on the third floor 
MATCH  (u:User)-[:LIVES_IN]->(a:Apartment)-[:ON]->(f:Floor {name:'Third Floor'}) RETURN count(u) LIMIT 25

//count all users living on each floor
MATCH  (u:User)-[:LIVES_IN]->(a:Apartment)-[:ON]->(f:Floor) RETURN f,count(u) LIMIT 25

//all people living in an apartment adjacent to B3.3
MATCH (a:Apartment {name:"B3.3"})-[:`ADJACENT`*]->(b)<-[:LIVES_IN]-(u:User)
WHERE NOT b.name="B3.3"
RETURN DISTINCT u,b LIMIT 25

//count all people living in an apartment adjacent to B3.3
MATCH (a:Apartment {name:"B3.3"})-[:`ADJACENT`*]->(b)<-[:LIVES_IN]-(u:User)
WHERE NOT b.name="B3.3"
RETURN count(DISTINCT u) LIMIT 25

//give me all buttons that can be seen by Tom

MATCH (b:Button)-[:SEEN_BY]->(g:Group)<-[:BELONGS_TO]-(u:User {name:"Tom"})
RETURN DISTINCT b

//give me all buttons that can be seen by John
MATCH (b:Button)-[:SEEN_BY]->(g:Group)<-[:BELONGS_TO]-(u:User {name:"John"})
RETURN DISTINCT b

MATCH (u:User {name:"Tom"})-[:CREATED]->(t:Thread)-[:FIRSTMESSAGE]->fm-[:`NEXT`*]->m<-[:CREATED]-(r:User) RETURN u,t,fm,m,r


MATCH (u:User {name:"Tom"})-[:CREATED]->(t:Thread)-[:`NEXT`*]->m
WITH m,t
MATCH (m)<-[:CREATED]-(u)
RETURN t,m,u
RETURN u,t,fm,m,r
           