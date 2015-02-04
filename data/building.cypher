CREATE (LillieSquare:Development {name:'Lillie Square', address:'Earls Court'})
CREATE (OneLillieSquare:Block {name:'One Lillie Square', postcode:'SW6 1UE'})

CREATE (FirstFloor:Floor {name:'Ground Floor'})
CREATE (SecondFloor:Floor {name:'Second Floor'})
CREATE (ThirdFloor:Floor {name:'Third Floor'})
CREATE (FourthFloor:Floor {name:'Fourth Floor'})
CREATE (FifthFloor:Floor {name:'Fifth Floor'})
CREATE (SixthFloor:Floor {name:'Sixth Floor'})
CREATE (SeventhFloor:Floor {name:'Seventh Floor'})
CREATE (EighthFloor:Floor {name:'Eighth Floor'})
CREATE (NinthFloor:Floor {name:'Ninth Floor'})

CREATE (a1:Apartment {name:'B1.1'})
CREATE (a2:Apartment {name:'B1.2'})
CREATE (a3:Apartment {name:'B2.1'})
CREATE (a4:Apartment {name:'B2.2'})
CREATE (a5:Apartment {name:'B2.3'})
CREATE (a6:Apartment {name:'B2.4'})
CREATE (a7:Apartment {name:'B3.1'})
CREATE (a8:Apartment {name:'B3.2'})
CREATE (a9:Apartment {name:'B3.3'})
CREATE (a10:Apartment {name:'B3.4'})
CREATE (a11:Apartment {name:'B4.1'})
CREATE (a12:Apartment {name:'B4.2'})
CREATE (a13:Apartment {name:'B4.3'})
CREATE (a14:Apartment {name:'B4.4'})
CREATE (a15:Apartment {name:'B5.1'})
CREATE (a16:Apartment {name:'B5.2'})
CREATE (a17:Apartment {name:'B5.3'})
CREATE (a18:Apartment {name:'B5.4'})
CREATE (a19:Apartment {name:'B6.1'})
CREATE (a20:Apartment {name:'B6.2'})
CREATE (a21:Apartment {name:'B6.3'})
CREATE (a22:Apartment {name:'B6.4'})
CREATE (a23:Apartment {name:'B7.1'})
CREATE (a24:Apartment {name:'B7.2'})
CREATE (a25:Apartment {name:'B7.3'})
CREATE (a26:Apartment {name:'B7.4'})
CREATE (a27:Apartment {name:'B8.1'})
CREATE (a28:Apartment {name:'B8.2'})
CREATE (a29:Apartment {name:'B8.3'})
CREATE (a30:Apartment {name:'B8.4'})
CREATE (a31:Apartment {name:'B9.1'})
CREATE (a32:Apartment {name:'B9.2'})
CREATE (a33:Apartment {name:'B9.3'})
CREATE (a34:Apartment {name:'B9.4'})


CREATE
	(OneLillieSquare)-[:IN]->(LillieSquare)
	
CREATE
  	(FirstFloor)-[:IN]->(OneLillieSquare),
  	(SecondFloor)-[:IN]->(OneLillieSquare),
  	(ThirdFloor)-[:IN]->(OneLillieSquare),
  	(FourthFloor)-[:IN]->(OneLillieSquare),
  	(FifthFloor)-[:IN]->(OneLillieSquare),
  	(SixthFloor)-[:IN]->(OneLillieSquare),
  	(SeventhFloor)-[:IN]->(OneLillieSquare),
   	(EighthFloor)-[:IN]->(OneLillieSquare),
	(NinthFloor)-[:IN]->(OneLillieSquare)

