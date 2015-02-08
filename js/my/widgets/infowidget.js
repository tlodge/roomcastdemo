define(['jquery','d3'], function($,d3){
	
	"use strict";
	
	var 
	
		chart = function(){
				
			var width 	= 100;
			var height  = 100;
			var x = 0;
			var y = 0;
			
			//get name clashes - make sure 'my' is different for all!
			
			function my(){		
				 
				 
				 var data = this.data()[0];
				
				 
				 var textcontainer = this
				 						.append("div")
				 						.attr("class", "infowidgetcontainer")
				 						.style("top",  (y + (height -tareaheight())/2) +  "px")
				 						.style("left", (x +  (width-tareawidth())/2) + "px")
				 						.style("width",  labelwidth() + tareawidth() + "px")
				 						.style("height", tareaheight() + "px")
				 							 	
				textcontainer	
				 	.append("div")
				 	.attr("class", "textareainfo")
				 	.append("textarea")
				 	.attr("rows", 5)
				 	.attr("cols", 20)
				 	.style("width",  tareawidth() + "px")
				 	.style("height", tareaheight() + "px")
				 	.style("font-size", ((tareaheight()*0.8)/5) + "px")
				 	.on("focus", function(d){
				 				
				 			/* doesn't work if disable scrolling - can maybe enable temporarily?*/
				 			//$(document).scrollTop(0);
				 			
				 	})
				 	.on("blur", function(d){
				 			//console.log("seen a blur!!");
				 			//$(document).bind('touchmove',true);
				 			//$('body').css("overflow", "auto");
				 			/* doesn't work if disable scrolling - can maybe enable temporarily?*/
				 			$(document).scrollTop(0);
				 			$(document).scrollLeft(0);
				 	})
				 	
				 	
			};
			
			
			var tareaheight = function(){
			 	return height/2;
			};
			
			var tareawidth = function(){
				return width/2;
				
			};
			
			var labelwidth = function(){
			 	return  width/3;
			};
			
			my.update = function(){
				console.log("name info widget updating with " + width  + " " + height);
				
				
				
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