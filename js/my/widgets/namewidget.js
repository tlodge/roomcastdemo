define(['jquery','d3'], function($,d3){
	
	"use strict";
	
	var 
	
		chart = function(){
				
			var width 	= 100;
			var height  = 100;
			var x = 0;
			var y = 0;
			
			function my(){		
				 
				 console.log("name widget in here!");
				 var data = this.data()[0];
				
				 
				 var textcontainer = this
				 						.append("div")
				 						.attr("class", "textwidgetcontainer")
				 						.style("top",  (y + height/2) -  tboxheight() +  "px")
				 						.style("left", (x + width/2 - tboxwidth()/2 - labelwidth()/2) + "px")
				 						.style("width",  labelwidth() + tboxwidth() + "px")
				 						.style("height", tboxheight() + "px")
				 						
				 
				
				textcontainer	
				 	.append("div")
				 	.attr("class", "labelbox")
				 	.style("text-align", "center")
				 	//.style("padding-top", (tboxheight*0.8)/5 + "px")
				 	.style("width",  labelwidth() + "px")
				 	.style("height", tboxheight() + "px")
				 	.style("line-height", tboxheight() + "px")
				 	.text("button name")
				 	.style("color", "white")
				 	.style("background", "#006f9b")
				 	.style("font-size", (tboxheight()*0.8) + "px")
				 	
				textcontainer	
				 	.append("div")
				 	.attr("class", "inputbox")
				 	.style("left", labelwidth() + "px")
				 	.append("input")
				 	.style("text-align", "center")
				 	.attr("type", "text")
				 	.style("padding-left", ((tboxheight()*0.8)/8) + "px") 
				 	.style("width",  tboxwidth() + "px")
				 	.style("height", tboxheight() + "px")
				 	.style("font-size", (tboxheight()*0.8) + "px")
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
			
			
			var tboxheight = function(){
			 	return height/7;
				
			};
			
			var tboxwidth = function(){
				return width/3;
				
			};
			
			var labelwidth = function(){
			 	return  width/3;
			};
			
			my.update = function(){
				console.log("name widget updating with " + width  + " " + height);
				
				d3.select("div.textwidgetcontainer")
				 	.style("top",  (y + height/2) -  tboxheight() +  "px")
				 	.style("left", (x + width/2 - tboxwidth()/2 - labelwidth()/2) + "px")
				 	.style("width",  labelwidth() + tboxwidth() + "px")
				 	.style("height", tboxheight() + "px")
				
				d3.select("div.labelbox")
				 	.style("width",  labelwidth() + "px")
				 	.style("height", tboxheight() + "px")
				 	.style("line-height", tboxheight() + "px")
				 	.style("font-size", (tboxheight()*0.8) + "px")
				 
				d3.select("div.inputbox")
				 	.style("left", labelwidth() + "px")
				 	.select("input")
				 	.style("padding-left", ((tboxheight()*0.8)/8) + "px") 
				 	.style("width",  tboxwidth() + "px")
				 	.style("height", tboxheight() + "px")
				 	.style("font-size", (tboxheight()*0.8) + "px")
				
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