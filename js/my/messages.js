define(['jquery','d3', 'moment', 'util', 'radio'], function($,d3,moment,util, radio){
	
	"use strict";
	
	var 
	
		dim,
		
		cwidth = 0,
		
		maxevents = 0,
		
		padding = 10,
		
		messages = [],
		/*
			{
				
				id: 765,
				button: "a",
				label: "help me!",
				events: [{id:1, ts:1420804800, type:"press"}, {id:2,ts:1420805700, type:"response", data:"ok will get onto it"},{id:3,ts:1420810700, type:"response", data:"ok will get onto it"}]
			},
			{
				
				id: 735,
				button: "c",
				label: "plumbing!",
				events: [{id:4, ts:1420815600, type:"press"}, {id:5,ts:1420819200, type:"response", data:"will do what I can!"}]
			},
			{
				
				id: 745,
				button: "d",
				label: "another thing",
				events: [{id:6,ts:1421266914, type:"press"}, {id:7,ts:1421276914, type:"response", data:"will do what I can!"},{id:8,ts:1421296914, type:"response", data:"this is an important message!! so deal with it!"},{id:9,ts:1421316914, type:"response", data:"on our way to save the day"}]
			},
			{
				
				id: 785,
				button: "e",
				label: "another thing1",
				events: [{id:10,ts:1421266914, type:"press"}, {id:11,ts:1421276914, type:"response", data:"will do what I can!"},{id:12,ts:1421296914, type:"response", data:"will do what I can!"},{id:13,ts:1421316914, type:"response", data:"bite me!"}]
			},
			{
				
				id: 762,
				button: "f",
				label: "another thing2",
				events: [{id:14,ts:1421366914, type:"press"}, {id:15,ts:1421386914, type:"response", data:"will do what I can!"},{id:16,ts:1421396914, type:"response", data:"ok this needs some work do what I can!"},{id:17,ts:1421416914, type:"response", data:"this could work quite well i reckon!"}]
			},
			{
				
				id: 775,
				button: "g",
				label: "another thing3",
				events: [{id:18,ts:1421266914, type:"press"}, {id:19,ts:1421276914, type:"response", data:"will do what I can!"},{id:20,ts:1421296914, type:"response", data:"my bag!"},{id:21,ts:1421316914, type:"response", data:"this is nice and deals with an issue!"}]
			},
			{
				
				id: 715,
				button: "h",
				label: "another thing4",
				events: [{id:22,ts:1421266914, type:"press"}, {id:23,ts:1421276914, type:"response", data:"will do what I can!"},{id:24,ts:1421296914, type:"response", data:"ready to help"},{id:25,ts:1421316914, type:"response", data:"getting there at around the right time"}]
			},
			
		],*/
		
		svg,
		
		startpos,
		
		oldty,
		
		flowsheight,
	
		MAXFLOWWINDOW = 2,
		
		flowwindow 	 = function(){	
			return Math.min(Math.max(1,messages.length), MAXFLOWWINDOW);
		},
			
		visibleevent,
		
		slidesmoother = 0,
		
		mscale,
		
		sliderscale,		
		
		sliderposition,
		
		edges = [],
		
		selectoffset = 0,
		
		
		messageforevent = {},
		
		//silly - just need to flip mscale domain...
		inverseflidx = function(message){
			return messages.length-1-messages.indexOf(message);
		},
		
		eventypos = function(event){
			var message 	= messageforevent[event.id];
			var mindex  	= inverseflidx(message);
			var eventindex 	= message.events.indexOf(event);
			return mscale(mindex) + (eventindex * (flowsheight/message.events.length)) + (flowsheight/message.events.length)/2;
		},
		
		
		//bunch of functions for positioning messages
		
		corewidth =  function(){
			
			return Math.min(2*cwidth,dim.width()/2)
		},
		
		
		messageheight = function(){ 
			return dim.height()/6;
		},
		
		messagewidth = function(){
			return corewidth() + flowradius()*1.5
		},
		
		messagex = function(){
			var xpos = Math.floor(d3.select("rect.messagecolumn").attr("x"));
			return xpos - padding - flowradius()/2 - corewidth() - 1;
			
		},
		
		messagey = function(){
			return eventypos(visibleevent) - messageheight()/2
		},
		
		messageheaderheight = function(){
			return messageheight()/4
		},
		
		iconradius = function(){
			return (messageheight() * 3/4)/2
		},
		
		iconpadding = function(){
			return iconradius()/10
		},
		
		fontsize = function(){
			return iconradius()/2
		},
		
		headerfontsize = function(){
			return messageheaderheight() * 0.7
		},	
		
		dragslidermove = function(){
		
			if (flowwindow() >= messages.length)
				return;
				
			var topstop    = 0;
			var bottomstop = -(messages.length*flowsheight) + (dim.height()-dim.padding());
			
			var scrollscale = d3.scale.linear().range([0,bottomstop]);
			scrollscale.domain([dim.height(), dim.padding()]);
		
			var scrollspeed =   Math.abs(bottomstop/(dim.height()-dim.padding()));
			
		
			if (startpos == -1){
				startpos = d3.event.y;
				oldty = d3.transform(d3.select("g.flows").attr("transform")).translate[1] || 0;
				return;
			}
			
			
			var delta = (d3.event.y-startpos)*scrollspeed;
			
			var pos = Math.max(dim.padding(), d3.event.y);
			
			//var ty = (oldty+delta) * scrollspeed;
			var ty = delta+oldty;
			
			//var ty = d3.
			//make sure doesn't go off end!
			
			if (ty > 0){ 
				ty = 0;
			}
			if (ty < bottomstop){
			 ty=bottomstop;
			}
			
			d3.select("g.flows")
				.attr("transform", function(d,i){return "translate(0," + ty + ")"})  
			
			d3.select("g.message")
				.attr("transform", function(d,i){return "translate(0," + (ty+selectoffset) + ")"})  
		
				  //.attr("transform", function(d,i){return "translate(0," + (scrollscale(pos)-startpos) + ")"})
			
		},
		
		addmessage = function(message){
			
			messages.push(message);
			
			message.events.forEach(function(e){
				messageforevent[e.id] = message;
			});
			
			updatescales();
			maxevents = Math.max(maxevents, message.events.length);
			renderflows(true);
			updatemessagebox();
		},
		
		addevent = function(d){
			
			var msgids = messages.map(function(item){
				return item.id;
			})
			var idx = msgids.indexOf(d.id);
			
			if (idx != -1){
				var lastevent = messages[idx].events[messages[idx].events.length-1];
				messages[idx].events.push(d.event);
				maxevents = Math.max(maxevents, messages[idx].events.length);
				messageforevent[d.event.id] = messages[idx];
				edges.push({from:lastevent, to:d.event});
			}
			
			
			//e-sort based on most recent event!
			messages.sort(function(a,b){
				var amax = Math.max.apply(Math, a.events.map(function(item){return item.ts}));
				var bmax = Math.max.apply(Math, b.events.map(function(item){return item.ts}));
				return (amax > bmax) ? 1 : (amax < bmax) ? -1 : 0;
			});
			
			
			renderflows(false);
		},	
		
		dragslider = d3.behavior.drag()
  					   .on("drag", dragslidermove)
						.on("dragstart", function(){startpos = -1}),
		
		updatemessagebox = function(){
			if (visibleevent){
				redrawmessagebox();
			}
		},
		
		eventclicked = function(event){
			
		
			var msg = messageforevent[event.id];
			
			if (msg){
				radio('readmessage').broadcast(msg.buttonid);
			}
			
			if (visibleevent){
				//if this is the same as the current event, remove it
				if (visibleevent.id == event.id && visibleevent.id == event.id){
					visibleevent = undefined;
					d3.select("g.message").remove();
				}else{
					visibleevent = event;
					movemessagebox();
				}
			}else{
				visibleevent = event;
				createmessagebox(event.type);
			}
		},
		
		redrawmessagebox = function(){
			var msgbox = d3.select("g.message")
			
			var xpos = Math.floor(d3.select("rect.messagecolumn").attr("x"))		   
			
			msgbox.select("rect.message")						
					.attr("x", xpos - messagewidth() + padding)
					.attr("y", messagey())
					.attr("width", messagewidth())
					.attr("height", messageheight())
				
			
			msgbox.select("rect.messageheader")
					.attr("x",  xpos - messagewidth() + padding)
					.attr("y", messagey())
					.attr("width", messagewidth())
					.attr("height",messageheaderheight())
					
			
			msgbox.select("circle.outermessageflowcircle")
					.attr("cx", xpos + flowradius() + padding)
					.attr("cy", messagey() + messageheight()/2)
					.attr("r", flowradius()+2)
					
			
			msgbox.select("circle.innermessageflowcircle")
					.attr("cx", xpos + flowradius() + padding)
					.attr("cy", messagey() + messageheight()/2)
					.attr("r", flowradius()*0.9)
			
			msgbox.select("circle.messageflowicon")
					.attr("cx", messagex()+ iconradius())
					.attr("cy", messagey() + messageheaderheight() + iconradius())
					.attr("r",  iconradius() - (2 * iconpadding()))
						
			msgbox.select("text.messageboxtext")
	  			  .attr("x", messagex() + 2*iconradius())
				  .attr("y", messagey() + messageheaderheight() + fontsize()/2 + iconpadding())
	  			  .style("font-size",  fontsize() + "px")
	  			  .call(util.autofit, messagewidth() - ((iconradius() - (2 * iconpadding()))*2  + headerfontsize()/2));
				 
			msgbox.select("text.messageboxheader")
	  			  .attr("x", messagex() +iconpadding() + headerfontsize()/2)
				  .attr("y", messagey() +iconpadding() + headerfontsize()/2)
	  			  .text(currentmessage().button)  
				  .call(util.autofit, messagewidth());
			
			 msgbox.select('text.bigicon')
    			  .attr("x", messagex()+ iconradius()+1)
    			  .attr("y",  messagey() + messageheaderheight() + iconradius() + (iconradius()/4))
    			  .style('font-size', iconradius() + "px")
    			  .text(currentmessage().type=="press" ? '\uf0a2' : '\uf0e5')	 			
		},
		
		
		movemessagebox = function(){
				 
			var messageheight = dim.height()/6;
			//re-append to top of g.flows, so not hidden by any new event
			//$("g.message").appendTo("g.flows");
			
				
			var messagey = eventypos(visibleevent) - messageheight/2;
			
			
			var flowty = d3.transform(d3.select("g.flows").attr("transform")).translate[1] || 0;
			selectoffset = messagey-d3.select("rect.message").attr("y")
			var ty =  selectoffset + flowty;
		
		
			d3.select("g.message")
				.transition()
				.duration(500)
				.attr("transform", "translate(0," + ty +")")
					
			d3.select("text.messageboxtext")
	  			 .text(currentmessage().data)
	  			 .call(util.autofit, messagewidth() - ((iconradius() - (2 * iconpadding()))*2  + headerfontsize()/2));
			
			d3.select("text.bigicon")
    		   .text(currentmessage().type=="press" ? '\uf0a2' : '\uf0e5')	 
		},
		
		currentmessage = function(){
			
			if (visibleevent){
				
				var message = messageforevent[visibleevent.id];
				
				var cm = {
					type: visibleevent.type,
					data: eventtotext(visibleevent),
					button: message.button,
					ts: visibleevent.ts,
				}
				
				return cm;
		
			}
			return "no data";
		},
		
		eventtotext = function(event){
			var message  = messageforevent[event.id];
		 	return event.type == "press" ? "the '" +  message.button + "' button was pressed" : event.data;
		},
		
		createmessagebox = function(){	
			
			
			selectoffset = 0;
			
			var xpos = Math.floor(d3.select("rect.messagecolumn").attr("x"))
			var flowty = d3.transform(d3.select("g.flows").attr("transform")).translate[1] || 0;
			
			var flowcontainer = d3.select("g#main")
									.append("g")
									.attr("class", "message")
									.attr("transform", "translate(0,"+flowty +")");
			
			flowcontainer.append("rect")					
					.attr("class", "message")
					.attr("x", xpos - messagewidth() + padding)
					.attr("y", messagey())
					.attr("width", messagewidth())
					.attr("height", messageheight())
					.style("fill", "#4d4d4d")
				
			
			flowcontainer.append("rect")
					.attr("class", "messageheader")
					.attr("x", xpos - messagewidth() + padding)
					.attr("y", messagey())
					.attr("width", messagewidth())
					.attr("height",messageheaderheight())
					.style("fill", "#959595")
					
			
			flowcontainer.append("circle")
					.attr("class", "outermessageflowcircle")
					.attr("cx", xpos + flowradius() + padding)
					.attr("cy", messagey() + messageheight()/2)
					.attr("r", flowradius()+2)
					.style("fill", "none")
					.style("stroke", "#4d4d4d")
					.style("stroke-width", 4)
					
			
			flowcontainer.append("circle")
					.attr("class", "innermessageflowcircle")
					.attr("cx", xpos + flowradius()+ padding)
					.attr("cy", messagey() + messageheight()/2)
					.attr("r", flowradius()*0.9)
					.style("fill", "none")
					.style("stroke", "white")
					.style("stroke-width", 3)
			
			flowcontainer.append("circle")
					.attr("class", "messageflowicon")
					.attr("cx", messagex()+ iconradius())
					.attr("cy", messagey() + messageheaderheight() + iconradius())
					.attr("r",  iconradius() - (2 * iconpadding()))
					.style("fill", "#006f9b")
					.style("stroke", "white")
					.style("stroke-width", 3)
			
			 flowcontainer.append('text')
			 	  .attr("class", "bigicon")
    			  .attr('font-family', 'FontAwesome')
    			  .attr("text-anchor", "middle")
    			  .attr("x", messagex()+ iconradius()+1)
    			  .attr("y",  messagey() + messageheaderheight() + iconradius() + (iconradius()/4))
    			  .style('font-size', iconradius() + "px")
    			  .style("fill", "white")
    			  .text(currentmessage().type=="press" ? '\uf0a2' : '\uf0e5')
    			
			
						
			flowcontainer.append("text")
				  .attr("class", "messageboxtext")
				  .attr("dy", ".3em")
	  			  .attr("x", messagex() + 2*iconradius())
				  .attr("y", messagey() + messageheaderheight() + fontsize()/2 + iconpadding())
	  			  .style("fill", "#fff")
	  			  .style("font-size",  fontsize() + "px")
	  			  .text(currentmessage().data)  
				  .call(util.autofit, messagewidth() - ((iconradius() - (2 * iconpadding()))*2  + headerfontsize()/2));
				  
			flowcontainer.append("text")
				  .attr("class", "messageboxheader")
				  .attr("dy", ".3em")
	  			  .attr("x", messagex() +iconpadding() + headerfontsize()/2)
				  .attr("y", messagey() +iconpadding() + headerfontsize()/2)
	  			  .style("fill", "#000")
	  			  .style("font-size",  headerfontsize() + "px")
	  			  .text(currentmessage().button)  
	  			  .call(util.autofit, messagewidth());
	  			  
	  		
		},
	
		
		renderflows		= function(animated){
			
			//if (maxevents >= 5){
			//	flowwindow() = 1;
			//	updatescales(); //this is not updating everything - need to find where failinG!
			//}
				
			
			//cwidth = Math.floor(d3.select("rect.messagecolumn").attr("width"));
			var titlefontsize = flowradius() * 0.8;
			var datefontsize = titlefontsize * 0.8;
			var xpos = Math.floor(d3.select("rect.messagecolumn").attr("x"));
			var midx = xpos + flowradius() + padding;
			
			//5 is the rhs padding
			var maxtextwidth = cwidth-((midx + flowradius() + 7)-xpos) - 5;
			
			d3.selectAll("text.eventtitle")
	  			  .attr("x",midx + flowradius() + padding)
				  .attr("y", function(d){return eventypos(d) - headerfontsize() + flowradius()/2})
	  			  .style("font-size",  titlefontsize + "px")	
				  .call(util.autofit, maxtextwidth);
				  
			d3.selectAll("text.eventdate")
	  			  .attr("x",midx + flowradius() + padding)
				  .attr("y", function(d){return eventypos(d) +  flowradius()/1.5})
	  			  .style("font-size",  datefontsize + "px")
	  		 	  .call(util.autofit, maxtextwidth);
			
			
			d3.selectAll('text.icon')
    			  .attr("x", midx+1)
    			  .attr("y",  function(d){return eventypos(d) + flowradius()/2})
    			  .style('font-size', (titlefontsize)*1.5 + "px");  
			
			if (!animated){
			//update current
				d3.selectAll("rect.flowcontainer")
					 .attr("x", xpos)
					  .attr("y", function(d){return mscale(inverseflidx(d))})
					  .attr("width", cwidth)
					  .attr("height", flowsheight)
				  
				d3.selectAll("circle.event")
					.attr("cx", midx)
					.attr("cy", function(d){return eventypos(d)})
					.attr("r", flowradius())
			
				d3.selectAll("line.edge")
					.attr("x1",midx)
					.attr("x2",midx)
					.attr("y1",function(d){return eventypos(d.from) + flowradius()})
					.attr("y2",function(d){return eventypos(d.to) - flowradius()})
						 
				
	  			 
			}
			else{
				d3.selectAll("rect.flowcontainer")
					 .transition()
					 .duration(500)
					 .attr("x", xpos)
					  .attr("y", function(d){return mscale(inverseflidx(d))})
					  .attr("width", cwidth)
					  .attr("height", flowsheight)
				  
				d3.selectAll("circle.event")
				 	.transition()
					 .duration(500)
					.attr("cx", midx)
					.attr("cy", function(d){return eventypos(d)})
					.attr("r", flowradius())
			
				d3.selectAll("line.edge")
					 .transition()
					 .duration(500)
					.attr("x1",midx)
					.attr("x2",midx)
					.attr("y1",function(d){return eventypos(d.from) + flowradius()})
					.attr("y2",function(d){return eventypos(d.to) - flowradius()})
					
			}
				
			
			d3.select("g.flows").call(dragslider);
			
			var flows = d3.select("g.flows")		
						.selectAll("g.flow")
						.data(messages, function(d){return d.id})
						
						
			var flow = flows.enter()
				 			.append("g")
				 			.attr("class","flow");
										
		  			
			flow.insert("rect")
				 	.attr("class", "flowcontainer")
				  	.attr("x", xpos)
				  	.attr("y", function(d){
				  		return mscale(inverseflidx(d))
				  	})
				  	.attr("width", cwidth)
				  	.attr("height", flowsheight)
				  	.style("stroke", "black")
					.style("fill", "white")
				   	.style("fill-opacity", 1.0)
			
			var flowedges = d3.select("g.flows")
								.selectAll("line.edge")
							 	.data(edges)
				
			flowedges.enter()
					.append("line")
					.attr("class", "edge")
					.attr("x1",midx)
					.attr("x2",midx)
					.attr("y1",function(d){return eventypos(d.from) + flowradius()})
					.attr("y2",function(d){return eventypos(d.to) - flowradius()})
					.style("stroke", "black")
					.style("stroke-width", 2);
			
									
			var flowlist =  d3.selectAll("g.flow")
							.selectAll("g.event")
							.data(function(d){return d.events}, function(event){return event.id})	 
							
							
			var event = flowlist.enter()
							.append("g")
							.attr("class", "event")
							
							
			event.append("circle")
					.attr("class", "event")
					.attr("cx", midx)
					.attr("cy", function(d){return eventypos(d)})
					.attr("r", flowradius())
					 .style("fill", function(d){
    			  		return d.type=="press" ? "#020f43":"white";
    			  		
    			  	})
					.style("stroke", "#4d4d4d")
					.style("stroke-width", 2)
					.call( d3.behavior.drag().on("dragstart", function(d){
							util.handledrag(d, function(d){
								eventclicked(d);
							});
					}))
						
					
			
			 event.append('text')
			 	   .attr("class", "icon")
    			  .attr('font-family', 'FontAwesome')
    			  .attr("text-anchor", "middle")
    			  .attr("x", midx+1)
    			  .attr("y",  function(d){return eventypos(d) + flowradius()/2})
    			  .style('font-size', (titlefontsize)*1.5 + "px")
    			  .style("fill", function(d){
    			  		return d.type=="press" ? "white" : "#4d4d4d";
    			  		
    			  })
    			  .text(function(d){
    					return d.type=="press" ? '\uf0a2' : '\uf0e5';
    			  })
    			  .call( d3.behavior.drag().on("dragstart", function(d){
							util.handledrag(d, function(d){
								eventclicked(d);
							});
					}))
    	
    		/*event.append("rect")
    			 .attr("x", midx + flowradius() + 7)
    			 .attr("y", function(d){return eventypos(d) - headerfontsize() + flowradius()/2})
    			 .attr("width", maxtextwidth)
    			 .attr("height",30)
    			 .attr("fill", "red")*/
    			 
			event.append("text")
				  .attr("class", "eventtitle")
	  			  .attr("x",midx + flowradius() + 7)
				  .attr("y", function(d){return eventypos(d) - headerfontsize() + flowradius()/2})
	  			  .style("fill", "#4d4d4d")
	  			  .style("font-size", titlefontsize+ "px")
	  			  .text(function(d){return eventtotext(d).trunc(20, true)}) 
	  			  .call(util.autofit, maxtextwidth);
				
		
				 
			event.append("text")
				  .attr("class", "eventdate")
	  			  .attr("x",midx + flowradius() + 7)
				  .attr("y", function(d){return eventypos(d) +  flowradius()/1.5})
	  			  .style("fill", "#006f9b")
	  			  .style("font-size",  datefontsize + "px")
	  			  .text(function(d){return moment.unix(d.ts).format("MMM Do, h:mm:ss a")})  
	  			 // .call( d3.behavior.drag().on("dragstart", eventclicked))
	  			  .call(util.autofit, maxtextwidth);
	  			  					
			flows
				.exit()
				.remove();

			flowlist.exit()
				.remove();

			flowedges.exit()
					.remove();
		
		},
		
		flowradius = function(){
			
			return Math.min(cwidth/10,  ((flowsheight / maxevents)/2) * 0.6);
			//return Math.min(cwidth, dim.height())/20;
		},
		
		updatescales = function(){
			sliderscale.range([dim.padding(), dim.height()])
					   .domain([0,messages.length])
					   
			mscale.range([dim.headerpadding(), dim.height()])
				  .domain([0,  flowwindow()])
				  
			flowsheight = (mscale.range()[1]-mscale.range()[0])/(mscale.domain()[1]-mscale.domain()[0]);
		},
	
		update = function(w){
			cwidth = w;
			render();
		},
		
		render = function(){
			
			
			updatescales();
			renderflows(true);
			updatemessagebox();
		},
			
			
			
		subscribe = function(){
			radio('message').subscribe(addmessage);
			radio('event').subscribe(addevent);
		},
		
			
		init = function(d){
			
			dim = d;
			
			//cwidth = Math.floor(d3.select("rect.messagecolumn").attr("width"));
			
			if (messages.length > 0){
				messages.forEach(function(message){
					maxevents = Math.max(maxevents, message.events.length);
				});
			
			
				var times = messages.map(function(message,i){
			
					return message.events.map(function(event,i){
						messageforevent[event.id] = message;
						return event.ts;
					});
				}).reduce(function(a,b){
					return a.concat(b);	
				});
				

				edges = messages.map(function(message){
					return message.events.map(function (event, index){
						if (index < message.events.length -1)
							return {from:event, to:message.events[index+1]};
					}).filter(function(item, index){
						return index < message.events.length -1;
					});
				}).reduce(function(a,b){
					return a.concat(b);	
				});	
			}  			
  			
  			//set up slider scale
  			sliderscale = d3.scale.linear().range([dim.padding(), dim.height()]);		
  			sliderscale.domain([0, messages.length]);
  			sliderposition = dim.padding();
  			
  			//set up message scale
  			mscale 		= d3.scale.linear().range([dim.padding(), dim.height()]);
			//render();
			subscribe();
			
		}

	return {
		init: init,
		update: update,
		addmessage:addmessage,
	}

});