define(['jquery','d3', 'dimensions', 'util', 'moment'], function($, d3, dim, util, moment){

	"use strict";
	
	
	var 
	
		hook,
	
		createslider = function(options){
			  			 
			
			  var slidervaluesize = options.sliderradius/1.2;
			  
			  options.parent.append("line")
					  .attr("x1", options.x1)
					  .attr("x2", options.x2)
					  .attr("y1", options.y)
					  .attr("y2", options.y)
					  .style("stroke", "#4d4d4d")
					  .style("stroke-width", "1px")
			
			  options.parent.append("line")
					  .attr("x1", options.x1)
					  .attr("x2", options.x1)
					  .attr("y1", options.y-options.sliderradius/4)
					  .attr("y2", options.y+options.sliderradius/4)
					  .style("stroke", "#4d4d4d")
					  .style("stroke-width", options.sliderradius/20)
				
			  options.parent.append("line")
					  .attr("x1", options.x2)
					  .attr("x2", options.x2)
					  .attr("y1", options.y-options.sliderradius/4)
					  .attr("y2", options.y+options.sliderradius/4)
					  .style("stroke", "#4d4d4d")
					  .style("stroke-width", options.sliderradius/20)		
				
			  options.parent.append("rect")
					  .attr("class", "sliderbutton")
					  .attr("x", function(d){return  options.sliderscale(options.startvalue);})
					  .attr("y", options.y - options.sliderradius/2)
					  .attr("width", options.sliderradius)
					  .attr("height", options.sliderradius)
					  .style("stroke", "#4d4d4d")
					  .style("stroke-width", options.sliderradius/20)
					  .style("fill", "white")
					  .call(d3.behavior.drag().on("drag", function(d){
					  		var x = Math.min(Math.max(d3.event.x,options.sliderscale.range()[0]),options.sliderscale.range()[1]);
					  		var value = options.sliderscale.invert(x);
					  		var txtout = d3.select("text.option_" + options.id)
					  					  .text(options.formatter(value))
					  					
					  		if (options.styler != undefined){
					  			txtout.call(options.styler);
					  		}
					  		txtout.call(util.autofit, options.w)
					  		
					  		d3.select(this).attr("x",x);
					  }).on("dragend", function(){
					  		var d = d3.select(this).data();
					  		var x = d3.select(this).attr("x");
					  		var value =  options.sliderscale.invert(x);
					  		d[0].callback(value)
					  }))
					  	  
			  var finalval = options.parent.append("text")
	  				 .attr("class", function(d){return "option_" + options.id})
					 .attr("text-anchor", "middle")
					 .attr("x", options.x1 + (options.x2-options.x1)/2)
					 .attr("y", options.y + options.sliderradius*1.5)
					 .attr("dy", ".3em")	
					 .style("fill", "#000")
					 .style("font-size", slidervaluesize + "px")
					 .style("font-weight", "bold")
					 .text(function(d){return options.formatter(options.startvalue)})
					 .call(util.autofit, options.x2-options.x1);
			
			  if (options.styler != undefined){
					finalval.call(options.styler);
			  }
		},
		
		
		
		createdatecomponent 	= function(options){
			var y  =  options.dim.y + options.dim.h/3;
			var sliderradius = Math.min(options.dim.w/15,options.dim.h/4);
			var x1 = options.dim.x + sliderradius/4 + (options.dim.w/2)*options.col;
			var x2 =  options.dim.x + (options.dim.w/2)*options.col + (options.dim.w/2) - sliderradius/4;
		  
			//create the day slider
			var now 	 = moment();
			var latest = moment().add(7, 'days');
		  
			var sliderscale = d3.time.scale().range([x1,x2-sliderradius]).domain([now.toDate(), latest.toDate()])
		  
		  
			//curry the callback! that way it can distinguish between time and date!
		  
			
			createslider({
					parent		:	options.parent,
					x1			:	x1,
					x2			: 	x2,
					y 			: 	y,
					sliderradius: 	sliderradius,
					formatter	: 	 function(d){return moment(d).format("dddd Do ") + moment(d).format("MMMM").toUpperCase();},
					id			:   "day_" + options.row + "_" + options.col,
					startvalue 	: 	now.toDate(),
					sliderscale	:   sliderscale,
					styler		:   util.boldstyler,
			});
		
			var tx1 		= options.dim.x + sliderradius/4 + (options.dim.w/2)*(options.col+1);
			var tx2 		= options.dim.x + (options.dim.w/2)*(options.col+1) + (options.dim.w/2) - sliderradius/4;
			var tnow 		= moment().startOf('day');
			var tlatest   	= moment().endOf('day');
			var tsliderscale = d3.time.scale()
										.range([tx1,tx2-sliderradius])
										.domain([tnow.toDate(), tlatest.toDate()])	
		  
									
			//create the time slider
		  
			createslider({
					parent		:	options.parent,
					x1			:	tx1,
					x2			: 	tx2,
					y 			: 	y,
					sliderradius: 	sliderradius,
					formatter	: 	function(d){
							var ts = Math.floor(d.getTime()/1000);
							var precision = 15 * 60;
							return moment.unix(Math.round(ts/precision) * precision).format("hh:mm:ss")
					},	
					id			:   "time_" + options.row + "_" + options.col,
					startvalue 	: 	tnow.toDate(),
					sliderscale	:   tsliderscale,
				
			  });		
		
		},
		
		
		createslidercomponent = function(options){
	
			var y  =  options.dim.y + options.dim.h/3;
			var sliderradius = Math.min(options.dim.w/7.5,options.dim.h/4);
			var x1 = options.dim.x + sliderradius/4 + (options.dim.w)*options.col;
			var x2 =  options.dim.x + (options.dim.w)*options.col + (options.dim.w) - sliderradius/4;
		  
			  
			var sliderscale = d3.scale.linear()
			 					.range([x1,x2-sliderradius])
			 					.domain([options.data.min, options.data.max])
			
			
			createslider({
				  		parent		:	options.parent,
				  		x1			:	x1,
				  		x2			: 	x2,
				  		y 			: 	y,
				  		sliderradius: 	sliderradius,
				  		formatter	: 	 function(d){return options.data.formatter? options.data.formatter(d):Math.floor(d)},
				  		id			:   "day_" + options.row + "_" + options.col,
				  		startvalue 	: 	options.data.value,
				  		sliderscale	:   sliderscale,
				  		styler		:   util.boldstyler,
			});
		},
		
		
		buttonselected = function(){
		
			if (d3.event.defaultPrevented){
					return;
			}
			if (d3.event != null){
				d3.event.sourceEvent.stopPropagation();
				d3.event.sourceEvent.preventDefault();
			}
			var d = d3.select(this).data();
			d[0].value = !d[0].value;
			d3.select(this).style("fill", d[0].value?"#4d4d4d":"white");
			d[0].callback(d[0].value)
		},
		
		
		buttonlistener = d3.behavior.drag().on("dragstart",buttonselected),
		
		
		createbuttoncomponent = function(options){
			var y  =  options.dim.y + options.dim.h/3;
			var buttonradius = Math.min(options.dim.h/4, options.dim.w/4);
			var buttonlabelsize = buttonradius/1.2;
			  
		
			var x1 = options.dim.x + buttonradius*2 + options.dim.w*options.col;
			var x2 =  options.dim.x + options.dim.w*options.col + options.dim.w - buttonradius*2;
				
				
			options.parent.append("rect")
				  .attr("x", x1 + (x2-x1)/2 - buttonradius/2)
				  .attr("y", y - buttonradius/2)
				  .attr("width", buttonradius)
				  .attr("height", buttonradius)
				  .style("fill", function(d){return d.value?"#4d4d4d":"white"})
				  .style("stroke", "#4d4d4d")
				  .style("stroke-width", "2px")
			 	  .call(buttonlistener);
			

		   var opttxt = options.parent.append("text")
				 .attr("class", function(d){return "buttonlabel buttonlabel_" + d.id})
				 .attr("text-anchor", "middle")
				 .attr("x", x1 + (x2-x1)/2)
				 .attr("y", (y - buttonradius/2) + buttonradius + buttonlabelsize)
				 .attr("dy", ".3em")	
				 .style("fill", "#4d4d4d")
				 .style("font-size", buttonlabelsize + "px")
				 .text(function(d){return d.label})
				 .call(util.autofit, options.dim.w)
				 .call(util.unify, 'buttonlabel')
			 	 .call(buttonlistener);
				
		},
		
		
		
		createcomponent = function(options){
	
		
			var y  =  options.dim.y + options.dim.h/3;
			
			
			if (options.data.type=="video"){
				
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
				
				
				options.parent.append("circle")
				  .attr("cx", options.dim.x + options.dim.w/2)
				  .attr("cy", options.dim.y + options.dim.h/2)
				  .attr("r", options.dim.h/3)
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
			var textsize     = groupheight/8;
			
			var groups = options.hook.append("g")
							 .attr("class", "groups")
			
			groups.append("rect")
				  .attr("x", options.x)
				  .attr("y", options.y)
				  .attr("width", options.w)
				  .attr("height", options.h)
				  .attr("fill", "white");
				  
			var group  = groups.selectAll("g.group")
							   .data(options.data);
			
			group.enter()
				 .append("g")
				 .attr("class", "group")
			
			group.append("rect")
				 .attr("x", options.x)
				 .attr("y", function(d,i,j){return  options.y + (i * groupheight)})
				 .attr("width",options.w)
				 .attr("height",groupheight)
				 .style("fill", function(d,i,j){return i%2 == 0 ? "#ececec":"#cccccc"})	 
				 	  
			group.append("text")
				 .attr("text-anchor", "middle")
				 .attr("x", options.x + options.w/2)
				 .attr("y",function(d,i){return options.y+(i * groupheight) + groupheight/6})
				 .attr("dy", ".3em")	
				 .style("fill", "#000")
	  			 .style("font-size", textsize + "px")
	  			 .text(function(d){return d.question})
	  			 .call(util.autofit, options.w);
	  		  		
	  		var components = group.append("g")
								  .attr("class", "components"); 
					  
			
			var component = components.selectAll("g.component")
					  				  .data(function(d){return d.components})
									  .enter()
									  .append("g")
									  .attr("class", "component")
			
					
									  		 
			component.each(function(d,i,j){
							var col = i;
							var row = j;
							
							var dim = {	x: options.x,
										y: headerheight + options.y + (row * groupheight),
										w: options.w/d.items,
										h: groupheight - headerheight
									}; 
									
							var params = {
								parent: d3.select(this),
								dim: dim,
								row: row,
								col: col,
								data: d,
							};
							
							if (d.type=="date"){
								createdatecomponent(params);
							}else if (d.type=="slider"){	
								createslidercomponent(params);
							}else if (d.type=="button"){
								createbuttoncomponent(params);
							}else{
								createcomponent(params);
							}
						});	 
	  		
		}
		
	
	return {
		create: create
	}	
	
});