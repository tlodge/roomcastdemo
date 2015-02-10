define(['jquery','d3'], function($,d3){

	"use strict";
	
	var 
	
		chart = function(){
				
			var width 	= 100;
			var height  = 100;
			var x = 0;
			var y = 0;
			
		
			function my(){		
				  //var data = this.data()[0];
				  var data = [{id:1, name:'options', eg:'red, green, blue', utf:'\uf03a', callback:function(){}},
				  			  {id:2, name:'text', eg:'describe it',utf:'\uf031', callback:function(){}},
				  			  {id:3, name:'range', eg:'from 1 to 100',utf:'\uf1de',callback:function(){}},
				  			  {id:4, name:'time', eg:'1st June 12.30',utf:'\uf017',callback:function(){}},
				  			  {id:5, name:'calendar', eg:'these date slots',utf:'\uf073',callback:function(){}}
				  			  ];
				  
				  var slice = data.splice(0,4);
				   
				  //slice.push({id:0, name:'more', callback:function(){}}); 
				 
				  
				  var questiontitlesize = height/15;
				  var padding = 5;
				  var paddingtop = 20;
				  var cwidth = width/(slice.length+1);
				  var cheight = height/4;
				 
				
				  var bwidth = cwidth/10;
				  var texttoboxpadding = 10;		  
				 
				  
				  var svg = this
				 				.append("svg")
				 				.attr("id", "contextwidget")
				 				.style("x", x + "px")
				 				.style("y", y + "px")
				 				.style("width",  (width+x) + "px")
				 				.style("height", (height+y) + "px")

				  
				 svg.append("text")
				 		  .attr("x", width/2)
				 		  .attr("y", y + paddingtop + questiontitlesize/3)
				 		  .attr("text-anchor", "middle")
				 		  .style("fill", "white")
				 		  .style("font-size", questiontitlesize + "px")
				 		  .text("choose a question type:")
				 
				
				 		  		  
				 var questions = svg.selectAll("g.questionitem")
				 					.data(slice)
				 
				 
				
				
				 
				 var ypos = y + paddingtop*2 + questiontitlesize + padding;
				 
				 svg.append("rect")
				 		  .attr("x", 0)
				 		  .attr("y", y+questiontitlesize+paddingtop)
				 		  .attr("width", width)
				 		  .attr("height", cheight)
				 		  .style("fill", "white")
				 		  .style("fill-opacity", 0.1);
				
				//more button
				
				svg.append("text")
					 .attr("x",function(d,i){return padding + (cwidth*slice.length+1) + (cwidth/2)} )
				 	 .attr("text-anchor", "middle")
				 	 .attr("y", ypos+cheight/4)
				 	 .attr("dy", "0.2em")
				 	 .style("fill", "white")
				 	 .style("font-size", cheight/2.5 + "px")
				 	 .text("more..")
				 		
				var question = questions.enter()		 
				 
				/*question.append("rect")
				 		  .attr("x", function(d,i){return padding + (cwidth*i)} )
				 		  .attr("y", 0)
				 		  .attr("width", cwidth - (padding*2))
				 		  .attr("height", cheight)
				 		  .style("fill", "white")
				 		  .style("fill-opacity", 0.1);*/
				 		  		  		  
				question.append("text")
				 		  .attr("x",function(d,i){return padding + (cwidth*i) + (cwidth/2)} )
				 		  .attr("text-anchor", "middle")
				 		  .attr("y", ypos)
				 		  .attr("dy", "0.3em")
				 		  .style("fill", "white")
				 		  .style("font-size", cheight/4 + "px")
				 		  .text(function(d){return d.name})
				 		  .each(function(d){
				 		  		d.width = d3.select(this).node().getComputedTextLength();
				 		  });
				
				question.append("rect")
				 		  .attr("x", function(d,i){return  (padding + (cwidth*i)) + (cwidth-d.width)/2 - bwidth - texttoboxpadding} )
				 		  .attr("y", ypos-(bwidth/2))
				 		  .attr("width",bwidth)
				 		  .attr("height", bwidth)
				 		  .style("fill", "#f47961")		  
				
				question.append('text')
					  .attr("class", "questionicon")
					  .attr('font-family', 'FontAwesome')
					  .attr("text-anchor", "middle")
					  .attr("x", function(d,i){return (padding + (cwidth*i)) + (cwidth-d.width)/2 - bwidth - texttoboxpadding + bwidth/2})
					  .attr("y", ypos)
					  .attr("dy", "0.3em")
					  .style('font-size', bwidth*0.6 + "px")
					  .style("fill", "white")
					  .text(function(d){
							return d.utf
					  })
					
				 
				 question.append("text")
				 		  .attr("x", function(d,i){return padding + (cwidth*i) + (cwidth/2)} )
				 		  .attr("y",ypos + cheight/3)
				 		   .attr("dy", "0.5em")
				 		  .attr("text-anchor", "middle")
				 		  .style("fill", "black")
				 		  .style("font-size", cheight/5 + "px")
				 		  .text(function(d){return d.eg ? "e.g. " + d.eg : "";})
				 		  
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