define(['jquery','d3','radio', 'util'], function($,d3, radio, util){

	"use strict";
	
	var 
		svg,
		
		dim,
				
		demoup = false,
		
		buttonindex = 0,
		
		viewpos = {},
		
		buttons = [],
		
		lastid = -1,
		
		addclicked = function(){
			
			
			if (lastid != -1){
				lastid = -1;
				
				buttons = [];
				
				d3.json("buttons/additions.json", function(error, json){
					
					if (error){
						console.log(error);
					}
					
					json.forEach(function(category){
						category.buttons.forEach(function(button){
						
							button.category = category.category;
						
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
						
							buttons.push(button);
						});
					});
					if (buttonindex < buttons.length){
						radio('newbutton').broadcast(buttons[buttonindex]);
					}
					buttonindex = (buttonindex+1)%buttons.length;	
				});
			}else{
				if (buttonindex < buttons.length){
					radio('newbutton').broadcast(buttons[buttonindex]);
				}
			
				buttonindex = (buttonindex+1)%buttons.length;
				console.log(buttonindex);
			}
		},
		
		
		refresh = function(d){
			
			//don't bother refreshing if already on this one.
			if (d.id == lastid)
				return;
				
			lastid = d.id;
			
			console.log("am in refresh!");
			
			d3.json("buttons/" + d.id + ".json", function(error, json){
				if (error){
					console.log(error);
					return;
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
				
				radio('refreshbuttons').broadcast(buttons);
			});
		},
		
		
		
		demos 	 = [ 
						{name:"+ add button", callback:addclicked},
						{id:"andy", name:"andy (leaseholder)", callback:refresh},
						{id:"sue",  name:"sue (tenant)", callback:refresh},
						{id:"dave", name:"dave (leaseholder)", callback:refresh},
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
			return dim.width()/2.5 / demos.length;
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
		
		
		render = function(){
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
				//.on("click", slide)
				.call( d3.behavior.drag().on("dragstart", function(d){
					util.handledrag(d, function(d){
						
						slide(d);
					});
				}))
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
				.style("font-size", ((navbarheight() * 2/5)*0.7) +  "px")
				.text(function(d){return d.name})
				//.on("click", function(d){d.callback(d)})  	
				.call( d3.behavior.drag().on("dragstart", function(d){
					util.handledrag(d, function(d){
						d.callback(d)
					});
				}))
			
				.call(util.autofit, demoitemwidth())
		},
		
		
		init = function(d, ids){
		
			d3.json("buttons/additions.json", function(error, json){
				if (error){
					console.log(error);
				}
					
				json.forEach(function(category){
					category.buttons.forEach(function(button){
						
						button.category = category.category;
						
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
						
						buttons.push(button);
					});
				});

				render();
			});
			
			screens.forEach(function(item,i){
				viewpos[item.name] = i;
			});
			
			dim = d;
								
		}
		
	return{
		init: init,
		update: update,	
	}

});