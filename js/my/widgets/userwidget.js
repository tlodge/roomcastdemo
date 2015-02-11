define(['jquery','d3', 'util'], function($,d3,util){

	"use strict"
	
	var 
	
		users = [
						{id:1, name:"everyone", "users":[{id:"1_1", name:"everyone"}]},
						{id:2, name:"all residents","users":[{id:"2_1", name:"leaseholders"}, {id:"2_2", name:"tenants"}]},
						{is:3, name:"whole development","users":[{id:"3_1", name:"block one"}, {id:"3_2", name:"block two"}, {id:"3_3", name:"block3"}]},
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
					
					selected[item.id] = [];
					categorytousers[item.id] = [];
					
					item.users.forEach(function (b, j){
						column[b.name] = i;
						row[b.name] = j;
						categorytousers[item.id].push(b.id);
						usertocategory[b.id] = item.id;
					});
				});
				
				
				var cwidth = width/users.length;
				
				var cheight = height/maxusers;
				
				var selectboxheight = cwidth/8;
				
				var xscale = d3.scale.linear().range([x,width])
											  .domain([0,users.length]);
				
				var yscale = d3.scale.linear().range([y, height])	
											  .domain([0,maxusers]);
				
				var svg = this
				 				.append("svg")
				 				.attr("id", "userwidget")
				 				.style("x", x + "px")
				 				.style("y", y + "px")
				 				.style("width",  (width+x) + "px")
				 				.style("height", (height+y) + "px")
				 						
				
				var categories = svg.selectAll("g.myusercategory")
  								.data(users, function(d){return d.name+users.length})
  								
  								
  				var category = categories.enter()
						  				 .append("g")
						  				 .attr("class", "myusercategory")
				
				
				var user =  d3.selectAll("g.myusercategory")
							.selectAll("g.user")
							 .data(function(d){return d.users})
							 .enter()
							 .append("g")
							 .attr("class", "user");
			
				user.append("rect")
				  	.attr("class", "resident")
					.attr("x", function(d,i,j){return xscale(column[d.name])})
					.attr("y", function(d,i,j){return yscale(row[d.name])})
					.attr("width", cwidth)
					.attr("height", cheight)
					.style("fill",function(d){return column[d.name] % 2 == 0 ? "#333333": "#999999"})
					.style("opacity",function(d){return row[d.name] % 2 == 0 ? 1.0: 0.5})
					.call( d3.behavior.drag().on("dragstart", function(d){
						util.handledrag(d, function(d){	
							_select(d);
						});
					}));
	
				
				user.append("rect")
				  	.attr("class", function(d){return "useroptionsbox useroptionsbox_" + d.id + " useroptionsbox_" + usertocategory[d.id]})
					.attr("x", function(d){return xscale(column[d.name]) + (cheight-selectboxheight)/2})
					.attr("y", function(d){return yscale(row[d.name]) + (cheight-selectboxheight)/2})
					.attr("width", selectboxheight)
					.attr("height", selectboxheight)
					.style("fill","white")
					.style("stroke-width","4px")
					.style("stroke","white")
					.call( d3.behavior.drag().on("dragstart", function(d){
						util.handledrag(d, function(d){	
							_select(d);
						});
					}));
					
				
				user.append("text")
				  	.attr("class", "residenttext")
				  	.attr("dy", ".2em")
				  	.attr("text-anchor", "middle")
					.attr("x", function(d,i){return xscale(column[d.name]) + selectboxheight + (cwidth-selectboxheight)/2})
					
					.attr("y", function(d){return  yscale(row[d.name]) + cheight/2})
					.style("fill","white")
					.style("font-size", (cheight * 0.3) + "px")
					
					.text(function(d){return d.name})
					.call(util.autofit, cwidth-(selectboxheight*3), "residenttext")
					.call( d3.behavior.drag().on("dragstart", function(d){
						util.handledrag(d, function(d){	
							_select(d);
						});
					}));
					
					
			};
			
			//private functions
			
			var _select_all = function(){
				
				
				if (d3.event.defaultPrevented){
					return;
				}
				if (d3.event != null){
					d3.event.sourceEvent.stopPropagation();
					d3.event.sourceEvent.preventDefault();
				}
			
				var d = d3.select(this).data()[0];
			
				//if they're not already all selected
				if (selected[d.id].length != categorytousers[d.name].length){
					selected[d.id] = [];
					categorytousers[d.id].forEach(function(id){
						selected[d.id].push(id);
					});
					d3.selectAll("rect.useroptionsbox_" + d.id).style("fill", "#f47961")
				} 
				else{ //all selected, so remove
					selected[d.name] = [];
					d3.selectAll("rect.useroptionsbox_" + d.id).style("fill", "white")
				}
				
			};
		
			var _select = function(d){
				console.log("seen select");
				console.log(d);
				
				var cat = usertocategory[d.id];
				console.log(cat);
				
				var idx = selected[cat].indexOf(d.id);
				console.log("index is " + idx);
				
				if (idx == -1){
					selected[cat].push(d.id);
					if (selected[cat].length == categorytousers[cat].length){
						d3.selectAll("rect.useroptionsbox_" + cat).style("fill", "#f47961");
					}else{
						d3.selectAll("rect.useroptionsbox_" + d.id).style("fill", "#f47961");
					}
				}else{
					console.log("deselecting!!");
					
					selected[cat].splice(idx,1);
					if (selected[cat].length == 0){
						d3.selectAll("rect.useroptionsbox_" + cat).style("fill", "white");
					}
					else{
						d3.selectAll("rect.useroptionscat_" + cat).style("fill", "white");
						d3.selectAll("rect.useroptionsbox_" + d.id).style("fill", "white");
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