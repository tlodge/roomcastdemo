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
				console.log("context widget updating with " + width  + " " + height);
				
				
				
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