CREATE
	(a1)-[:ON]->(FirstFloor),
	(a2)-[:ON]->(FirstFloor),
	(a3)-[:ON]->(SecondFloor),
	(a4)-[:ON]->(SecondFloor),
	(a5)-[:ON]->(SecondFloor),
	(a6)-[:ON]->(SecondFloor),
	(a7)-[:ON]->(ThirdFloor),
	(a8)-[:ON]->(ThirdFloor),
	(a9)-[:ON]->(ThirdFloor),
	(a10)-[:ON]->(ThirdFloor),
	(a11)-[:ON]->(FourthFloor),
	(a12)-[:ON]->(FourthFloor),
	(a13)-[:ON]->(FourthFloor),
	(a14)-[:ON]->(FourthFloor),
	(a15)-[:ON]->(FifthFloor),
	(a16)-[:ON]->(FifthFloor),
	(a17)-[:ON]->(FifthFloor),
	(a18)-[:ON]->(FifthFloor),
	(a19)-[:ON]->(SixthFloor),
	(a20)-[:ON]->(SixthFloor),
	(a21)-[:ON]->(SixthFloor),
	(a22)-[:ON]->(SixthFloor),
	(a23)-[:ON]->(SeventhFloor),
	(a24)-[:ON]->(SeventhFloor),
	(a25)-[:ON]->(SeventhFloor),
	(a26)-[:ON]->(SeventhFloor),
	(a27)-[:ON]->(EighthFloor),
	(a28)-[:ON]->(EighthFloor),
	(a29)-[:ON]->(EighthFloor),
	(a30)-[:ON]->(EighthFloor),
	(a31)-[:ON]->(NinthFloor),
	(a32)-[:ON]->(NinthFloor),
	(a33)-[:ON]->(NinthFloor),
	(a34)-[:ON]->(NinthFloor)
	
