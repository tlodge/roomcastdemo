define(['jquery','d3', 'dimensions'], function($, d3, dim){

	"use strict";
	
	
	var 
	
		hook,
	
		createcomponent = function(parent, dim, col, row, d){
	
		
			var y  =  dim.y + dim.h/3;
			
			
			
			if (d.type=="slider"){
			  
			  var sliderradius = dim.h/8;
			  var sliderlabelsize = dim.h/8;
			  var slidervaluesize = sliderlabelsize*2.5;
			
			  var x1 = dim.x + sliderradius*2 + dim.w*col;
			  var x2 =  dim.x + dim.w*col + dim.w - sliderradius*2;
			  
			  var sliderscale = d3.scale.linear();
			  sliderscale.range([d.min, d.max]);
			  sliderscale.domain([x1,x2]);
			  
			  parent.append("line")
					  .attr("x1", x1)
					  .attr("x2", x2)
					  .attr("y1", y)
					  .attr("y2", y)
					  .style("stroke", "black")
					  .style("stroke-width", "1px")
			
				parent.append("line")
					  .attr("x1", x1)
					  .attr("x2", x1)
					  .attr("y1", y-sliderradius/2)
					  .attr("y2", y+sliderradius/2)
					  .style("stroke", "black")
					  .style("stroke-width", "1px")
				
				parent.append("line")
					  .attr("x1", x2)
					  .attr("x2", x2)
					  .attr("y1", y-sliderradius/2)
					  .attr("y2", y+sliderradius/2)
					  .style("stroke", "black")
					  .style("stroke-width", "1px")
				
				parent.append("text")
					  .attr("class", "sliderscale")
					 .attr("text-anchor", "middle")
					 .attr("x", x1)
					 .attr("y", y+sliderlabelsize+sliderlabelsize)
					 .attr("dy", ".3em")	
					 .style("fill", "#70675c")
					 .style("font-size", sliderlabelsize + "px")
					 .text(function(d){return d.min})
	  			
	  			parent.append("text")
	  				.attr("class", "sliderscale")
					 .attr("text-anchor", "middle")
					 .attr("x", x2)
					 .attr("y", y+sliderlabelsize+sliderlabelsize)
					 .attr("dy", ".3em")	
					 .style("fill", "#70675c")
					 .style("font-size", sliderlabelsize + "px")
					 .text(function(d){return d.max})
				
					  	  
				parent.append("circle")
					  .attr("class", "sliderbutton")
					  .attr("cx", function(d){return  sliderscale.invert(d.value);})
					  .attr("cy", y)
					  .attr("r", sliderradius)
					  .style("stroke", "#70675c")
					  .style("stroke-width", "2px")
					  .style("fill", "#f47961")
					  .call(d3.behavior.drag().on("drag", function(d){
					  		var x = Math.min(Math.max(d3.event.x,x1),x2);
					  		var value = sliderscale(x);
					  		d3.select("text.option_" + d.id)
					  			.text(parseInt(value));
					  		d3.select(this).attr("cx",x);
					  }).on("dragend", function(){
					  		var d = d3.select(this).data();
					  		var x = d3.select(this).attr("cx");
					  		var value = sliderscale(x);
					  		d[0].callback(value)
					  }))
				
				parent.append("text")
	  				 .attr("class", function(d){return "option_" + d.id})
					 .attr("text-anchor", "middle")
					 .attr("x", x1 + (x2-x1)/2)
					 .attr("y", y + dim.h/2.5)
					 .attr("dy", ".3em")	
					 .style("fill", "#000")
					 .style("font-size", slidervaluesize + "px")
					 .text(function(d){return d.value})
					  
				
			}
			else if (d.type == "button"){
				
				var buttonradius = dim.h/6;
				var buttoninnerradius = dim.h/7;
				var buttonlabelsize = buttonradius*1.5;
				var x1 = dim.x + buttonradius*2 + dim.w*col;
			    var x2 =  dim.x + dim.w*col + dim.w - buttonradius*2;
				
				
				parent.append("circle")
					  .attr("cx", x1 + (x2-x1)/2)
					  .attr("cy", y)
					  .attr("r", buttonradius)
					  .style("fill", "#fff")
					  .style("stroke", "#70675c")
					  .style("stroke-width", "2px")
				
				parent.append("circle")
					  .attr("cx", x1 + (x2-x1)/2)
					  .attr("cy", y)
					  .attr("r", buttoninnerradius)
					  .style("fill", function(d){return d.value?"#f47961":"white"})
					  .call(d3.behavior.drag().on("dragstart", function(){
					  		var d = d3.select(this).data();
					  		
					  		//d3.selectAll("text.buttonlabel").style("fill", "#70675c");
					  		
					  		d[0].value = !d[0].value;
					  		
					  		
					  		//d3.select("text.buttonlabel_" + d[0].id).style("fill", d[0].value ? "black":"#70675c");
					  		d3.selectAll("text.buttonlabel")
					  		  .style("fill", function(d){return d.value ? "black":"#70675c";});
					  		
					  		d3.select(this).style("fill", d[0].value?"#f47961":"white");
					  		d[0].callback(d[0].value)
					  		
					  		
					  }))
				
				 parent.append("text")
	  				 .attr("class", function(d){console.log(d);return "buttonlabel buttonlabel_" + d.id})
					 .attr("text-anchor", "middle")
					 .attr("x", x1 + (x2-x1)/2)
					 .attr("y", y + dim.h/2.5)
					 .attr("dy", ".3em")	
					 .style("fill", function(d){return d.value ? "black":"#70675c";})
					 .style("font-size", buttonlabelsize + "px")
					 .text(function(d){return d.label})
			}
			
			else if (d.type=="video"){
				
				var ratio = 640/480;	
				var width 	= $(window).width();
				var height 	= $(window).height();
				var vwidth  = height * ratio;
				var vheight = height;
				
				var velement = d3.select("#video");
				
				d3.select("foreignObject").attr("width",  width);
				d3.select("foreignObject").attr("height", height);
				//d3.select("foreignObject").attr("x", (width-vwidth)/2);
				//d3.select("foreignObject").attr("y", (height-vheight)/2);
				velement.attr("width", "100%");
				velement.attr("height", "100%");
				
				//hmmm - seem to be able to comment this out - is video must be set up when 
				//video tag is placed in dom?
				
				var video = velement.node(); 
					
				
				video.src ="http://s3.amazonaws.com/trms-dev/svg_video_test/oceans-clip.ogg";
				
				
				parent.append("circle")
				  .attr("cx", dim.x + dim.w/2)
				  .attr("cy", dim.y + dim.h/2)
				  .attr("r", dim.h/3)
				  .style("stroke", "#70675c")
				  .style("stroke-width", "2px")
				  .style("fill", "#f47961")
				  .on("click", function(d){
				  	d3.select("g#main")
						.transition()
						.duration(1000)
						.style("opacity",0.0);
						
					video.play();
		
				  });		
			}
		},
	
		
		
		create = function(options){
			
			options.data.forEach(function(item){
				item.components.forEach(function(component){
					component.items = item.components.length; 
				});	
			});
			
			var groupheight  = options.h/options.data.length;
			var headerheight = groupheight/5; 
			var textsize     = headerheight * 0.5;
			
			var groups = options.hook.append("g")
							 .attr("class", "groups")
			
			var group  = groups.selectAll("g.group")
							   .data(options.data);
			
			group.enter()
				 .append("g")
				 .attr("class", "group")
			
			group.append("rect")
				 .attr("class", "optionsheader")
				  .attr("x", options.x)
				  .attr("y", function(d,i){return options.y+(i * groupheight)})
				  .attr("width", options.w)
				  .attr("height", headerheight)
				  .style("stroke", "none")
				  .style("fill", "#c8c2ae")
			
				  
			group.append("text")
				 .attr("text-anchor", "middle")
				 .attr("x", options.x + options.w/2)
				 .attr("y",function(d,i){return options.y+(i * groupheight) + headerheight/2})
				 .attr("dy", ".3em")	
				 .style("fill", "#000")
	  			 .style("font-size", textsize + "px")
	  			 .text(function(d){return d.question})
	  		
	  		var components = group.append("g")
								  .attr("class", "components"); 
								  
			
			var component = components.selectAll("g.component")
					  				  .data(function(d){return d.components})
									  .enter()
									  .append("g")
									  .attr("class", "component")
									  .each(function(d,i,j){
											var col = i;
											var row = j;
											var dim = {	x: options.x,
										   				y: headerheight + options.y + (row * groupheight),
										   				w: options.w/d.items,
										   				h: groupheight - headerheight
										   			}; 
													
											createcomponent(d3.select(this),dim, col,row, d);
										});	 
	  		
		}
		
	
	return {
		create: create
	}	
	
});