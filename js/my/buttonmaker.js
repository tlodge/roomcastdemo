define(['jquery','d3', 'radio', 'util', 'widgets/groupwidget', 'widgets/namewidget', 'widgets/notifywidget'], function($,d3, radio, util, groupwidget, namewidget,notifywidget){

	"use strict"
	
	var 
		root,
		
		dim,
		
		buttonwidth = function(){
		 return dim.width()/18;
		},
		
		
		steps = [
			{number: 0, name:"name", title:"What is the <strong>name</strong> of your new button?", subtitle:"this is the button's label so try to make it short and snappy", widget:namewidget.chart},
			{number: 1, name:"group", title:"What <strong>group</strong> will it belong to?", subtitle:"add it to a group, or create a new one", widget:groupwidget.chart},
			{number: 2, name:"description", title:"<strong>Why</strong> should be pressed?", subtitle:"tell the users why they might need this button", widget:groupwidget.chart},
			{number: 3, name:"notify",title:"Who should be <strong> notified</strong> when it's pressed?", subtitle:"",widget:notifywidget.chart},
			{number: 4,	name:"context",title:"<strong>What else</strong> do you need to know", subtitle:"get more context when the button is pressed",widget:groupwidget.chart},
			{number: 5, name:"users",title:"<strong>Who</strong> will get this button?",subtitle:"", widget:groupwidget.chart},
			{number: 6, name:"summary",title:"A <strong>summary</strong>",subtitle:"",widget:groupwidget.chart}
		],
		
		currentstep = 0,
		
		
		update = function(){
			render();
		},
		
		render= function(){
			//update size of root
			
			d3.select("div#buttonmaker")
			  .style("width", (dim.width() + dim.margin().left + dim.margin().right) + "px")
			  .style("height",(dim.height() + dim.margin().top + dim.margin().bottom) + "px")

			renderbuttons();
			renderstep();
			rendermenu();
			
			//renderstep();
		},
		
		navigatebuttons  = ["back","next"],
		 
		renderstep = function(){
		
			var backtitleheight =  dim.height()/4;
			var data;
			
			if (currentstep == 0){
				data = steps.slice(0,2);
			}
			else if (currentstep >= steps.length-1){
				data = steps.slice(-2,steps.length);
			}else{
				data = steps.slice(currentstep-1, currentstep+2);
			}
		
			var titley 	  = dim.headerpadding();
			
			var subtitley =   titley + backtitleheight/4;
			 
			var ty = function(d){
				var i = data.indexOf(d);
				if (currentstep == 0)
					return i * dim.height();
				
				return i * dim.height() - dim.height();
			} 
			
			
			var content = root.selectAll("div.buttoncreatecontent")
							.data(data, function(d){return d.number})
							
			//update
			d3.selectAll("div.buttoncreatecontent")
					.transition()
					.duration(1000)
					.style("top", function(d){
						return ty(d) + "px";
					});
					
			content.select("div.createtitleback")
				   .style("top", dim.headerpadding() + "px")
				   .style("width", dim.width() + "px")
				   .style("height", backtitleheight + "px")
			
			content.select("div.createback")
			 	   .style("top", (dim.headerpadding() + backtitleheight) + "px")
				   .style("width", dim.width()+"px")
				   .style("height", (dim.height() - dim.headerpadding() - backtitleheight) + "px")
			
			content.select("div.steptitle")
					.style("width", dim.width() + "px")
					.style("top", titley + "px")
		
			content.select("div.stepsubtitle")
					.style("width", dim.width() + "px")
					.style("top", subtitley + "px")
			
			content.selectAll("div.createback")
					.each(function(d){
						d.widget()
						.width(dim.width())
						.height(dim.height() - dim.headerpadding() - backtitleheight - buttonwidth())
						.update();
			});
				   
			//enter			
			var container =	content
							.enter()
					   		.append("div")
					   		.attr("class", "buttoncreatecontent")
					   		.attr("z-index", -1)
							.style("top", function(d){
						  		return ty(d) + "px";
						 	})
			
			var titlecontainer = container.append("div")
										   .attr("class", "createtitleback")
											.style("position", "absolute")
										   .style("left", "0px")
										   .style("top", (dim.headerpadding()) + "px")
										   .style("width", dim.width() + "px")
										   .style("height", backtitleheight + "px")
										   .style("background","#c8c2ae")
										   .style("text-align", "center")
										   .style("padding-top", dim.headerpadding()/2 + "px");
			
		
			titlecontainer.append("h1")
					.html(function(d){return d.title})
			
			titlecontainer.append("h2")
					.attr("class", "subtitle")
					.style("font-size", "110%")
					.style("color", "#666666")
					.html(function(d){return d.subtitle})							   
			
			
			var contentcontainer = container.append("div")
				   .attr("class", "createback")
				   .style("left", "0px")
				   .style("top", (dim.headerpadding() + backtitleheight) + "px")
				   .style("width", dim.width() + "px")
				   .style("height", (dim.height() - dim.headerpadding() - backtitleheight) + "px")
				   .style("background","#696969")	   				
		
			contentcontainer
				.each(function(d){
					
					d3.select(this)
						.datum(["one", "two"])
						.call(d.widget()
							.x(0)
							.y(0)
							.width(dim.width())
							.height(dim.height() - dim.headerpadding() - backtitleheight - buttonwidth())
						);
				
				});
		
			
			
					
			content.exit().remove();
		
		},
		
		changestep = function(){
			if (d3.event.defaultPrevented){
					return;
			}
			if (d3.event != null){
				d3.event.sourceEvent.stopPropagation();
				d3.event.sourceEvent.preventDefault();
			}
			
			var d = d3.select(this).data()[0];
			if (d == "next"){
				if (currentstep < steps.length-1){
					currentstep += 1;
					render();
				} 
			}else if (d=="back"){
				if (currentstep > 0){
					currentstep -= 1;
					render();
				} 
			}
		},
		
		renderbuttons = function(){
			 
			
			 
			 var navb = root.select("div.navbuttons")
			 	  			.selectAll("div.navbutton")
			 	 			.data(navigatebuttons)
			 	 
			 	 
			 //update
			 root.selectAll("div.navbutton")
			 	 .style("left", (dim.width()-buttonwidth()) + "px")
			 	 .style("top", function(d){
			 	 		 return d=="back" ? dim.headerpadding() + "px" : (dim.height()-buttonwidth()) + "px";
			 	 })
			 	 .style("width",buttonwidth() + "px")
			 	 .style("height",buttonwidth() + "px")
			 
					 
			 //enter
			 navb.enter()
			 	 	.append("div")
			 	 	.attr("class", "navbutton")
			 	 	.style("position", "absolute")
			 	 	.style("z-index", 999999)
			 	 	.style("left", (dim.width()-buttonwidth()) + "px")
			 	 	.style("top", function(d){
			 	 		 return d=="back" ? dim.headerpadding() + "px" : (dim.height()-buttonwidth()) + "px";
			 	 	})
			 	 	.style("width",buttonwidth()+"px")
			 	 	.style("height",buttonwidth()+"px")
			 	 	.style("background", "#f47961")
			 		//.on("click",changestep);
					.call( d3.behavior.drag().on("dragstart", changestep))
			 navb.exit()
			 	 	.remove();
		},
		
		rendermenu = function(){
			
			var menuitemwidth 	= dim.width()/steps.length;
			var menuitemheight 	= dim.headerpadding();
			
			//update
			var menucontainer = root.select("div.buttoncreatemenu")
								   .selectAll("div.menuitem")
						 		   .data(steps);
			
		  	menucontainer
						 .style("left", function(d){ return (d.number * menuitemwidth) + "px"})
						 .style("top", "0px")
						 .style("width", menuitemwidth + "px")
						 .style("height", menuitemheight + "px")
		 				 .style("background", function(d){return currentstep==d.number? "#006f9b":"black"})
						 
			//enter			
			var item = menucontainer
						 .enter()
						 .append("div")
						 .attr("class", "menuitem")
						 
						 
			var box = item
						 .style("left", function(d){ return (d.number * menuitemwidth) + "px"})
						 .style("top", "0px")
						 .style("width", menuitemwidth + "px")
						 .style("height", menuitemheight + "px")
						 .style("z-index", 999999)
						 .style("background", function(d){return currentstep==d.number? "#006f9b":"black"})
				
				box
						.append("div")
						 .style("color", "white")
						 .style("text-align", "center")
						 .style("width", "inherit")
						 .style("max-height", menuitemheight+"px")
						 .style("padding-top", (menuitemheight/4)+"px")
						.text(function(d){return d.name})	
		},
		
		
		init = function(d){
		
			dim = d;
			
			root  = d3.select("#buttonmaker")
					 .style("width", (dim.width() + dim.margin().left + dim.margin().right) + "px")
					 .style("height",(dim.height() + dim.margin().top + dim.margin().bottom) + "px")
					 .style("top", dim.y() + "px")
					 .style("left", dim.x() + "px")
					 .append("div")
					 .attr("id", "buttonmakermain")
					// .style("transform", "translate(" + dim.margin().left + "px," + dim.margin().top + "px)")
		
			
			//static once-off containers:
					
			root.append("div").attr("class", "buttoncreatemenu")
			root.append("div").attr("class", "navbuttons")
			//root.append("g").attr("class", "stepcontent")
			
			render();
			
			   
			//d3.select(window).on('resize', update);
			
		
		}
		
		return {
			init: init,
			update: update,
		}

});