CREATE
	(a1)-[:BELOW]->(a3),
	(a2)-[:BELOW]->(a5),
	(a3)-[:BELOW]->(a7),
	(a3)-[:ABOVE]->(a1),
	(a3)-[:ADJACENT]->(a4),
	(a4)-[:BELOW]->(a8),
	(a4)-[:ABOVE]->(a2),
	(a4)-[:ADJACENT]->(a3),
	(a4)-[:ADJACENT]->(a5),
	(a5)-[:BELOW]->(a9),
	(a5)-[:ABOVE]->(a2),
	(a5)-[:ADJACENT]->(a4),
	(a5)-[:ADJACENT]->(a6),
	(a6)-[:BELOW]->(a10),
	(a6)-[:ABOVE]->(a2),
	(a6)-[:ADJACENT]->(a5),
	(a7)-[:BELOW]->(a11),
	(a7)-[:ABOVE]->(a3),
	(a7)-[:ADJACENT]->(a8),
	(a8)-[:BELOW]->(a12),
	(a8)-[:ABOVE]->(a4),
	(a8)-[:ADJACENT]->(a7),
	(a8)-[:ADJACENT]->(a9),
	(a9)-[:BELOW]->(a13),
	(a9)-[:ABOVE]->(a5),
	(a9)-[:ADJACENT]->(a8),
	(a9)-[:ADJACENT]->(a10),
	(a10)-[:BELOW]->(a14),
	(a10)-[:ABOVE]->(a6),
	(a10)-[:ADJACENT]->(a9),
	(a11)-[:BELOW]->(a15),
	(a11)-[:ABOVE]->(a7),
	(a11)-[:ADJACENT]->(a12),
	(a12)-[:BELOW]->(a16),
	(a12)-[:ABOVE]->(a8),
	(a12)-[:ADJACENT]->(a11),
	(a12)-[:ADJACENT]->(a13),
	(a13)-[:BELOW]->(a17),
	(a13)-[:ABOVE]->(a9),
	(a13)-[:ADJACENT]->(a12),
	(a13)-[:ADJACENT]->(a14),
	(a14)-[:BELOW]->(a18),
	(a14)-[:ABOVE]->(a10),
	(a14)-[:ADJACENT]->(a13),
	(a15)-[:BELOW]->(a19),
	(a15)-[:ABOVE]->(a11),
	(a15)-[:ADJACENT]->(a16),
	(a16)-[:BELOW]->(a20),
	(a16)-[:ABOVE]->(a12),
	(a16)-[:ADJACENT]->(a15),
	(a16)-[:ADJACENT]->(a17),
	(a17)-[:BELOW]->(a21),
	(a17)-[:ABOVE]->(a13),
	(a17)-[:ADJACENT]->(a16),
	(a17)-[:ADJACENT]->(a18),
	(a18)-[:BELOW]->(a22),
	(a18)-[:ABOVE]->(a14),
	(a18)-[:ADJACENT]->(a17),
	(a19)-[:BELOW]->(a23),
	(a19)-[:ABOVE]->(a15),
	(a19)-[:ADJACENT]->(a20),
	(a20)-[:BELOW]->(a24),
	(a20)-[:ABOVE]->(a16),
	(a20)-[:ADJACENT]->(a19),
	(a20)-[:ADJACENT]->(a21),
	(a21)-[:BELOW]->(a25),
	(a21)-[:ABOVE]->(a17),
	(a21)-[:ADJACENT]->(a20),
	(a21)-[:ADJACENT]->(a22),
	(a22)-[:BELOW]->(a26),
	(a22)-[:ABOVE]->(a18),
	(a22)-[:ADJACENT]->(a21),
	(a23)-[:BELOW]->(a27),
	(a23)-[:ABOVE]->(a19),
	(a23)-[:ADJACENT]->(a24),
	(a24)-[:BELOW]->(a28),
	(a24)-[:ABOVE]->(a20),
	(a24)-[:ADJACENT]->(a23),
	(a24)-[:ADJACENT]->(a25),
	(a25)-[:BELOW]->(a29),
	(a25)-[:ABOVE]->(a21),
	(a25)-[:ADJACENT]->(a24),
	(a25)-[:ADJACENT]->(a26),
	(a26)-[:BELOW]->(a30),
	(a26)-[:ABOVE]->(a22),
	(a26)-[:ADJACENT]->(a25),
	(a27)-[:BELOW]->(a31),
	(a27)-[:ABOVE]->(a23),
	(a27)-[:ADJACENT]->(a28),
	(a28)-[:BELOW]->(a32),
	(a28)-[:ABOVE]->(a24),
	(a28)-[:ADJACENT]->(a27),
	(a28)-[:ADJACENT]->(a29),
	(a29)-[:BELOW]->(a33),
	(a29)-[:ABOVE]->(a25),
	(a29)-[:ADJACENT]->(a28),
	(a29)-[:ADJACENT]->(a30),
	(a30)-[:BELOW]->(a34),
	(a30)-[:ABOVE]->(a26),
	(a30)-[:ADJACENT]->(a29),
	(a31)-[:ABOVE]->(a27),
	(a31)-[:ADJACENT]->(a32),
	(a32)-[:ABOVE]->(a28),
	(a32)-[:ADJACENT]->(a31),
	(a32)-[:ADJACENT]->(a33),
	(a33)-[:ABOVE]->(a29),
	(a33)-[:ADJACENT]->(a32),
	(a33)-[:ADJACENT]->(a34),
	(a34)-[:ABOVE]->(a30),
	(a34)-[:ADJACENT]->(a33)


