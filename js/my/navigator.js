define(['jquery','d3','radio'], function($,d3, radio){

	var 
		svg,
		
		dim,
		
		demos 	 = [ 
						{name:"add button", callback:addclicked},
						{name:"add category", callback:categoryclicked},
				   ],
		
		screens  = [
						{name:"user", id:"buttons"},
						{name:"button maker", id:"buttonmaker"},
						{name:"dashboard", id:"dashboard"},
						{name:"stats", id:"stats"}
					],
		
		addclicked = function(d){
		
		},
		
		categoryclicked = function(d){
		
		},
		
		slide = function(d){
			
			d3.select("#dashboard")
				.transition()
				.duration(1000)
				.style("left", -dim.width() + "px");
			
			d3.select("#buttonmaker")
				.transition()
				.duration(1000)
				.style("left", "0px");	
		},
		
		
		navbarheight = function(){
			return dim.height() * 3/5;
		},
		
		init = function(d, ids){
			dim = d;
			
			
			buttonwidth = navbarheight() * 0.8;
			
			svg = d3.select("#navigator")
					  .style("left", dim.x() + "px")
					  .style("top",  dim.y() + "px")
					  .attr("width", dim.width() + dim.margin().left + dim.margin().right + "px" )
					  .attr("height",dim.height() + dim.margin().top + dim.margin().bottom + "px" )
			 		  .append("svg")
			 		  .attr("id", "navigator")
			 		  .attr("width", dim.width() + dim.margin().left + dim.margin().right)
					  .attr("height",dim.height() + dim.margin().top + dim.margin().bottom)
			 		  .append("g")
					  .attr("id", "navmain");
			
			
			
						  
			svg.append("rect")
				.attr("x", dim.x())
				.attr("y", dim.height()*2/5)
				.attr("width", dim.width())
				.attr("height", navbarheight())
				.style("fill", "black")
				.attr("opacity", 0.7)
			
			svg.append("rect")
				.attr("x", dim.x())
				.attr("y", 0)
				.attr("width", dim.width()/15)
				.attr("height", dim.height()*2/5)
				.style("fill", "#006f9b");
		
			svg.append("text")
				.attr("x", dim.x() + (dim.width()/15)/2)
				.attr("y", (navbarheight() * 2/5))
				.attr("dy", ".2em")
				.style("fill", "#fff")
				.attr("text-anchor", "middle")
				.style("font-size", (navbarheight() * 2/5) +  "px")
				.text("DEMO") 	
				
			
			var viewnavs = svg.selectAll("g.view")
							  .data(screens)
			
			var viewitem = viewnavs
								.enter()
								.append("g")
								.attr("class", "viewnavitem")
			
			var menuitemwidth = dim.width()/2 / screens.length;
				
			viewnavs
				.append("text")
				.attr("x", function(d, i){
											return dim.width()/2 + (i * menuitemwidth)})
				.attr("y", dim.height() * 2/5  + navbarheight()/2)
				.style("fill", "#fff")
				.attr("dy", ".2em")
				.attr("text-anchor", "middle")
				.style("font-size", (navbarheight() * 2/5) +  "px")
				.text(function(d){return d.name}) 	
				.on("click", slide);
									
		}
		
	return{
		init: init	
	}

});