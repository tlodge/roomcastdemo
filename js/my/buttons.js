define(['jquery','d3','messages', 'util', 'controls', 'radio'], function($,d3, messages, util, controls, radio){
	
	"use strict";
	
	var 
	
		bcount = 0,
	
		dim,
		
		svg  = d3.select("#buttons")
			.append("svg")
			.attr("id", "buttons")
			.append("g")
			.attr("id", "main")
			.attr("class", "bigclip"),
		
		
		//taken back these from dim (now don't need to auto update domains etc)
		
		cwidth = function(){
			return dim.width() / (buttons.length+1);
		},
		
		xscale = function(){
			 return d3.scale.linear().range([0, dim.width()])
		 						 .domain([0, buttons.length+1]);
		},
		
		yscale = function(){
			return d3.scale.linear().range([dim.headerpadding()+dim.padding(), dim.height()])
		 							.domain([0, buttons.length+1]);
		},
		
		buttons = [
			{
				category:"concierge",
				colour:"#1cb78c",
				buttons: [
				
				{
						name:"valet",
						options:[
							{
								name:"when",
								question:"roughly when would you like the key to be released?",
								components:[
										{name:"rows", id:"rows", type:"slider", min:1, max:20, value:8, callback:function(value){
											console.log(value);
										}},
								
										{name:"cols", id:"cols",type:"slider", min:1, max:20, value:8, callback:function(value){
											console.log(value);
										}}
								]
							}
						]
				}
				]
			},
			{
				category:"SOMETHING",
				colour:"#1cb78c",
				buttons: [
				
				{
						name:"oooh",
						options:[
							{
								name:"when",
								question:"roughly when would you like the key to be released?",
								components:[
										{name:"rows", id:"rows", type:"slider", min:1, max:20, value:8, callback:function(value){
											console.log(value);
										}},
								
										{name:"cols", id:"cols",type:"slider", min:1, max:20, value:8, callback:function(value){
											console.log(value);
										}}
								]
							}
						]
				}
				]
			}
		],
			
	
	
		pressed = function(d){
		
			messages.addmessage(d);
			selectoptions(d);
		},
			
			
		selectoptions = function(d){
		
			var buttonradius = cwidth()/8;
			var optwidth  = dim.width() - (2 * cwidth()/4);
			var optheight = dim.height() - dim.headerpadding()*2.6
			var opty = dim.headerpadding()*1.3;
			var optx = cwidth()/4;
			
			//update
			svg.selectAll("g.options")
					
			//enter
			var options = svg.selectAll("g.options")
							 .data([d], function(d){return d.name})
				
			var option = options.enter()
								.append("g")
								.attr("class", "options")
			
			
				
			option.append("rect")
				.attr("x", optx)
				.attr("y", opty)
				.attr("width", optwidth)
				.attr("height", optheight)
				.style("fill", "white")
				.style("stroke", "#70675c")
				.style("opacity", 0.98)
				//.style("stroke-width",2);
			
			var cpanel = option.append("g")
				   			   .attr("class", "hook");
				   			   	
			option.append("path")
				  .attr("class", "heading")
  				  .attr("d", function(d){					
  							return util.optionsheading({
  															x:optx,
  															y:opty,
  															w:optwidth,
  															h:dim.headerpadding()	
  														
  														});
  				  })
  				  .style("fill", "#70675c")
  				  .style("stroke", "none")
  				  .style("stroke-width", 0)
			
			option.append("text")
				.attr("class", "optionsmainheader")
				.attr("dy", ".3em")
				.attr("x", optx+optwidth/50)
				.attr("y",opty+ dim.headerpadding()/2)	
				.style("fill", "#fff")
				.style("font-size", (dim.headerpadding()*0.9+ "px"))
				.text(function(d){return d.name}) 	
			
			option.append("rect")
				.attr("x", optx)
				.attr("y", opty+optheight-buttonradius)
				.attr("width", optwidth)
				.attr("height", buttonradius)
				.style("fill", "#70675c")
				.style("stroke", "#70675c")
				.style("stroke-width",2);
				
			option.append("circle")
				  .attr("class", "sendbutton")
				  .attr("cx", optx + optwidth - 2*buttonradius)
				  .attr("cy",opty + optheight)
				  .attr("r",buttonradius)
				  .style("fill","#f47961")
				  .style("stroke","#70675c")
				  .style("stroke-width", 2)	
				  .on("click", function(d){d3.select("g.options").remove()})
			
			option.append("text")
				.attr("class", "optionsend")
				.attr("dy", ".3em")
				.attr("text-anchor", "middle")
				.attr("x", optx + optwidth - 2*buttonradius)
				.attr("y",opty + optheight)	
				.style("fill", "#fff")
				.style("font-size", buttonradius/2.5+ "px")
				.text("SEND") 	
				.on("click", function(d){d3.select("g.options").remove()})
				
			option.append("circle")
				  .attr("class", "cancelbutton")
				  .attr("cx", optx + optwidth - 5*buttonradius)
				  .attr("cy",opty + optheight)
				  .attr("r",buttonradius)
				  .style("fill","#f47961")
				  .style("stroke","#70675c")
				  .style("stroke-width", 2)	
				  .on("click", function(d){d3.select("g.options").remove()})
			
			
			option.append("text")
				.attr("class", "optionsend")
				.attr("dy", ".3em")
				.attr("text-anchor", "middle")
				.attr("x", optx + optwidth - 5*buttonradius)
				.attr("y",opty + optheight)	
				.style("fill", "#fff")
				.style("font-size", buttonradius/2.5+ "px")
				.text("CANCEL") 
				.on("click", function(d){d3.select("g.options").remove()})
			//controls.create(cpanel, optwidth, padding, (width/2-padding), height-padding, controlsdata);
			controls.create({
					hook: cpanel,
					x: optx, 
					y: opty + dim.headerpadding(), 
					w: optwidth, 
					h: optheight -  dim.headerpadding() - buttonradius, 
					data: d.options
				}
			);
					
			options.exit()
				   .remove();
		
		},	
						
						
		update  = function(){
			console.log("buttons - updating!!");
			//buttons[0].buttons[1].message = "hello again";
			updatemasks();
			render();
		},
		
		//perhaps differentiate between renders for screen size change and renders for data change
		//as would be more efficient.
		render = function(){
//			dim.setxdomain([0, buttons.length+1])
			renderbuttons();
			rendermessagecolumn();
			renderheading();
			messages.render();
		},	
		
		renderheading = function(){
			
			var data = [{width: cwidth(), height: dim.headerpadding(), points: buttons.length}];
			
			
			//update
			
			d3.select("path.heading")
				.attr("d", function(d){
  					return util.categoryheading(d.width, d.height, d.points)
  			});
			
			//new data
			var categoryheading = svg.selectAll("g.heading")
									 .data(data, function(d){return d.width+" "+d.height})
									 
										
			categoryheading
						.enter()
						.append("g", "g.messages")
						.attr("class", "heading")
						.append("path")
						.attr("class", "heading")
  						.attr("d", function(d){		
  							return util.categoryheading(d.width, d.height, d.points)
  						})
  						.style("fill", "black")
  								
						
			//get rid of old data
			categoryheading
						.exit()
						.remove();
						
			var text = svg.select("g.heading")
							.selectAll("text.categoryheading")
							.data(buttons)
							.enter()
							
							
			text.append("text")
				.attr("class", "categoryheading")
				.attr("dy", ".3em")
				.attr("x", function(d,i){
					return xscale()(i) + cwidth()/2
				})
				.attr("y", dim.headerpadding()/2)	
				.attr("text-anchor", "middle")
				.style("fill", "white")
				.style("font-size", (dim.headerpadding()*0.4 + "px"))
				.text(function(d){return d.category}) 	
		
		},
		
		renderbuttons = function(){
			
			
			d3.select("#buttons")
  				.select("svg")
  				.attr("width", dim.width() + dim.margin().left)
				.attr("height",dim.height() + dim.margin().top)
				
  			var maxbuttons =	d3.max(buttons.map(function(item){return item.buttons.length}));
  		
  			var column = {};
  			var row = {};
  			
  			buttons.forEach(function(item, i){
  				item.buttons.forEach(function (b, j){
  					column[b.name] = i;
  					row[b.name] = j;
  				});
  			});
  			 
			var buttonradius = ((yscale().range()[1]-yscale().range()[0]-(dim.padding()*2))/buttons.length)/2;
  			
  			
  			var noteradius = dim.padding()/2.5;		
  		   
  			
  			var buttonx = function(name){
  				return cwidth() * column[name] + cwidth()/2;
  			}				
  			
  			var buttony = function(name){
  				//return dim.headerpadding() + (row[name] * buttonradius);
  				return  buttonradius + yscale()(row[name]);
  			}	
  			
  			var notex = function(name){
  				return xscale()(column[name]) + cwidth() - noteradius
  			}
  			
  			var notey = function(name){
  				return  yscale()(row[name]);
  			}
  			
  			svg.selectAll("rect.column")
  			   .attr("x", function(d,i){return xscale()(i)})
			   .attr("width",cwidth())
			   .attr("height",dim.height())
  			
  			svg.selectAll("rect.headerpadding")
  			 	.attr("x", function(d,i){return xscale()(i)})
				.attr("y", 0)
				.attr("width",cwidth())
				.attr("height",dim.headerpadding())
  			
  			svg.selectAll("circle.button")
  				.attr("cx", function(d,i,j){return buttonx(d.name)})
					.attr("cy", function(d,i,j){return buttony(d.name)})
					.attr("r", buttonradius * 0.8)
				
  			svg.selectAll("line.message")
							.attr("x1", function(d){return buttonx(d.name) + buttonradius})
							.attr("y1", function(d){return buttony(d.name) + buttonradius/8})
							.attr("x2", function(d){return notex(d.name)})
							.attr("y2", function(d){return notey(d.name)})
							.style("opacity", function(d){return d.message ?  1: 0});
							
			svg.selectAll("circle.message")
							.attr("cx", function(d){return notex(d.name)})
							.attr("cy", function(d){return notey(d.name)})
							.attr("r", noteradius)	
							.style("opacity",  function(d){return d.message ?  1: 0});
			
			svg.selectAll("text.categoryheading")
	  			  	.attr("x", function(d,i){return xscale()(i) + cwidth()/2})
					.attr("y", dim.headerpadding()/2)	
					.style("font-size", (dim.headerpadding()*0.5 + "px"))
					
			svg.selectAll("text.buttontext")
			
					.attr("x", function(d){return buttonx(d.name)})
					.attr("y", function(d){return buttony(d.name)})	
	  			  	.style("font-size", (buttonradius*0.3 + "px"))
	  			  	.text(function(d){return d.name})  	
	  			  	.call(wrap , buttonradius, buttonradius);
	  			  		
  			///handle new data					 
  		   	var categories = svg.selectAll("g.category")
  								.data(buttons, function(d){return d.category+buttons.length})
  								.enter()
								.insert("g", "g.message")
								.attr("class", "category")
  						
			var container = categories
								.append("g")
								.attr("class", "buttoncontainer")
					
			container.append("rect")
					 .attr("class", "column")
					 .attr("x", function(d,i){return xscale()(i)})
					 .attr("y", 0)
					 .attr("width",cwidth())
					 .attr("height",dim.height())
					 .style("fill",  function(d,i){return i %2 == 0? "#c8c2ae":"#dbdbdb"})
			
		
			
			
			//crucial bit to ensure that new buttons are picked up!
			
			var button =  d3.selectAll("g.category")
							.selectAll("g.button")
							 .data(function(d){return d.buttons})
							 .enter()
							 .append("g")
							.attr("class", "button");
			
			
			button.append("circle")
				  	.attr("class", "button")
				  	//.attr("rx",buttonradius)
				  	//.attr("ry",buttonradius)
					.attr("cx", function(d,i,j){return buttonx(d.name)})
					.attr("cy", function(d,i,j){return buttony(d.name)})
					.attr("r", buttonradius*0.8)
					//.attr("height", buttonradius)
					.style("stroke", "white")
					.style("stroke-width", 4)
					.style("fill",function(d){return column[d.name] % 2 == 0 ? "#f47961": "#006f9b"})
					.on("click", function(d){pressed(d)})
							
			button.append("line")
							.attr("class", "message")
							.attr("x1", function(d){return buttonx(d.name) + buttonradius})
							.attr("y1", function(d){return buttony(d.name) + buttonradius/8})
							.attr("x2", function(d){return notex(d.name)})
							.attr("y2", function(d){return notey(d.name)})
							.style("stroke-width", 1)
							.style("stroke", "black")	
							.style("opacity", 0)			
							.on("click", pressed)
							
			button.append("circle")
							.attr("class", "message")
							.attr("cx", function(d){return notex(d.name)})
							.attr("cy", function(d){return notey(d.name)})
							.attr("r", noteradius)	
							.style("stroke", "black")
							.style("stroke-width", 1)
							.style("fill", "white")
							.style("opacity", 0)
							.on("click", function(d){pressed(d);})
			
			button.append("text")
					.attr("class", "buttontext")
				  	.attr("dy", ".2em")
	  			  	.attr("x", function(d){return buttonx(d.name)})
					.attr("y", function(d){return buttony(d.name)})	
				  	.attr("text-anchor", "middle")
	  			  	.style("fill", "white")
	  			  	.style("font-size", (buttonradius*0.25 + "px"))
	  			  	.text(function(d){return d.name})  	
	  			  	.on("click", function(d){pressed(d)})
	  			  	.call(wrap , buttonradius, buttonradius);
	  			  	
		},
		
		
		rendermessagecolumn = function(){
			
			svg = d3.select("#buttons")
					.select("svg")
					.select("g#main");
			
			var cols = [buttons.length];
			
			//update columns
			d3.selectAll("rect.messagecolumn")
			  .attr("x", function(d){return  xscale()(d)})
			  .attr("y", 0)
			  .attr("width",cwidth())
			  .attr("height",dim.height());
			
			d3.selectAll("rect.messageheaderpadding")
			 	.attr("x", function(d) {return xscale()(d)})
				.attr("y", 0)
				.attr("width",cwidth())
				.attr("height",dim.headerpadding());
			
			d3.selectAll("text.messageheadertext")
	  			.attr("x",  function(d) {return xscale()(d) + cwidth()/2})
				.attr("y", dim.headerpadding()/2)	
	  			.style("font-size", (dim.headerpadding*0.3 + "px"))
	  		
	  		var msgs = svg
							.selectAll("g.messages")
							.data(cols,function(d){return d})
							
			
			var messages = msgs
							   .enter()
							   .append("g")
							   .attr("class", "messages msgclip")
							   
				
			messages.append("rect")
				.attr("class", "messagecolumn")
				.attr("x", function(d){return  xscale()(d)})
			    .attr("y", 0)
				.attr("width",cwidth())
				.attr("height",dim.height())
			 	.style("stroke-width",1)
				.style("stroke", "black")
				.style("fill", "none")
			
					 
			messages.append("g")
					.attr("class", "flows");
			
	
			messages.append("rect")
				.attr("class", "messageheaderpadding")
					 .attr("x", function(d) {return xscale()(d)})
					 .attr("y", 0)
					 .attr("width",cwidth())
					 .attr("height",dim.headerpadding())
					 .style("fill", "#006f9b")
			
			messages.append("text")
			 		.attr("class", "messageheadertext")
				  .attr("dy", ".3em")
	  			  .attr("x",  function(d) {return xscale()(d) + cwidth()/2})
				  .attr("y", dim.headerpadding()/2)	
				  .attr("text-anchor", "middle")
	  			  .style("fill", "white")
	  			  .style("font-size", (dim.headerpadding()*0.5 + "px"))
	  			  .text("timeline")  
	  
	  		//remove old
	  		msgs
				.exit()
	  			.remove();
	  	},		
	  			
	  	
	    wrap = function(text, width, height) {
	    
	    
		  text.each(function() {
			var text = d3.select(this),
				words = text.text().split(/\s+/).reverse(),
				word,
				line = [],
				lineNumber = 0,
				lineHeight = 1.1, // ems
				y = text.attr("y"),
				x = text.attr("x"),
				dy = parseFloat(text.attr("dy")),
				tspan = text.text(null).append("tspan").attr("x", x).attr("y", y).attr("dy", dy + "em");
			while (word = words.pop()) {
			  line.push(word);
			  tspan.text(line.join(" "));
			  if (tspan.node().getComputedTextLength() > width) {
				line.pop();
				tspan.text(line.join(" "));
				line = [word];
				tspan = text.append("tspan").attr("x", x).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
			  }
			}
			
			//adjust y if multiple lines
			if (lineNumber > 0){
				var adjust = parseFloat(text.style("font-size"))/1.5;
				text.selectAll("tspan")
					.attr("y", function(d){return d3.select(this).attr("y")-(lineNumber*adjust)});
			}
		  });
		},
		
		
		updatemasks = function(){
			
			var defs = d3.select("defs")
				
			defs.select("rect.bigClip")
				.attr("width", dim.width())
				.attr("height", dim.height());
			
			defs.select("rect.messageClip")
				.attr("x",cwidth()*buttons.length)
				.attr("y",0)
				.attr("width", cwidth()+dim.padding())
				.attr("height", dim.height());
		},	
		
		createmasks  = function(){
			
			 var clip = d3.select("svg#buttons")
			 			 .append("defs");
			 	
			 clip	
			 	.append("clipPath")
				.attr("id", "bigClip")
				.append("rect")
				.attr("class", "bigClip")
				.style("fill", "none")
				.attr("x",0)
				.attr("y",0)
				.attr("width", dim.width()+dim.margin().left+dim.margin().right)
				.attr("height", dim.height());
			
			clip
			 	.append("clipPath")
				.attr("id", "messageClip")
				.append("rect")
				.attr("class", "messageClip")
				.style("fill", "none")
				.attr("x",cwidth()*buttons.length)
				.attr("y",0)
				.attr("width", cwidth()+dim.padding())
				.attr("height", dim.height());	
		},
		
	
		init = function(d){
			
			dim = d;
			
			d3.select("#buttons")
  				.select("svg")
  			 	.attr("width", dim.width() + dim.margin().left + dim.margin().right)
				.attr("height",dim.height() + dim.margin().top + dim.margin().bottom)
					
			d3.select("g#main")
				.attr("transform", "translate(" + dim.margin().left + "," + dim.margin().top + ")");
				
			
			var params = {}
			
			if (location.search){
				var parts = location.search.substring(1).split('&');
				for (var i=0 ; i<parts.length; i++){
					var nv = parts[i].split("=");
					if (!nv[0]) continue;
					params[nv[0]] = nv[1] || true;
				}
			}
			
			messages.init(dim);
			
			render();
			
			
			
			createmasks();
			
			radio('newbutton').subscribe(function(button){
			
				var categories = buttons.map(function(d){
					return d.category;
				});
				
				var categoryindex = categories.indexOf(button.category);
				
				if (categoryindex != -1){
					buttons[categoryindex].buttons.push(button);
				}else{
					//create a new category
					buttons.push(
									{category:button.category,
									 buttons: [button]
								})
					
				}
				render();
			});
			
			
			//d3.select(window).on('resize', update);
			
			/*d3.select("#videos")
				.append("svg")
				.attr("id", "svg")
				.append("foreignObject")
				.attr("class", "video")
				.attr("width",630)
				.attr("height", 480)
				.append("video")
				.attr("id", "video")
				.attr("x",200)
				.attr("y",100)
				.attr("height", 480)
				.attr("width", 640)*/
			
			
		}
		
		return {
			init: init,
			update: update,
		}

});