CREATE
	(staff1:User {name:'Cleaner One'}),
	(staff2:User {name:'Cleaner Two'}),
	(staff3:User {name:'Security One'}),
	(staff4:User {name:'Security Two'}),
	(staff5:User {name:'Concierge One'}),
	(staff6:User {name:'Concierge Two'}),
	(staff7:User {name:'Maintenance One'}),
	(user1:User {name:'Tom'}),
	(user2:User {name:'Simon'}),
	(user3:User {name:'John'}),
	(user4:User {name:'Katie'}),
	(user5:User {name:'Sarah'}),
	(user6:User {name:'Milly'}),
	(user7:User {name:'Joan'}),
	(user8:User {name:'Valerie'}),
	(user9:User {name:'James'}),
	(user10:User {name:'Bob'}),
	(user11:User {name:'Richard'}),
	(user12:User {name:'Emily'}),
	(user13:User {name:'Gillian'}),
	(user14:User {name:'Doloris'}),
	(user15:User {name:'Bruce'}),
	(user16:User {name:'Billy'}),
	(user17:User {name:'Maisie'}),
	(user18:User {name:'Darius'}),
	(user19:User {name:'Jamie'}),
	(user20:User {name:'Isabel'}),
	(user21:User {name:'Molly'}),
	(user22:User {name:'Peter'}),
	(user23:User {name:'Mark'}),
	(user24:User {name:'Arthur'}),
	(user25:User {name:'Poppy'}),
	(user26:User {name:'Rosie'}),
	(user27:User {name:'Robert'}),
	(user28:User {name:'Barney'}),
	(user29:User {name:'Lesley'}),
	(user30:User {name:'Chris'}),
	(user31:User {name:'Ellie'}),
	(user32:User {name:'Sophie'}),
	(user33:User {name:'Alex'}),
	(user34:User {name:'Anita'}),
	(user35:User {name:'Andrew'}),
	(user36:User {name:'Edwina'}),
	(user37:User {name:'Jon'}),
	(user38:User {name:'Grace'}),
	(user39:User {name:'Edward'}),
	(user40:User {name:'Michela'}),
	(user41:User {name:'Beatrice'}),
	(user42:User {name:'Joy'}),
	(user43:User {name:'Michael'}),
	(user44:User {name:'Chester'}),
	(user45:User {name:'Benjamin'}),
	(user46:User {name:'Adrian'}),
	(user47:User {name:'Stephen'}),
	(user48:User {name:'Thomas'}),
	(user49:User {name:'Chris'}),
	(user50:User {name:'Nina'}),
	(user51:User {name:'Jake'}),
	(user52:User {name:'Miles'}),
	(user53:User {name:'Terry'}),
	(user54:User {name:'Kiran'}),
	(user55:User {name:'Piers'}),
	(user56:User {name:'Joe'}),
	(user57:User {name:'Abigail'})
	
//create the living relationships (ives in and owns, with properties distinguishing the type. yes, as then 
//makes graph easier to read, and easy to show histories of ownership and living?

//create the owners
CREATE
	(user1)-[:OWNS]->(a1),
	(user2)-[:OWNS]->(a1),
	(user3)-[:OWNS]->(a2),
	(user5)-[:OWNS]->(a3),
	(user6)-[:OWNS]->(a4),
	(user8)-[:OWNS]->(a5),
	(user8)-[:OWNS]->(a6),
	(user8)-[:OWNS]->(a7),
	(user9)-[:OWNS]->(a8),
	(user10)-[:OWNS]->(a8),
	(user11)-[:OWNS]->(a9),
	(user12)-[:OWNS]->(a10),
	(user13)-[:OWNS]->(a11),
	(user14)-[:OWNS]->(a12),
	(user15)-[:OWNS]->(a13),
	(user16)-[:OWNS]->(a14),
	(user17)-[:OWNS]->(a15),
	(user18)-[:OWNS]->(a16),
	(user19)-[:OWNS]->(a17),
	(user20)-[:OWNS]->(a18),
	(user20)-[:OWNS]->(a19),
	(user20)-[:OWNS]->(a20),
	(user21)-[:OWNS]->(a21),
	(user22)-[:OWNS]->(a21),
	(user23)-[:OWNS]->(a22),
	(user24)-[:OWNS]->(a23),
	(user25)-[:OWNS]->(a24),
	(user26)-[:OWNS]->(a25),
	(user27)-[:OWNS]->(a26),
	(user28)-[:OWNS]->(a27),
	(user29)-[:OWNS]->(a28),
	(user30)-[:OWNS]->(a29),
	(user30)-[:OWNS]->(a30),
	(user30)-[:OWNS]->(a31),
	(user30)-[:OWNS]->(a32),
	(user31)-[:OWNS]->(a33),
	(user32)-[:OWNS]->(a34)

