define(['jquery','d3', 'util'], function($,d3,util){

	"use strict"
	
	var 
	
		users = [
						{name:"security", "users":[{id:1, name:"alan"}, {id:2, name:"ronald"}, {id:3, name:"emma"}, {id:4, name:"james"}]},
						{name:"maintenance","users":[{id:5, name:"sarah"}, {id:6, name:"jimmy"}]},
						{name:"concierge","users":[{id:7, name:"steve"}, {id:8, name:"yasmine"}, {id:9, name:"andy"}]},
						{name:"cleaning","users":[{id:10, name:"dale"}, {id:11, name:"tamara"}, {id:12, name:"tracey"},{id:13, name:"sally"}]}
		],
		
		selected = {},
		
		//lookup all users in a category
		categorytousers = {},
		
		//lookup the category that a user belongs to
		usertocategory  = {},
		
		chart = function(){
				
			var width 	= 100;
			var height  = 100;
			var x = 0;
			var y = 0;
			
			
			function my(){		
				 
				//var data = this.data()[0];
				
				//create the data matrix
				var maxusers =	d3.max(users.map(function(item){return item.users.length}));
  		
				var column = {};
				var row = {};
  			
  				//create the lookup
				users.forEach(function(item, i){
					
					selected[item.name] = [];
					categorytousers[item.name] = [];
					
					item.users.forEach(function (b, j){
						column[b.name] = i;
						row[b.name] = j;
						categorytousers[item.name].push(b.id);
						usertocategory[b.id] = item.name;
					});
				});
				
				
				var cwidth = width/users.length;
				
				var cheight = height/(maxusers+1);
				
				var selectboxheight = cwidth/8;
				
				var xscale = d3.scale.linear().range([x,width])
											  .domain([0,users.length]);
				
				var yscale = d3.scale.linear().range([cheight, height])	
											  .domain([0,maxusers]);
				
				var svg = this
				 				.append("svg")
				 				.attr("id", "notifywidget")
				 				.style("x", x + "px")
				 				.style("y", y + "px")
				 				.style("width",  (width+x) + "px")
				 				.style("height", (height+y) + "px")
				 						
				
				var categories = svg.selectAll("g.notifycategory")
  								.data(users, function(d){return d.name+users.length})
  								
  								
  				var category = categories.enter()
						  				 .append("g")
						  				 .attr("class", "notifycategory")
				
				category.append("rect")
					.attr("x", function(d,i){return xscale(i)})
					.attr("y", 0)
					.attr("width", cwidth)
					.attr("height", cheight)
					.style("fill", "#006f9b")
					.style("opacity",function(d,i){return i % 2 == 0 ? 1.0: 0.5})
					
				category.append("rect")
				  	.attr("class", function(d){ return "optionsbox optionscat optionsbox_" + d.name + " optionscat_" + d.name })
					.attr("x", function(d,i){return xscale(i) + (cheight-selectboxheight)/2})
					.attr("y", function(d){return (cheight-selectboxheight)/2})
					.attr("width", selectboxheight)
					.attr("height", selectboxheight)
					.style("fill","white")
					.style("stroke-width","4px")
					.style("stroke","white")
					.on("click", _select_all)
				
				category.append("text")
				  	.attr("class", "categorytext")
				  	.attr("dy", ".2em")
				  	.attr("text-anchor", "middle")
					.attr("x", function(d,i){return xscale(i) + selectboxheight + (cwidth-selectboxheight)/2})
					.attr("y", function(d){return cheight/2})
					.style("fill","white")
					.style("font-size", (cheight * 0.3) + "px")
					.style("font-weight", "bold")
					.text(function(d){return d.name})
					.call(util.autofit, cwidth-(selectboxheight*3), "categorytext")
					.on("click", _select_all)
					
					
				
				var user =  d3.selectAll("g.notifycategory")
							.selectAll("g.user")
							 .data(function(d){return d.users})
							 .enter()
							 .append("g")
							 .attr("class", "user");
			
				user.append("rect")
				  	.attr("class", "user")
					.attr("x", function(d,i,j){return xscale(column[d.name])})
					.attr("y", function(d,i,j){return yscale(row[d.name])})
					.attr("width", cwidth)
					.attr("height", cheight)
					.style("fill",function(d){return column[d.name] % 2 == 0 ? "#999999": "#c8c2ae"})
					.style("opacity",function(d){return row[d.name] % 2 == 0 ? 1.0: 0.5})
					.on("click", _select)
					//.on("click", function(d){console.log("pressed!!")})
				
				user.append("rect")
				  	.attr("class", function(d){return "optionsbox optionsbox_" + d.id + " optionsbox_" + usertocategory[d.id]})
					.attr("x", function(d){return xscale(column[d.name]) + (cheight-selectboxheight)/2})
					.attr("y", function(d){return yscale(row[d.name]) + (cheight-selectboxheight)/2})
					.attr("width", selectboxheight)
					.attr("height", selectboxheight)
					.style("fill","white")
					.style("stroke-width","4px")
					.style("stroke","white")
					.on("click", _select)
					//.on("click", function(d){console.log("pressed!!")})
				
				user.append("text")
				  	.attr("class", "usertext")
				  	.attr("dy", ".2em")
				  	.attr("text-anchor", "middle")
					.attr("x", function(d,i){return xscale(column[d.name]) + selectboxheight + (cwidth-selectboxheight)/2})
					
					.attr("y", function(d){return  yscale(row[d.name]) + cheight/2})
					.style("fill","white")
					.style("font-size", (cheight * 0.3) + "px")
					
					.text(function(d){return d.name})
					.call(util.autofit, (cwidth -(selectboxheight*2)), "usertext")
					.on("click", _select)
					
					//.on("click", function(d){console.log("pressed!!")})	
			};
			
			//private functions
			
			var _select_all = function(d){
				
				//if they're not already all selected
				if (selected[d.name].length != categorytousers[d.name].length){
					selected[d.name] = [];
					categorytousers[d.name].forEach(function(id){
						selected[d.name].push(id);
					});
					d3.selectAll("rect.optionsbox_" + d.name).style("fill", "#f47961")
				} 
				else{ //all selected, so remove
					selected[d.name] = [];
					d3.selectAll("rect.optionsbox_" + d.name).style("fill", "white")
				}
				
			};
		
			var _select = function(d){
				var cat = usertocategory[d.id];
				var idx = selected[cat].indexOf(d.id);
				if (idx == -1){
					selected[cat].push(d.id);
					if (selected[cat].length == categorytousers[cat].length){
						d3.selectAll("rect.optionsbox_" + cat).style("fill", "#f47961");
					}else{
						d3.selectAll("rect.optionsbox_" + d.id).style("fill", "#f47961");
					}
				}else{
					selected[cat].splice(idx,1);
					if (selected[cat].length == 0){
						d3.selectAll("rect.optionsbox_" + cat).style("fill", "white");
					}
					else{
						d3.selectAll("rect.optionscat_" + cat).style("fill", "white");
						d3.selectAll("rect.optionsbox_" + d.id).style("fill", "white");
					}
				}
			};
			
			//public functions	
			
			my.update = function(dim){
				
			};
					
			my.width = function(value){
				if (!arguments.length)
					return width;
				width = value;	
				return my;
			};
			
			my.height = function(value){
				if (!arguments.length)
					return height;
				height = value;	
				return my;
			};
			
			my.x = function(value){
				if (!arguments.length)
					return x;
				x = value;	
				return my;
			};
			
			my.y = function(value){
				if (!arguments.length)
					return y;
				y = value;	
				return my;
			};
			
			return my;
		}
		
	return{
		chart:chart
	}
		

});