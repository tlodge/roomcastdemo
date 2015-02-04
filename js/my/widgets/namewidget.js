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
				 var tboxheight = height/7
				 var tboxwidth = width/3;
				 var labelwidth = width/3;
				 
				 var textcontainer = this
				 						.append("div")
				 						.style("top",  (y + height/2) -  tboxheight +  "px")
				 						.style("left", (x + width/2 - tboxwidth/2 - labelwidth/2) + "px")
				 						.style("width",  labelwidth + tboxwidth + "px")
				 						.style("height", tboxheight + "px")
				 						.style("background", "#c8c2ae")
				 
				
				textcontainer	
				 	.append("div")
				 	.style("text-align", "center")
				 	//.style("padding-top", (tboxheight*0.8)/5 + "px")
				 	.style("width",  labelwidth + "px")
				 	.style("height", tboxheight + "px")
				 	.style("line-height", tboxheight + "px")
				 	.text("button name")
				 	.style("color", "white")
				 	.style("background", "#006f9b")
				 	.style("font-size", (tboxheight*0.8) + "px")
				 	
				textcontainer	
				 	.append("div")
				 	.style("left", labelwidth + "px")
				 	.append("input")
				 	.style("text-align", "center")
				 	.attr("type", "text")
				 	.style("padding-left", ((tboxheight*0.8)/8) + "px") 
				 	.style("width",  tboxwidth + "px")
				 	.style("height", tboxheight + "px")
				 	.style("font-size", (tboxheight*0.8) + "px")
				 	
				 	
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