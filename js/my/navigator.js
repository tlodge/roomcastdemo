define(['jquery','d3','radio'], function($,d3, radio){

	var 
		svg,
		
		dim,
		
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
		
		init = function(d, ids){
			dim = d;
			
			buttonwidth = dim.height() * 0.8;
			
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
				.attr("y", 0)
				.attr("width", dim.width())
				.attr("height", dim.height())
				.style("fill", "black");
			
			svg.append("rect")
				.attr("x", dim.x() + dim.width()/2)
				.attr("y", (dim.height()-buttonwidth)/2)
				.attr("width", buttonwidth)
				.attr("height", buttonwidth)
				.style("fill", "#f47961")
				.on("click", slide);
		}
		
	return{
		init: init	
	}

});