//create the living arrangements
CREATE	
	(user1)-[:LIVES_IN]->(a1),
	(user2)-[:LIVES_IN]->(a1),
	(user33)-[:LIVES_IN]->(a2),
	(user34)-[:LIVES_IN]->(a3),
	(user35)-[:LIVES_IN]->(a3),
	(user6)-[:LIVES_IN]->(a4),
	(user8)-[:LIVES_IN]->(a5),
	(user36)-[:LIVES_IN]->(a6),
	(user37)-[:LIVES_IN]->(a7),
	(user9)-[:LIVES_IN]->(a8),
	(user10)-[:LIVES_IN]->(a8),
	(user11)-[:LIVES_IN]->(a9),
	(user12)-[:LIVES_IN]->(a10),
	(user38)-[:LIVES_IN]->(a11),
	(user14)-[:LIVES_IN]->(a12),
	(user39)-[:LIVES_IN]->(a13),
	(user16)-[:LIVES_IN]->(a14),
	(user17)-[:LIVES_IN]->(a15),
	(user40)-[:LIVES_IN]->(a16),
	(user41)-[:LIVES_IN]->(a16),
	(user42)-[:LIVES_IN]->(a17),
	(user43)-[:LIVES_IN]->(a17),
	(user44)-[:LIVES_IN]->(a17),
	(user45)-[:LIVES_IN]->(a18),
	(user46)-[:LIVES_IN]->(a18),
	(user47)-[:LIVES_IN]->(a19),
	(user48)-[:LIVES_IN]->(a20),
	(user49)-[:LIVES_IN]->(a21),
	(user50)-[:LIVES_IN]->(a22),
	(user51)-[:LIVES_IN]->(a22),
	(user24)-[:LIVES_IN]->(a23),
	(user25)-[:LIVES_IN]->(a24),
	(user52)-[:LIVES_IN]->(a24),
	(user26)-[:LIVES_IN]->(a25),
	(user27)-[:LIVES_IN]->(a26),
	(user28)-[:LIVES_IN]->(a27),
	(user29)-[:LIVES_IN]->(a28),
	(user53)-[:LIVES_IN]->(a29),
	(user54)-[:LIVES_IN]->(a29),
	(user55)-[:LIVES_IN]->(a30),
	(user56)-[:LIVES_IN]->(a30),
	(user56)-[:LIVES_IN]->(a31),
	(user57)-[:LIVES_IN]->(a32),
	(user31)-[:LIVES_IN]->(a33),
	(user32)-[:LIVES_IN]->(a34)
	
	
//create user groups //nb distinguish between static and calculated groups!- following are static!

CREATE (OLSGroupOwners:Group {name:'One Lillie Square owners'})
CREATE (OLSGroupOccupants:Group {name:'One Lillie Square occupants'})
CREATE (GroundFloorOccupants:Group {name:'Ground floor occupants'})
CREATE (Cleaners:Group {name:'Lillie Square cleaners'})
CREATE (Concierges:Group {name:'Lillie Square concierges'})
CREATE (Security:Group {name:'Lillie Square security'})
CREATE (Maintenance:Group {name:'Lillie Square maintenance'})

