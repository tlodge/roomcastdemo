define(['jquery','d3', 'moment', 'util'], function($,d3,moment,util){
	
	"use strict";
	
	var 
	
		dim,
		
		messages = [
			{
				flow: 0,
				button: "a",
				label: "help me!",
				events: [{ts:1420804800, type:"press"}, {ts:1420805700, type:"response", data:"ok will get onto it"},{ts:1420810700, type:"response", data:"ok will get onto it"}]
			},
			{
				flow: 1,
				button: "c",
				label: "plumbing!",
				events: [{ts:1420815600, type:"press"}, {ts:1420819200, type:"response", data:"will do what I can!"}]
			},
			{
				flow: 2,
				button: "d",
				label: "another thing",
				events: [{ts:1421266914, type:"press"}, {ts:1421276914, type:"response", data:"will do what I can!"},{ts:1421296914, type:"response", data:"this is an important message!! so deal with it!"},{ts:1421316914, type:"response", data:"on our way to save the day"}]
			},
			{
				flow: 3,
				button: "e",
				label: "another thing1",
				events: [{ts:1421266914, type:"press"}, {ts:1421276914, type:"response", data:"will do what I can!"},{ts:1421296914, type:"response", data:"will do what I can!"},{ts:1421316914, type:"response", data:"bite me!"}]
			},
			{
				flow: 4,
				button: "f",
				label: "another thing2",
				events: [{ts:1421366914, type:"press"}, {ts:1421386914, type:"response", data:"will do what I can!"},{ts:1421396914, type:"response", data:"ok this needs some work do what I can!"},{ts:1421416914, type:"response", data:"this could work quite well i reckon!"}]
			},
			{
				flow: 5,
				button: "g",
				label: "another thing3",
				events: [{ts:1421266914, type:"press"}, {ts:1421276914, type:"response", data:"will do what I can!"},{ts:1421296914, type:"response", data:"my bag!"},{ts:1421316914, type:"response", data:"this is nice and deals with an issue!"}]
			},
			{
				flow: 6,
				button: "h",
				label: "another thing4",
				events: [{ts:1421266914, type:"press"}, {ts:1421276914, type:"response", data:"will do what I can!"},{ts:1421296914, type:"response", data:"ready to help"},{ts:1421316914, type:"response", data:"getting there at around the right time"}]
			},
			
		],
		
		svg,
		
		startpos,
		
		oldty,
		
		flowindex = {},
		
		flowsheight,
	
		flowwindow 	 = 2,
			
		visibleevent,
		
		slidesmoother = 0,
		
		mscale,
		
		sliderscale,		
		
		sliderposition,
		
		edges = [],
		
		selectoffset = 0,
		
		flidx = function(message){
			return flowindex[message.flow];
		},
		
		inverseflidx = function(message){
			return messages.length-1-flidx(message);
		},
		
		cpos = function(d){
			return  mscale(inverseflidx(d)) + (d.id * (flowsheight/messages[flidx(d)].events.length))  + (flowsheight/messages[flidx(d)].events.length)/2;
		},
		
		
		//bunch of functions for positioning messages
		
		corewidth =  function(){
			var cwidth = Math.floor(d3.select("rect.messagecolumn").attr("width"));
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
			return xpos - corewidth();
		},
		
		messagey = function(){
			return cpos(visibleevent) - messageheight()/2
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
		
		addmessage = function(d){
			var lastmessage = messages[messages.length-1];
			 
			messages.push({
				flow: lastmessage.flow+1,
				button: "h",
				label: "another thingy 4",
				events: [{flow:lastmessage.flow+1, id:0, ts:1421466914, type:"press"}]
			}),
			//messages.forEach(function(message, i){
			flowindex[lastmessage.flow+1] = lastmessage.flow+1;
			//});
			sliderscale.domain([0,messages.length])
			renderflows(true);
			updatemessagebox();
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
			
			if (visibleevent){
				//if this is the same as the current event, remove it
				if (visibleevent.id == event.id && visibleevent.flow == event.flow){
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
			
						   
			msgbox.select("rect.message")						
					.attr("x", messagex())
					.attr("y", messagey())
					.attr("width", messagewidth())
					.attr("height", messageheight())
				
			
			msgbox.select("rect.messageheader")
					.attr("x", messagex())
					.attr("y", messagey())
					.attr("width", messagewidth())
					.attr("height",messageheaderheight())
					
			
			msgbox.select("circle.outermessageflowcircle")
					.attr("cx", messagex()+messagewidth()+flowradius())
					.attr("cy", messagey() + messageheight()/2)
					.attr("r", flowradius()+2)
					
			
			msgbox.select("circle.innermessageflowcircle")
					.attr("cx", messagex()+messagewidth()+flowradius())
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
	  			  
			msgbox.select("text.messageboxheader")
	  			  .attr("x", messagex() +iconpadding() + headerfontsize()/2)
				  .attr("y", messagey() +iconpadding() + headerfontsize()/2)
	  			  .text(currentmessage().button)  
							
		},
		
		
		movemessagebox = function(){
				 
			var messageheight = dim.height()/6;
			//re-append to top of g.flows, so not hidden by any new event
			//$("g.message").appendTo("g.flows");
			
				
			var messagey = cpos(visibleevent) - messageheight/2;
			
			
			var flowty = d3.transform(d3.select("g.flows").attr("transform")).translate[1] || 0;
			selectoffset = messagey-d3.select("rect.message").attr("y")
			var ty =  selectoffset + flowty;
		
		
			d3.select("g.message")
				.transition()
				.duration(500)
				.attr("transform", "translate(0," + ty +")")
					
			d3.select("text.messageboxtext")
	  			 .text(currentmessage().data)
		},
		
		currentmessage = function(){
			
			if (visibleevent){
				var message  = messages[flowindex[visibleevent.flow]];
				
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
			var message  = messages[flowindex[event.flow]];
		 	return event.type == "press" ? "the '" +  message.button + "' button was pressed" : event.data;
		},
		
		createmessagebox = function(){	
			
			
			selectoffset = 0;
			
			var flowty = d3.transform(d3.select("g.flows").attr("transform")).translate[1] || 0;
			
			var flowcontainer = d3.select("g#main")
									.append("g")
									.attr("class", "message")
									.attr("transform", "translate(0,"+flowty +")");
			
			flowcontainer.append("rect")					
					.attr("class", "message")
					.attr("x", messagex())
					.attr("y", messagey())
					.attr("width", messagewidth())
					.attr("height", messageheight())
					.style("fill", "#4d4d4d")
				
			
			flowcontainer.append("rect")
					.attr("class", "messageheader")
					.attr("x", messagex())
					.attr("y", messagey())
					.attr("width", messagewidth())
					.attr("height",messageheaderheight())
					.style("fill", "#959595")
					
			
			flowcontainer.append("circle")
					.attr("class", "outermessageflowcircle")
					.attr("cx", messagex()+messagewidth()+flowradius())
					.attr("cy", messagey() + messageheight()/2)
					.attr("r", flowradius()+2)
					.style("fill", "none")
					.style("stroke", "#4d4d4d")
					.style("stroke-width", 4)
					
			
			flowcontainer.append("circle")
					.attr("class", "innermessageflowcircle")
					.attr("cx", messagex()+messagewidth()+flowradius())
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
						
			flowcontainer.append("text")
				  .attr("class", "messageboxtext")
				  .attr("dy", ".3em")
	  			  .attr("x", messagex() + 2*iconradius())
				  .attr("y", messagey() + messageheaderheight() + fontsize()/2 + iconpadding())
	  			  .style("fill", "#fff")
	  			  .style("font-size",  fontsize() + "px")
	  			  .text(currentmessage().data)  
		
			flowcontainer.append("text")
				  .attr("class", "messageboxheader")
				  .attr("dy", ".3em")
	  			  .attr("x", messagex() +iconpadding() + headerfontsize()/2)
				  .attr("y", messagey() +iconpadding() + headerfontsize()/2)
	  			  .style("fill", "#000")
	  			  .style("font-size",  headerfontsize() + "px")
	  			  .text(currentmessage().button)  
		},
	
		
		renderflows		= function(animated){
			
			
			
			var cwidth =  Math.floor(d3.select("rect.messagecolumn").attr("width"));
			var xpos = Math.floor(d3.select("rect.messagecolumn").attr("x"));
			var midx = xpos + flowradius() * 2.5;
			
			
			if (!animated){
			//update current
				d3.selectAll("rect.flowcontainer")
					 .attr("x", xpos)
					  .attr("y", function(d){return mscale(inverseflidx(d))})
					  .attr("width", cwidth)
					  .attr("height", flowsheight)
				  
				d3.selectAll("circle.event")
					.attr("cx", midx)
					.attr("cy", function(d){return cpos(d)})
					.attr("r", flowradius())
			
				d3.selectAll("line.edge")
					.attr("x1",midx)
					.attr("x2",midx)
					.attr("y1",function(d){return cpos(d.from) + flowradius()})
					.attr("y2",function(d){return cpos(d.to) - flowradius()})
						 
				d3.selectAll("text.eventtitle")
	  			  .attr("x",midx + flowradius()*2)
				  .attr("y", function(d){return cpos(d) - headerfontsize() + flowradius()/2})
	  			  .style("font-size",  headerfontsize() + "px")	
				  .call(util.autofit, cwidth- ((midx + flowradius()*2)-xpos));
				  
				d3.selectAll("text.eventdate")
	  			  .attr("x",midx + flowradius()*2)
				  .attr("y", function(d){return cpos(d) +  flowradius()/1.5})
	  			  .style("font-size",  (headerfontsize()*0.8) + "px")
	  			 
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
					.attr("cy", function(d){return cpos(d)})
					.attr("r", flowradius())
			
				d3.selectAll("line.edge")
					 .transition()
					 .duration(500)
					.attr("x1",midx)
					.attr("x2",midx)
					.attr("y1",function(d){return cpos(d.from) + flowradius()})
					.attr("y2",function(d){return cpos(d.to) - flowradius()})
					
				d3.selectAll("text.eventtitle")
				  .transition()
				  .duration(500)
	  			  .attr("x",midx + flowradius()*2)
				  .attr("y", function(d){return cpos(d) - headerfontsize() + flowradius()/2})
	  			  .style("font-size",  headerfontsize() + "px")	
				  .call(util.autofit, cwidth- ((midx + flowradius()*2)-xpos));
				    
				d3.selectAll("text.eventdate")
				 .transition()
				  .duration(500)
	  			  .attr("x",midx + flowradius()*2)
				  .attr("y", function(d){return cpos(d) +  flowradius()/1.5})
	  			  .style("font-size",  (headerfontsize()*0.8) + "px")
			}
				
			
			d3.select("g.flows")
						.call(dragslider)
			
			var flows = d3.select("g.flows")		
						.selectAll("g.flow")
						.data(messages, function(d,i){return d.flow})
						
						
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
				   	.style("fill-opacity", 0.5)
			
			var flowedges = d3.select("g.flows")
								.selectAll("line.edge")
							 	.data(edges)
				
			flowedges.enter()
					.append("line")
					.attr("class", "edge")
					.attr("x1",midx)
					.attr("x2",midx)
					.attr("y1",function(d){return cpos(d.from) + flowradius()})
					.attr("y2",function(d){return cpos(d.to) - flowradius()})
					.style("stroke", "black")
					.style("stroke-width", 2);
									
			var flowlist =  d3.selectAll("g.flow")
							.selectAll("g.event")
							.data(function(d){return d.events}, function(event){return event.ts})	 
							.enter()
							.append("g")
							.attr("class", "event")
							
							
			flowlist.append("circle")
					.attr("class", "event")
					.attr("cx", midx)
					.attr("cy", function(d){return cpos(d)})
					.attr("r", flowradius())
					.style("fill", "#dbdbdb")
					.style("stroke", "#4d4d4d")
					.style("stroke-width", 2)
					.on("click", eventclicked);
		
			flowlist.append("text")
				  .attr("class", "eventtitle")
	  			  .attr("x",midx + flowradius()*2)
				  .attr("y", function(d){return cpos(d) - headerfontsize() + flowradius()/2})
	  			  .style("fill", "#4d4d4d")
	  			  .style("font-size",  headerfontsize() + "px")
	  			  .text(function(d){return eventtotext(d).trunc(30, true)}) 
	  			  .on("click", eventclicked)
	  			  .call(util.autofit, cwidth- ((midx + flowradius()*2)-xpos));
				
		
				 
			flowlist.append("text")
				  .attr("class", "eventdate")
	  			  .attr("x",midx + flowradius()*2)
				  .attr("y", function(d){return cpos(d) +  flowradius()/1.5})
	  			  .style("fill", "#006f9b")
	  			  .style("font-size",  (headerfontsize()*0.8) + "px")
	  			  .text(function(d){return moment.unix(d.ts).format("MMM Do, h:mm:ss a")})  
	  			  .on("click", eventclicked);					
			flows
				.exit()
				.remove();
			
			flowedges.exit()
					.remove();
		
		},
		
		flowradius = function(){
			var cwidth = Math.floor(d3.select("rect.messagecolumn").attr("width"));
			return Math.min(cwidth, dim.height())/20;
		},
		
		updatescales = function(){
			sliderscale.range([dim.padding(), dim.height()]);
			mscale.range([dim.headerpadding(), dim.height()]);
			mscale.domain([0,  flowwindow])
			flowsheight = (mscale.range()[1]-mscale.range()[0])/(mscale.domain()[1]-mscale.domain()[0]);
		},
	
		render = function(){
			updatescales();
			renderflows(true);
			updatemessagebox();
		},
				
		init = function(d){
			dim = d;
			
			var times = messages.map(function(flow,i){
				flowindex[flow.flow] = i;
				return flow.events.map(function(event,i){
					event.flow = flow.flow;
					event.id = i;
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
  			
  			//set up slider scale
  			sliderscale = d3.scale.linear().range([dim.padding(), dim.height()]);		
  			sliderscale.domain([0, messages.length]);
  			sliderposition = dim.padding();
  			
  			//set up message scale
  			mscale 		= d3.scale.linear().range([dim.padding(), dim.height()]);
			//render();
			
		}

	return {
		init: init,
		render: render,
		addmessage:addmessage,
	}

});