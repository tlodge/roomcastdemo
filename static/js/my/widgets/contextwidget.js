define(['jquery','d3', 'util'], function($,d3,util){

	"use strict";
	
	var 
	
		chart = function(){
				
			var width 	= 100;
			var height  = 100;
			var x = 0;
			var y = 0;
			var indexes = [];
			var svg;
			var cwidth;
			var cheight;
			var paddingleft;
			var ypos;
			
			function my(){
			
				var self = this;
			
				var data = [{id:1, name:'options', eg:'red, green, blue', utf:'\uf03a', callback:function(){}},
				  			  {id:2, name:'text', eg:'describe it',utf:'\uf031', callback:function(){}},
				  			  {id:3, name:'range', eg:'from 1 to 100',utf:'\uf1de',callback:function(){}},
				  			  {id:4, name:'time', eg:'1st June 12.30',utf:'\uf017',callback:function(){}},
				  			  {id:5, name:'calendar', eg:'these date slots',utf:'\uf073',callback:function(){}}
				  			  ];
				  	
				createmenu(self,data);
					
			};
				
				
			var createmenu = function(self,data){
			
				  	var slice = data.splice(0,4);
				  	
				  	indexes = slice.map(function(item){
				  		return item.id;
				  	});
				  	
				  	cwidth = width/(slice.length+1);
				  	cheight = height/5;
				  	 
				  	svg = self
				 				.append("svg")
				 				.attr("id", "contextwidget")
				 				.style("x", x + "px")
				 				.style("y", y + "px")
				 				.style("width",  (width+x) + "px")
				 				.style("height", (height+y) + "px")
					
					var questiontitlesize = height/15;
					var linespacing 	  = 10;
					paddingleft 	  = 5;
					
					svg.append("text")
				 		  .attr("x", width/2)
				 		  .attr("y", y + linespacing + questiontitlesize/2)
				 		  .attr("dy", "0.3em")
				 		  .attr("text-anchor", "middle")
				 		  .style("fill", "white")
				 		  .style("font-size", questiontitlesize + "px")
				 		  .text("choose a question type:")
				 	
				 	ypos = y + linespacing + questiontitlesize + linespacing;
				 
				 	svg.append("rect")
				 		  .attr("x", 0)
				 		  .attr("y", ypos)
				 		  .attr("width", width)
				 		  .attr("height", cheight)
				 		  .style("fill", "white")
				 		  .style("fill-opacity", 0.1);
				
				   
				   
				   var qfontsize = cheight/4;
				   var egfontsize = cheight/5;
				   var texttoboxpadding = 10;		
				   var bwidth = cwidth/10;
				   
				   
				   svg.append("text")
					 .attr("x",function(d,i){return paddingleft + (cwidth*slice.length+1) + (cwidth/2)} )
				 	 .attr("text-anchor", "middle")
				 	 .attr("y", ypos + qfontsize/2 + cheight/2 - qfontsize/2)
				 	 .attr("dy", "0.3em")
				 	 .style("fill", "white")
				 	 .style("font-size", qfontsize + "px")
				 	 .text("more..")
				 
				  svg.append("path")
				  		  .attr("class", "currentquestion")
				   		  .attr("d", util.menuheading({x: paddingleft, y:ypos, h:cheight, w:cwidth}))
				 	  	  .attr("fill", "#006f9b")
				 
				 
				var questions = svg.selectAll("g.questionitem")
				 					.data(slice)
			
				var question = questions.enter()		
				   	  	  
				question.append("text")
				 		  .attr("x",function(d,i){return paddingleft + (cwidth*i) + (cwidth/2)} )
				 		  .attr("text-anchor", "middle")
				 		  .attr("y", ypos + qfontsize/2 + linespacing)
				 		  .attr("dy", "0.3em")
				 		  .style("fill", "white")
				 		  .style("font-size", qfontsize + "px")
				 		  .text(function(d){return d.name})
				 		  .each(function(d){
				 		  		d.width = d3.select(this).node().getComputedTextLength();
				 		  });
				 
				question.append("rect")
				 		  .attr("x", function(d,i){return  (paddingleft + (cwidth*i)) + (cwidth-d.width)/2 - bwidth - texttoboxpadding} )
				 		  .attr("y", ypos + qfontsize/2 + linespacing - (bwidth/2))
				 		  .attr("width",bwidth)
				 		  .attr("height", bwidth)
				 		  .style("fill", "#f47961")
				 		  	
				question.append('text')
					  .attr("class", "questionicon")
					  .attr('font-family', 'FontAwesome')
					  .attr("text-anchor", "middle")
					  .attr("x", function(d,i){return (paddingleft + (cwidth*i)) + (cwidth-d.width)/2 - bwidth - texttoboxpadding + bwidth/2})
					  .attr("y", ypos + qfontsize/2 + linespacing)
					  .attr("dy", "0.4em")
					  .style('font-size', bwidth*0.6 + "px")
					  .style("fill", "white")
					  .text(function(d){
							return d.utf
					  })
					  
				question.append("text")
				 		  .attr("x", function(d,i){return paddingleft + (cwidth*i) + (cwidth/2)} )
				 		  .attr("y", (ypos+cheight) - egfontsize/2 - linespacing)
				 		  .attr("text-anchor", "middle")
				 		  .style("fill", "black")
				 		  .style("font-size", egfontsize + "px")
				 		  .text(function(d){return d.eg ? "e.g. " + d.eg : "";})
			
				question.append("rect")
						.attr("x", function(d,i){return  (paddingleft + (cwidth*i))} )
				 		.attr("y", ypos)
				 		.attr("width",cwidth)
				 		.attr("height", cheight)
				 		.style("fill", "white")
				 		.style("fill-opacity", 0.0)
				 		.call( d3.behavior.drag().on("dragstart", function(d){util.handledrag(d,qselected)}));
				
			
			};
				
			var qselected = function(d){
				
				var idx = indexes.indexOf(d.id);
				if (idx != -1){
				 	svg.select("path.currentquestion")
				 		  .transition()
				 		  .duration(500)
				  		  .attr("class", "currentquestion")
				   		  .attr("d", util.menuheading({x: (paddingleft + (cwidth*idx)), y:ypos, h:cheight, w:cwidth}))
				}
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