//add users to ownership group
CREATE
	(user1)-[:BELONGS_TO]->(OLSGroupOwners),
	(user2)-[:BELONGS_TO]->(OLSGroupOwners),
	(user3)-[:BELONGS_TO]->(OLSGroupOwners),
	(user4)-[:BELONGS_TO]->(OLSGroupOwners),
	(user5)-[:BELONGS_TO]->(OLSGroupOwners),
	(user6)-[:BELONGS_TO]->(OLSGroupOwners),
	(user7)-[:BELONGS_TO]->(OLSGroupOwners),
	(user8)-[:BELONGS_TO]->(OLSGroupOwners),
	(user9)-[:BELONGS_TO]->(OLSGroupOwners),
	(user10)-[:BELONGS_TO]->(OLSGroupOwners),
	(user11)-[:BELONGS_TO]->(OLSGroupOwners),
	(user12)-[:BELONGS_TO]->(OLSGroupOwners),
	(user13)-[:BELONGS_TO]->(OLSGroupOwners),
	(user14)-[:BELONGS_TO]->(OLSGroupOwners),
	(user15)-[:BELONGS_TO]->(OLSGroupOwners),
	(user16)-[:BELONGS_TO]->(OLSGroupOwners),
	(user17)-[:BELONGS_TO]->(OLSGroupOwners),
	(user18)-[:BELONGS_TO]->(OLSGroupOwners),
	(user19)-[:BELONGS_TO]->(OLSGroupOwners),
	(user20)-[:BELONGS_TO]->(OLSGroupOwners),
	(user21)-[:BELONGS_TO]->(OLSGroupOwners),
	(user22)-[:BELONGS_TO]->(OLSGroupOwners),
	(user23)-[:BELONGS_TO]->(OLSGroupOwners),
	(user24)-[:BELONGS_TO]->(OLSGroupOwners),
	(user25)-[:BELONGS_TO]->(OLSGroupOwners),
	(user26)-[:BELONGS_TO]->(OLSGroupOwners),
	(user27)-[:BELONGS_TO]->(OLSGroupOwners),
	(user28)-[:BELONGS_TO]->(OLSGroupOwners),
	(user29)-[:BELONGS_TO]->(OLSGroupOwners),
	(user30)-[:BELONGS_TO]->(OLSGroupOwners),
	(user31)-[:BELONGS_TO]->(OLSGroupOwners),
	(user32)-[:BELONGS_TO]->(OLSGroupOwners)

//add occupants to occupants group
CREATE
	(user1)-[:BELONGS_TO]->(OLSGroupOccupants),
	(user2)-[:BELONGS_TO]->(OLSGroupOccupants),
	(user33)-[:BELONGS_TO]->(OLSGroupOccupants),
	(user34)-[:BELONGS_TO]->(OLSGroupOccupants),
	(user35)-[:BELONGS_TO]->(OLSGroupOccupants),
	(user6)-[:BELONGS_TO]->(OLSGroupOccupants),
	(user8)-[:BELONGS_TO]->(OLSGroupOccupants),
	(user36)-[:BELONGS_TO]->(OLSGroupOccupants),
	(user37)-[:BELONGS_TO]->(OLSGroupOccupants),
	(user9)-[:BELONGS_TO]->(OLSGroupOccupants),
	(user10)-[:BELONGS_TO]->(OLSGroupOccupants),
	(user11)-[:BELONGS_TO]->(OLSGroupOccupants),
	(user12)-[:BELONGS_TO]->(OLSGroupOccupants),
	(user38)-[:BELONGS_TO]->(OLSGroupOccupants),
	(user14)-[:BELONGS_TO]->(OLSGroupOccupants),
	(user39)-[:BELONGS_TO]->(OLSGroupOccupants),
	(user16)-[:BELONGS_TO]->(OLSGroupOccupants),
	(user17)-[:BELONGS_TO]->(OLSGroupOccupants),
	(user40)-[:BELONGS_TO]->(OLSGroupOccupants),
	(user41)-[:BELONGS_TO]->(OLSGroupOccupants),
	(user42)-[:BELONGS_TO]->(OLSGroupOccupants),
	(user43)-[:BELONGS_TO]->(OLSGroupOccupants),
	(user44)-[:BELONGS_TO]->(OLSGroupOccupants),
	(user45)-[:BELONGS_TO]->(OLSGroupOccupants),
	(user46)-[:BELONGS_TO]->(OLSGroupOccupants),
	(user47)-[:BELONGS_TO]->(OLSGroupOccupants),
	(user48)-[:BELONGS_TO]->(OLSGroupOccupants),
	(user49)-[:BELONGS_TO]->(OLSGroupOccupants),
	(user50)-[:BELONGS_TO]->(OLSGroupOccupants),
	(user51)-[:BELONGS_TO]->(OLSGroupOccupants),
	(user24)-[:BELONGS_TO]->(OLSGroupOccupants),
	(user25)-[:BELONGS_TO]->(OLSGroupOccupants),
	(user52)-[:BELONGS_TO]->(OLSGroupOccupants),
	(user26)-[:BELONGS_TO]->(OLSGroupOccupants),
	(user27)-[:BELONGS_TO]->(OLSGroupOccupants),
	(user28)-[:BELONGS_TO]->(OLSGroupOccupants),
	(user29)-[:BELONGS_TO]->(OLSGroupOccupants),
	(user53)-[:BELONGS_TO]->(OLSGroupOccupants),
	(user54)-[:BELONGS_TO]->(OLSGroupOccupants),
	(user55)-[:BELONGS_TO]->(OLSGroupOccupants),
	(user56)-[:BELONGS_TO]->(OLSGroupOccupants),
	(user56)-[:BELONGS_TO]->(OLSGroupOccupants),
	(user57)-[:BELONGS_TO]->(OLSGroupOccupants),
	(user31)-[:BELONGS_TO]->(OLSGroupOccupants),
	(user32)-[:BELONGS_TO]->(OLSGroupOccupants)

