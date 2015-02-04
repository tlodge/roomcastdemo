define(['jquery','d3', 'dimensions', 'radio'], function($,d3, Dimensions, radio){

	var 
	
	
		svg,
		
		buttonindex = 0;
		
		buttons = [
		
		
		{
			category:"concierge",
			name:"parking",
			options:[
						{
							name:"when",
							question:"roughly when would you like the key to be released?",
							components:[
									{name:"rows", id:"rows", type:"slider", min:1, max:20, value:8, callback:function(value){
										console.log(value);
									}},
								
									{name:"cols", id:"cols",type:"slider", min:1, max:20, value:8, callback:function(value){
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
		
		init = function(d){
			
			dim = d;
			
			svg = d3.select("#controlpanel")
					.append("svg")
					.attr("x", dim.x())
					.attr("y",dim.y())
					.attr("width", dim.width() + dim.margin().left + dim.margin().right)
					.attr("height",dim.height() + dim.margin().top + dim.margin().bottom)
					.attr("id", "controlpanel")
					.append("g")
					.attr("id", "maincontrol")
					.attr("transform", "translate(" + dim.margin().left + "," + dim.margin().top + ")");
				
			svg.append("rect")
				.attr("x", 0)
				.attr("y", 0)
				.attr("width",dim.width())
				.attr("height", dim.height())
				.attr("fill", "none")
				.attr("stroke", "black")
			
			svg.append("circle")
				.attr("cx", dim.width()/2)
				.attr("cy",dim.height()/2)
				.attr("r",Math.min(dim.width(), dim.height())/2  * 0.8)
				.attr("fill", "white")
				.attr("stroke", "black")
				.on("click", function(d){
					if (buttonindex < buttons.length){
						radio('newbutton').broadcast(buttons[buttonindex]);
					}
					buttonindex++;
				});	
		}
		
		
	return {
		init:init
	}

});