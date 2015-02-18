define([], function(){
	
	"use strict";
	
	var
	
		dm,
		
		colour = function(roomid){
			var room = dm.roomforid(roomid);
			
  			if (room){
				if (room.beds == 1)
					return "#f47961";
				if (room.beds == 2){
					if (room.study)
						return "#006f9b";
					return "#4d4d4d";
				}
  			}
  		 	return "white";
  		},
  		
  		roomtext = function(roomid){
  			var room = dm.roomforid(roomid);
  			if (room){
  				return room.name;
  			}
  			else{
  				console.log("can't get name for " + roomid);
  				return "";
  			}
  		},
		
		init = function(datamodel){
			dm = datamodel;
		}

	return{
		init: init,
		colour: colour,
		roomtext:roomtext,	
	}
});