//add the users to the ground floor group
CREATE
	(user1)-[:BELONGS_TO]->(GroundFloorOccupants),
	(user2)-[:BELONGS_TO]->(GroundFloorOccupants),
	(user33)-[:BELONGS_TO]->(GroundFloorOccupants)


//add staff to groups
CREATE
	(staff1)-[:BELONGS_TO]->(Cleaners),
	(staff2)-[:BELONGS_TO]->(Cleaners),
	(staff3)-[:BELONGS_TO]->(Security),
	(staff4)-[:BELONGS_TO]->(Security),
	(staff5)-[:BELONGS_TO]->(Concierge),
	(staff6)-[:BELONGS_TO]->(Concierge),
	(staff7)-[:BELONGS_TO]->(Maintenance)

//create some buttons
CREATE (HelpButton:Button {name:'Help me!'})
CREATE (VisitorButton:Button {name:'Visitor'})
CREATE (EscortButton:Button {name:'Escort'})
CREATE (ParcelButton:Button {name:'Parcel'})
CREATE (LeakButton:Button {name:'Leak!'})
CREATE (FobReplacementButton:Button {name:'Lost fob!'})
CREATE (HeatingButton:Button {name:'Heating'})

//set up button triggers and audience
CREATE
	(HelpButton)-[:SEEN_BY]->(OLSGroupOccupants),
	(HelpButton)-[:NOTIFIES]->(Security),
	(HeatingButton)-[:SEEN_BY]->(OLSGroupOccupants),
	(HeatingButton)-[:NOTIFIES]->(Maintenance),
	(VisitorButton)-[:SEEN_BY]->(OLSGroupOccupants),
	(VisitorButton)-[:NOTIFIES]->(Concierge),
	(EscortButton)-[:SEEN_BY]->(OLSGroupOccupants),
	(EscortButton)-[:NOTIFIES]->(Security),
	(ParcelButton)-[:SEEN_BY]->(OLSGroupOccupants),
	(ParcelButton)-[:NOTIFIES]->(Concierge),
	(LeakButton)-[:SEEN_BY]->(GroundFloorOccupants),
	(LeakButton)-[:NOTIFIES]->(Maintenance),
	(FobReplacementButton)-[:SEEN_BY]->(OLSGroupOwners),
	(FobReplacementButton)-[:SEEN_BY]->(OLSGroupOccupants),
	(FobReplacementButton)-[:NOTIFIES]->(Security)