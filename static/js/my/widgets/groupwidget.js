define(['jquery','d3', 'util'], function($,d3,util){

	"use strict";
	var 
	
		chart = function(){
				
			var width 	= 100;
			var height  = 100;
			var x = 0;
			var y = 0;
			
			function my(){		
				 
				 var data = this.data()[0];
				
				
				 var groupchoicecontainer = this
				 						.append("div")
				 						.attr("class", "groupchoicecontainer")
				 						.style("top",  y +  "px")
				 						.style("left", x +  "px")
				 						.style("width",  width + "px")
				 						.style("height", groupheight() + "px")
										
								
				 
				var groupselectcontainer = groupchoicecontainer.append("div")
				 									.attr("class", "groupwidgetcontainer")
				 									.style("top",  ((groupheight()-tboxheight())/2) +  "px")
				 									.style("left", (x + width/2 - tboxwidth()/2 - labelwidth()/2) + "px")
				 									.style("width",  labelwidth() + tboxwidth() + "px")
				 									.style("height", tboxheight() + "px")
				 									.style("background", "black");
				
				
				groupselectcontainer	
				 	.append("div")
				 	.attr("class", "groupchoicelabelbox")
				 	.style("text-align", "center")
				 	.style("width",  labelwidth() + "px")
				 	.style("height", tboxheight() + "px")
				 	.style("line-height", tboxheight() + "px")
				 	.style("background", "#006f9b")
				 	.append("span")
				 	.text("choose group")
				 	.style("color", "white")
				 	.style("font-size", (tboxheight()*0.8) + "px")
				 	.call(util.cssautofit, labelwidth())
				 	
				var select = groupselectcontainer	
				 	.append("div")
				 	.attr("class", "selectgroup")
				 	.style("left", labelwidth() + "px")
				 	.append("select")
				 	.attr("class", "select-style")
				 	.style("text-align", "center")
				 	.attr("type", "text")
				 	.style("padding-left", ((tboxheight()*0.8)/8) + "px") 
				 	.style("padding-top", "0px")
				 	.style("width",  tboxwidth() + "px")
				 	.style("height", tboxheight() + "px")
				 	.style("font-size", (tboxheight()*0.6) + "px")
				 	.on("focus", function(d){
				 			
				 	})
				 	.on("blur", function(d){
				 			$(document).scrollTop(0);
				 			$(document).scrollLeft(0);
				 	})
				 	
				select.append("option")
									.text("concierge")
				
				select.append("option")
									.text("security")
									
				select.append("option")
									.text("maintenance")
				
				
				 var groupcreatecontainer = this
				 						.append("div")
				 						.attr("class", "groupchoicecontainer")
				 						.style("top",  (y + (height/2)) + "px")
				 						.style("left", x +  "px")
				 						.style("width",  width + "px")
				 						.style("height", groupheight() + "px")
										.style("background", "#999999") 		
				
				var groupinputcontainer = groupcreatecontainer.append("div")
				 									.attr("class", "groupwidgetcontainer")
				 									.style("top",  ((groupheight()-tboxheight())/2) +  "px")
				 									.style("left", (x + width/2 - tboxwidth()/2 - labelwidth()/2) + "px")
				 									.style("width",  labelwidth() + tboxwidth() + "px")
				 									.style("height", tboxheight() + "px")
				 									.style("background", "black");
				
				groupinputcontainer	
				 	.append("div")
				 	.attr("class", "groupnamelabelbox")
				 	.style("text-align", "center")
				 	.style("width",  labelwidth() + "px")
				 	.style("height", tboxheight() + "px")
				 	.style("line-height", tboxheight() + "px")
				 	.style("background", "#006f9b")
				 	.append("span")
				 	.text("create new group")
				 	.style("color", "white")
				 	.style("font-size", (tboxheight()*0.8) + "px")
				 	.call(util.cssautofit, labelwidth())
				 	
				groupinputcontainer	
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
				 			
				 	})
				 	.on("blur", function(d){
				 			$(document).scrollTop(0);
				 			$(document).scrollLeft(0);
				 	})
									
				 	
			};
			
			var groupheight = function(){
				return height/2;
			};
			
			var tboxheight = function(){
			 	return height/5;
				
			};
			
			var tboxwidth = function(){
				return width/3;
				
			};
			
			var labelwidth = function(){
			 	return  width/3;
			};
			
			my.update = function(){
				console.log("group widget updating! ");
				
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