define([], function(){
	
	"use strict";
	
	var
	
		dm,
		
		colour = function(roomid){
			var room = dm.roomforid(roomid);
			
  			if (room){
				if (room.beds == 1)
					return "#fbefe3";
				if (room.beds == 2){
					if (room.study)
						return "#e9af7d";
					return "#f4d3b5";
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