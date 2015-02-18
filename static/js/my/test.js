define(['jquery','d3'], function($,d3){

	var 
		
		transform = ["", "-webkit-", "-moz-", "-ms-", "-o-"].reduce(function(p, v) { return v + "transform" in document.body.style ? v : p; }) + "transform",

 		data = [{id:0, name:"one"}, {id:1, name:"two"}, {id:2, name:"three"}],
		
		colourfor = function(d){
			var colours = ["red", "green", "blue"];
			return colours[d.id]; 
		},
		
		color = d3.scale.category10(),
		
		moveus = function(){
			console.log("in move us!");
			//for (var i =0; i < data.length; i++){
				d3.selectAll("div.box") //+ data[i].id)
					.transition()
					.duration(1000)
					.style("margin-top",  function(d){return (d.id * Math.floor(Math.random() * 100)) + "px"})
					
			//}
		
		},
		
		start = function(){
			
			
			
			var boxes = d3.select("div#test")
			   			  .selectAll("div.box")
			   			  .data(data)
			   
			var box = boxes.enter()
				  		  .append("div")
						  .attr("class", function(d){return "box box"+d.id})
						  .style("top", function(d){return "50px"})
						  .style("left", function(d){return (d.id * 150) + "px"})
						  .style("width", "50px")
						  .style("height", "50px")
						  .style("background", function(d){return colourfor(d)})
			  
			box.append("div")
			   .attr("class", function(d){return "smbox smbox"+d.id})
						  .style("width", "20px")
						  .style("height", "20px")
						  .style("background", function(d){return color(d.id)})
			box  	  
				.on("click", moveus);
				  
		}
	
		return{
			start:start
		}	
});