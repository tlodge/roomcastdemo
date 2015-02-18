define(['jquery','d3'], function($,d3){

	var
		dim,
		root,
		
		init = function(d){
			dim = d;
			
			root = d3.select("#dashboard")
					 .style("width", dim.width()  + "px")
					 .style("height", dim.height()  + "px")
					 .style("top", dim.y() + "px")
					 .style("left",dim.x() + "px")
					 .style("background", "red");
			
		},
		
		update = function(){
			
		}
		
		return{
			init: init,
			update: update
		}
	

});