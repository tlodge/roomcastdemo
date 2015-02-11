define(['jquery','d3','messages', 'util', 'controls', 'radio'], function($,d3, messages, util, controls, radio){
	
	"use strict";
	
	var 

		dim,
		
		svg  = d3.select("#buttons")
			.append("svg")
			.attr("id", "buttons")
			.append("g")
			.attr("id", "main")
			.attr("class", "bigclip"),
		
		
		//taken back these from dim (now don't need to auto update domains etc)
		
		cwidth = function(){
			return Math.floor((dim.width() - dim.width()/5)  / buttons.length+1);
		},
		
		mwidth = function(){
			return Math.floor(dim.width()/5);
		},
		
		mxscale = function(d){
			 return d3.scale.linear().range([0, dim.width()-dim.width()/5])
		 						 .domain([0, buttons.length]);
		},
		
		xscale = function(){
			 return d3.scale.linear().range([0, dim.width()-(dim.width()/5)])
		 						 .domain([0, buttons.length]);
		},
		
		buttons = [],
		
		send = function(d){

			radio('buttonpress').broadcast(d);
			//messages.addmessage(d);
		},
			
		selectoptions = function(d){
		
			var buttonradius = dim.height()/15;
			var optwidth  = dim.width() /1.2;
			var optheight = dim.height() * 0.8;
			
			var infoboxwidth = optwidth/3;
			
			var opty = (dim.height() - optheight)/2;
			var optx = (dim.width() - optwidth)/2;
			var infopadding = 7;
			
			d3.selectAll("g")
				.style("opacity", 0.5);
				
			//update
			d3.selectAll("g#main")
				.style("opacity", 1.0)
				.selectAll("g.options")
				.style("opacity", 1.0);	
				
			//enter
			var options = svg.selectAll("g.options")
							 .data([d], function(d){return d.name})
				
			var option = options.enter()
								.append("g")
								.attr("class", "options")
								
			var cpanel = option.append("g")
				   			   .attr("class", "hook");
				   			   	
			option.append("rect")
				.attr("x", optx)
				.attr("y", opty)
				.attr("width", infoboxwidth)
				.attr("height", optheight)
				.style("fill", "white")
			
			option.append("text")
				.attr("class", "optionsinfo")
				.attr("dy", ".3em")
				.attr("x", optx + infopadding)
				.attr("y",opty + buttonradius/2 + buttonradius/6)	
				.style("fill", "#4d4d4d")
				.style("font-size", (buttonradius * 0.8) + "px")
				.text(function(d){return d.name}) 
				.call(util.autofit, infoboxwidth)
					
			option.append("foreignObject")
    			 	.attr("x", optx )
					.attr("y", opty + buttonradius/2 + buttonradius/6 + buttonradius/2)
					.attr("width", infoboxwidth)
					.attr("height", optheight)
  				   .append("xhtml:body")
    			   .style("background", "transparent")
    			   .style("line-height", "1.5em")
    			   .style("padding", infopadding + "px")
    			  
    			   .html(function(d){return d.info});
			
			
			options.append("rect")
				.attr("x", optx)
				.attr("y", opty)
				.attr("width", optwidth)
				.attr("height", buttonradius/6)
				.style("fill", "#4d4d4d")
				
			options.append("rect")
				.attr("x", optx)
				.attr("y", opty+optheight-buttonradius)
				.attr("width", optwidth)
				.attr("height", buttonradius)
				.style("fill", "#4d4d4d")
			
			options.append("text")
				.attr("class", "optionsend")
				.attr("dy", ".3em")
				.attr("text-anchor", "middle")
				.attr("x", optx + optwidth - 2*buttonradius)
				.attr("y",opty + optheight - (buttonradius/2))	
				.style("fill", "#fff")
				.style("font-size", buttonradius/2.5+ "px")
				.text("SEND") 
				.call( d3.behavior.drag().on("dragstart", function(d){
					util.handledrag(d, function(d){
						d3.select("g.options").remove(); 
						d3.selectAll("g").style("opacity", 1.0);
						send(d);
					});
				}));	
				
				//wrap this with the prevent default stuff!
				
				//.on("click", function(d){d3.select("g.options").remove()
				//						 d3.selectAll("g").style("opacity", 1.0);})
				
		
			
			
			options.append("text")
				.attr("class", "optionsend")
				.attr("dy", ".3em")
				.attr("text-anchor", "middle")
				.attr("x", optx + optwidth - 5*buttonradius)
				.attr("y",opty + optheight - (buttonradius/2))	
				.style("fill", "#fff")
				.style("font-size", buttonradius/2.5+ "px")
				.text("CANCEL") 
				.call( d3.behavior.drag().on("dragstart", function(d){
					util.handledrag(d, function(d){
						d3.select("g.options").remove(); 
						d3.selectAll("g").style("opacity", 1.0);
					});
				}));	
				
			
			
			//controls.create(cpanel, optwidth, padding, (width/2-padding), height-padding, controlsdata);
			controls.create({
					hook: cpanel,
					x: optx+infoboxwidth, 
					y: opty, 
					w: optwidth-infoboxwidth, 
					h: optheight - buttonradius, 
					data: d.options
				}
			);
					
		
			options.exit()	   
				.remove()
				  
		
		},	
						
						
		//called on screen size update
		update  = function(){	
			renderbuttons();
			renderheading();
			rendermessagecolumn();
			messages.update(mwidth());
			updatemasks();
		},
		
		//called when new buttons added
		render = function(){
			renderbuttons();
			renderheading();
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
									 
			svg.selectAll("text.categoryheading")
	  			  	.attr("x", function(d,i){return xscale()(i) + cwidth()/2})
					.attr("y", dim.headerpadding()/2)	
					.style("font-size", (dim.headerpadding()*0.5 + "px"))
	  				.call(util.autofit, cwidth())						
			
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
							.data(buttons, function(d){return d.category})
							
							
			text.enter()
				.append("text")
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
				.call(util.autofit, cwidth())	
			
			text
				.exit()
				.remove();
			
			//replace the messages at the front of the doc!	
			$("g.messages").appendTo("g#main");	
		},
	
		dragpressed = function(d){		
			selectoptions(d);
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
  					column[b.id] = i;
  					row[b.id] = j;
  				});
  			});
  			 
  			var buttonwidth  = Math.floor(cwidth() - dim.padding()*2);
  			var buttonheight = (((dim.height() - dim.headerpadding()) - dim.padding()*2) / maxbuttons) - dim.padding() ; 
  		
  			var fontsize = buttonheight*0.2;
  			
  			var yscale = d3.scale.linear().range([dim.headerpadding() + dim.padding(), dim.height()])
  			 								  .domain([0, maxbuttons]);
  			
  			var buttonx = function(id){
  				return cwidth() * column[id] + dim.padding();
  			}				
  			
  			var buttony = function(id){
  				return  yscale(row[id]);
  			}	
	  			  		
  			///handle new data					 
  		   	var cat = svg.selectAll("g.category")
  								.data(buttons);//, function(d){return d.category+d.buttons.length})
  			
  			var categories = cat.enter()
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
					 .style("fill",  function(d,i){return i %2 == 0? "#cccccc":"#ececec"})
			
		
			
			
			//crucial bit to ensure that new buttons are picked up!
			
			var butts =  d3.selectAll("g.category")
							.selectAll("g.button")
							 .data(function(d){return d.buttons}, function(d){return d.id})
							 
			var button = butts.enter()
							  .append("g")
							  .attr("class", "button");
			
		
			button.append("rect")
				  	.attr("class", "button")
					.attr("x", function(d){return buttonx(d.id)})
					.attr("y", function(d){return buttony(d.id)})
					.attr("width", buttonwidth)
					.attr("height", buttonheight)
					.style("stroke", "white")
					.style("stroke-width", 4)
					.style("fill",function(d){return column[d.id] % 2 == 0 ? "#f47961": "#006f9b"})
					.call( d3.behavior.drag().on("dragstart", function(d){util.handledrag(d,dragpressed)}));
						
			
			 button.append("text")
							.attr("class", "buttontext")
	  			  			.attr("x", function(d){return buttonx(d.id) + buttonwidth/2 })
							.attr("y", function(d){return buttony(d.id) + buttonheight/2 + fontsize/4})	
				  			.attr("text-anchor", "middle")
	  			  			.style("fill", "white")
	  			  			.style("font-size", fontsize + "px")
	  			  			.text(function(d){return d.name})  	
	  			  			.call(util.autofit , buttonwidth)
	  						.call(d3.behavior.drag().on("dragstart", function(d){util.handledrag(d,dragpressed)}));
	  		
	  		cat
	  			.exit()
	  			.remove()
	  		
	  		butts
	  			.exit()
	  			.remove()
	  			
	  		svg.selectAll("rect.column")
  			   .transition()
  			   .duration(500)
  			   .attr("x", function(d,i){return xscale()(i)})
			   .attr("width",cwidth())
			   .attr("height",dim.height())
  			
  			
  			svg.selectAll("rect.headerpadding")
  			 	.attr("x", function(d,i){return xscale()(i)})
				.attr("y", 0)
				.attr("width",cwidth())
				.attr("height",dim.headerpadding())
  			
  			svg.selectAll("rect.button")
  					.transition()
  					.duration(500)
					.attr("x", function(d){return buttonx(d.id)})
					.attr("y", function(d){return buttony(d.id)})
					.attr("width", buttonwidth)
					.attr("height", buttonheight)
			  				
			svg.selectAll("text.buttontext")
					.attr("x", function(d){return buttonx(d.id) + buttonwidth/2 })
					.attr("y", function(d){return buttony(d.id) + buttonheight/2 + fontsize/4})	
	  			  	.style("font-size", fontsize + "px")
	  			  	.text(function(d){return d.name})  	
	  			  	.call(util.autofit , buttonwidth);
	  			
			
		},
		
		
		rendermessagecolumn = function(){
			
			svg = d3.select("#buttons")
					.select("svg")
					.select("g#main");
			
			var cols = [buttons.length];
			
			//update columns
			d3.selectAll("rect.messagecolumn")
			  .attr("x", function(d){return mxscale()(d)})
			  .attr("y", 0)
			  .attr("width",mwidth())
			  .attr("height",dim.height());
			
			d3.selectAll("rect.messageheaderpadding")
			 	.attr("x", function(d) {return mxscale()(d)})
				.attr("y", 0)
				.attr("width",mwidth())
				.attr("height",dim.headerpadding());
			
			d3.selectAll("text.messageheadertext")
	  			.attr("x",  function(d) {return mxscale()(d) + mwidth()/2})
				.attr("y", dim.headerpadding()/2)	
	  			.style("font-size", (dim.headerpadding*0.5 + "px"))
	  			.call(util.autofit, mwidth())
	  			
	  		var msgs = svg
							.selectAll("g.messages")
							.data(cols,function(d){return d})
							
			
			var messages = msgs
							   .enter()
							   .append("g")
							   .attr("class", "messages msgclip")
							   
				
			messages.append("rect")
				.attr("class", "messagecolumn")
				.attr("x", function(d){return  mxscale()(d)})
			    .attr("y", 0)
				.attr("width",mwidth())
				.attr("height",dim.height())
				.style("fill", "none")
			
					 
			messages.append("g")
					.attr("class", "flows");
			
	
			messages.append("rect")
				.attr("class", "messageheaderpadding")
					 .attr("x", function(d) {return mxscale()(d)})
					 .attr("y", 0)
					 .attr("width",mwidth())
					 .attr("height",dim.headerpadding())
					 .style("fill", "#006f9b")
			
			messages.append("text")
			 		.attr("class", "messageheadertext")
				  .attr("dy", ".3em")
	  			  .attr("x",  function(d) {return mxscale()(d) + mwidth()/2})
				  .attr("y", dim.headerpadding()/2)	
				  .attr("text-anchor", "middle")
	  			  .style("fill", "white")
	  			  .style("font-size", (dim.headerpadding()*0.5 + "px"))
	  			  .text("timeline")  
	  			  .call(util.autofit, mwidth())
	  		//remove old
	  		msgs
				.exit()
	  			.remove();
	  	},		
	  			
		
		updatemasks = function(){
			
			var defs = d3.select("defs")
				
			defs.select("rect.bigClip")
				.attr("width", dim.width())
				.attr("height", dim.height());
			
			defs.select("rect.messageClip")
				.attr("x",cwidth()*buttons.length)
				.attr("y",0)
				.attr("width", mwidth())
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
		
		subscribe = function(){
			radio('newbutton').subscribe(function(button){
			
				var categories = buttons.map(function(d){
					return d.category;
				});
				
				var categoryindex = categories.indexOf(button.category);
				
				if (categoryindex != -1){
					var idx = (buttons[categoryindex].buttons.map(function(item){
						return item.id;
					}).indexOf(button.id));
					
					if (idx == -1)
						buttons[categoryindex].buttons.push(button);
					else{
						console.log("already got " + button.id + " so not adding!");
					}
				}else{
					//create a new category
					buttons.push(
									{category:button.category,
									 buttons: [button]
								})
					
				}
				render();
			});
		
			radio('refreshbuttons').subscribe(function(newbuttons){
				
				d3.selectAll("g.category")
					.remove();
					
				d3.selectAll("g.heading")
					.remove();	
				
				buttons = newbuttons;	
				render();
			});
		},
		
		init = function(d){
			
			dim = d;
			messages.init(dim);
			
			d3.select("#buttons")
  				.select("svg")
  			 	.attr("width", dim.width() + dim.margin().left + dim.margin().right)
				.attr("height",dim.height() + dim.margin().top + dim.margin().bottom)
					
			d3.select("g#main")
				.attr("transform", "translate(" + dim.margin().left + "," + dim.margin().top + ")");
				
			
			
			
			
			
			d3.json("buttons/demo.json", function(error, json){
				if (error){
					console.log(error);
				}
				
				buttons = json;
				
				buttons.forEach(function(category){
					category.buttons.forEach(function(button){
						button.options.forEach(function(option){
							option.components.forEach(function(component){
								if (component.valueLabel){
									component.formatter = function(value){
										return Math.floor(value) + " " + component.valueLabel;
									}
								}
								component.callback = function(value){
									console.log(value);
								}
							});
						});
					});
				});
				createmasks();
				update();
				subscribe();
				
			});
			
			
		}
		
		return {
			init: init,
			update: update,
		}

});
