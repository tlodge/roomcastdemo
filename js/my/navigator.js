define(['jquery','d3','radio', 'util'], function($,d3, radio, util){

	"use strict";
	
	var 
		svg,
		
		dim,
				
		demoup = false,
		
		buttonindex = 0,
		
		viewpos = {},
		
		buttons = [
		{
			category:"concierge",
			name:"parking",
			options:[
						{
							name:"when",
							question:"roughly when would you like the key to be released?",
							components:[
									{name:"rows", id:"rows", type:"date", min:"today", max:10, value:"today", callback:function(value){
											console.log(value);
									}}
							]
						},
						{
							name:"duration",
							
							question:"roughly how long for?",
							
							components:[
								{name:"duration", id:"duration", type:"slider", min:1, max:20, value:10, callback:function(value){
									console.log(value);
								}, formatter:function(d){
											return Math.floor(d) + " hours";
								}},
							]
						},
						{
							name:"contact",
							
							question:"how shall we contact you?",
							
							components:[
								{name:"c1",id:"c1", type:"button", value: true, label:"tlodge@gmail.com", callback:function(value){
									console.log(value);
								}},
								{name:"c2",id:"c2", type:"button", value: true, label:"07972639571", callback:function(value){
									console.log(value);
								}},
								{name:"c3",id:"c3", type:"button", value: true, label:"don't contact me!", callback:function(value){
									console.log(value);
								}},
							]
						}
					]					
				
			},
			
			{
					category:"concierge",
					name:"parking permit for today",
					options:[
						{
							name:"when",
							question:"you sure you want a permit?",
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
				
			},
			{
						category:"security",
						name: "escort me",
						options:[
						{
							name:"help",
							question:"here is a video",
							components:[
								{name:"video", id:"myvideo", type:"video", src:"video/test.mp4", callback:function(value){
									console.log(value);
								}}
							]
						}]
			}
		],
		
		
		
		addclicked = function(){
			if (buttonindex < buttons.length){
				radio('newbutton').broadcast(buttons[buttonindex]);
			}
			buttonindex++;
		},
		
		
		
		demos 	 = [ 
						{name:"+ add button", callback:addclicked}
						//{name:"add category", callback:categoryclicked},
				   ],
		
		screens  = [
						{name:"user", id:"buttons"},
						{name:"button maker", id:"buttonmaker"},
						{name:"dashboard", id:"dashboard"},
						{name:"stats", id:"stats"}
					],
		
		currentscreen  = screens[0],
		
		menuitemwidth = function(){
			return dim.width()/2 / screens.length;
		},
		
		viewitemwidth = function(){
			return dim.width()/2 / screens.length;
		},
		
		demoitemwidth = function(){
			return dim.width()/4 / demos.length;
		},
		
		categoryclicked = function(d){
		
		},
		
		
		slide = function(d){
			if (d.id == currentscreen.id){
				return;
			}
			else{
				d3.select("#" + d.id)
				  .transition()
				  .duration(1000)
				  .style("left", "0px");
				
				var tx;
				
				if (screens.indexOf(currentscreen) < screens.indexOf(d)){
					tx = -dim.width();
				}else{
					tx = dim.width();
				}
				
				d3.select("#" + currentscreen.id)
				  	 .transition()
				  	.duration(1000)
				  	.style("left", tx + "px");
				
				currentscreen = d;	
				
				d3.selectAll("rect.viewselection")
					.transition()
					.duration(500)
					.attr("x", dim.width()/2 + (viewpos[d.name] * menuitemwidth()))
					.attr("y", dim.height() * 2/5)
			
			}
		},
		
		
		navbarheight = function(){
			return dim.height() * 3/5;
		},
		
		toggledemo = function(){
			if (demoup){
				d3.select("#navigator")
					 .transition()
				 	 .duration(500)
					 .style("top",  dim.y() +  "px")
			}else{
				d3.select("#navigator")
					 .transition()
				 	 .duration(500)
					 .style("top", (dim.y() + navbarheight())+  "px")
			}
			demoup = !demoup;
		},
		
		update = function(){
			
		  	
			var nav = d3.select("#navigator");
			
			nav 			
			   	.attr("width", dim.width() + dim.margin().left + dim.margin().right + "px" )
			   	.attr("height",dim.height() + dim.margin().top + dim.margin().bottom + "px" )
				.style("left", dim.x() + "px");
			
			nav.select("svg#navigator")
			   .attr("width", dim.width() + dim.margin().left + dim.margin().right)
			   .attr("height",dim.height() + dim.margin().top + dim.margin().bottom);
			
			nav.selectAll("text.viewitem")
				.attr("x", function(d, i){return dim.width()/2 + (i * menuitemwidth()) + menuitemwidth()/2})
				.attr("y", dim.height() * 2/5  + navbarheight()/2)
				.style("font-size", (navbarheight() * 2/5) +  "px")
				.call(util.autofit, viewitemwidth())
				
			nav.selectAll("text.demoitem")
				.attr("x", function(d, i){return (i * demoitemwidth()) + demoitemwidth()/2})
				.attr("y", dim.height() * 2/5  + navbarheight()/2)	
			
			nav.selectAll("rect.viewselection")
				.attr("x", dim.width()/2 + (viewpos[currentscreen.name] * menuitemwidth()))
				.attr("y", dim.height() * 2/5)
				.attr("width", viewitemwidth())
				.attr("height", dim.height()*3/5)
				
			nav.select("rect.demobar")
				.attr("x", dim.x())
				.attr("y", dim.height()*2/5)
				.attr("width", dim.width())
				.attr("height", navbarheight())
			
			nav.select("rect.labelbar")
				.attr("x", dim.x())
				.attr("y", 0)
				.attr("width", dim.width()/15)
				.attr("height", dim.height()*2/5)
			
		
					
			
			if (demoup){
				nav.style("top",  (dim.y() + navbarheight()) +  "px");	  
			}else{
			 	nav.style("top",  dim.y() +  "px");
			}
			
			var startindex = screens.indexOf(currentscreen);
			
			for (var i = startindex+1; i < screens.length; i++){
				d3.select("#" + screens[i].id).style("left", (dim.width()*i) + "px");
			}
		},
		
		
		init = function(d, ids){
		
			screens.forEach(function(item,i){
				viewpos[item.name] = i;
			});
			
			dim = d;
			
			
			var buttonwidth = navbarheight() * 0.8;
			
			
			svg = d3.select("#navigator")
					  .style("left", dim.x() + "px")
					  .style("top",  (dim.y() + navbarheight()) +  "px")
					  .attr("width", dim.width() + dim.margin().left + dim.margin().right + "px" )
					  .attr("height",dim.height() + dim.margin().top + dim.margin().bottom + "px" )
			 		  .append("svg")
			 		  .attr("id", "navigator")
			 		  .attr("width", dim.width() + dim.margin().left + dim.margin().right)
					  .attr("height",dim.height() + dim.margin().top + dim.margin().bottom)
			 		  .append("g")
					  .attr("id", "navmain");
					  
						  
			svg.append("rect")
				.attr("class","demobar")
				.attr("x", dim.x())
				.attr("y", dim.height()*2/5)
				.attr("width", dim.width())
				.attr("height", navbarheight())
				.style("fill", "black")
				.attr("opacity", 0.7)
			
			svg.append("rect")
				.attr("class","labelbar")
				.attr("x", dim.x())
				.attr("y", 0)
				.attr("width", dim.width()/15)
				.attr("height", dim.height()*2/5)
				.style("fill", "#006f9b")
				//.on("click", toggledemo)
				.call( d3.behavior.drag().on("dragstart", toggledemo))
				
			svg.append("text")
				.attr("x", dim.x() + (dim.width()/15)/2)
				.attr("y", (navbarheight() * 2/5))
				.attr("dy", ".2em")
				.style("fill", "#fff")
				.attr("text-anchor", "middle")
				.style("font-size", (navbarheight() * 2/5) +  "px")
				.text("DEMO") 	
				//.on("click", toggledemo)
				.call( d3.behavior.drag().on("dragstart", toggledemo))
			
			svg.append("rect")
				.attr("class", "viewselection")
				.attr("x", dim.width()/2 + (0 * menuitemwidth()))
				.attr("y", dim.height() * 2/5)
				.attr("width", viewitemwidth())
				.attr("height", dim.height()*3/5)
				.style("fill", "#f47961")

			
			var viewnavs = svg.selectAll("g.view")
							  .data(screens)
			
			var viewitem = viewnavs
								.enter()
								.append("g")
								.attr("class", "viewnavitem")
			
		
				
			viewitem
				.append("text")
				.attr("class", "viewitem")
				.attr("x", function(d){return dim.width()/2 + (viewpos[d.name] * menuitemwidth()) + menuitemwidth()/2})
				.attr("y", dim.height() * 2/5  + navbarheight()/2)
				.style("fill", "#fff")
				.attr("dy", ".2em")
				.attr("text-anchor", "middle")
				.style("font-size", (navbarheight() * 2/5) +  "px")
				.text(function(d){return d.name}) 	
				.on("click", slide)
				.call(util.autofit, viewitemwidth())
			
			var demonavs = svg.selectAll("g.demoitem")
							  .data(demos)
			
			var demoitem = demonavs
								.enter()
								.append("g")
								.attr("class", "demoitem")
			
			
				
			demoitem
				.append("text")
				.attr("class", "demoitem")
				.attr("x", function(d, i){
											return (i * demoitemwidth()) + demoitemwidth()/2})
				.attr("y", dim.height() * 2/5  + navbarheight()/2)
				.style("fill", "#fff")
				.attr("dy", ".2em")
				.attr("text-anchor", "middle")
				.style("font-size", (navbarheight() * 2/5) +  "px")
				.text(function(d){return d.name})
				//.on("click", addclicked)  	
				.call( d3.behavior.drag().on("dragstart", addclicked))						
		}
		
	return{
		init: init,
		update: update,	
	}

});