define(['jquery','d3'], function($,d3){

	"use strict";
	var 
	
		chart = function(){
				
			var width 	= 100;
			var height  = 100;
			var x = 0;
			var y = 0;
			
			function my(){		
				 
				 var data = this.data()[0];
				
				 
				 var svg = this
				 				.append("svg")
				 				.style("x", x + "px")
				 				.style("y", y + "px")
				 				.style("width",  width + "px")
				 				.style("height", height + "px")
				 						
				 
				
				svg.append("circle")
					.attr("cx", x + width/2)
					.attr("cy", y + height/2)
					.attr("r", Math.min(width, height)/2 * 0.8)
					.style("fill", "red")
				 	
				 	
			};
			
			my.width = function(value){
				if (!arguments.length)
					return width;
				width = value;	
				return my;
			};
			
			my.height = function(value){
				if (!arguments.length)
					return height;
				height = value;	
				return my;
			};
			
			my.x = function(value){
				if (!arguments.length)
					return x;
				x = value;	
				return my;
			};
			
			my.y = function(value){
				if (!arguments.length)
					return y;
				y = value;	
				return my;
			};
			
			return my;
		}
		
	return{
		chart:chart
	}
		

});