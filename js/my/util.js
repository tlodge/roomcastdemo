define(['jquery', 'd3'], function($, d3){

	"use strict";
	
	var 
	
		shuffle = function(o){
    		for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
   		  	return o;
		},
		
		generatepath = function(pobj){
	  		return pobj.path.map(function(x){
	  			
	  			var xpath = $.map(x['xcomp'], function(v,i){
	  				return [v, x['ycomp'][i]]
	  			});
	  		
	  			return x.type + " " + xpath.join();
	  		}).reduce(function(x,y){
	  			return x + " " + y;
	  		}) + " z";
	  	},
	  	
	  	rightroundedrect = function(x,y,w,h,r){
	  		 return "M" + x + "," + y
						+ "h " + (w - r) + " " 
						+ "a " + r + "," + r + " 0 0 1 " + r + "," + r + " "
						+ "v " + (h - 2 * r) + " "
						+ "a " + r + "," + r + " 0 0 1 " + -r + "," + r + " "
						+ "h " + (r - w)
						+ "z";
	  	},
	  	
	    leftroundedrect = function(x,y,w,h,r){
	  		 return "M" + x + "," + y
	  		 			+ " a " + r + " " + r + ", 1, 0, 0," + (-r) + " " + r
						+ "v " + (h - 2 * r) + " "
						+ " a " + r + " " + r + ", 1, 0, 0," + r + " " + r
						+ " h " + w
						+ " v " +  -(h) + " "
						+ "z";
	  	},
	  	
	  	toproundedrect = function(x,y,w,h,r){
	  		 return "M" + x + "," + y
	  		 			+ " a " + r + " " + r + ", 1, 0, 0," + (-r) + " " + r
						+ "v " + h + " "
						+ " h " + w
						+ "v " + (-h) + " "
						+ " a " + r + " " + r + ", 1, 0, 0," + -r + " " + (-r)
						+ "z";
	  	},
	  	
	  	
	  	optionsheading = function(params){
	  		var th = 10; 
	  		var tw = 10;
	  		var x0 = params.x;
	  		var y0 = params.y;
	  		var w = params.w;	
	  		var h = params.h;
  			
  			var path =  "M " + x0 + "," + y0 + " v " + h;												
	  		//path +=  " h " + ((w/10)-tw) + " l " + tw + " " + th + " l " + tw + " " + -th + " h " + ((w/10)-(tw)); 
	  		path +=  " h " + ((w/10)-tw) + " l " + tw + " " + th + " l " + tw + " " + -th + " h " + (w-tw-w/10); 
	  		
	  		path += " v " + (-h);
	  		path += " z";
	  		
	  		return path;
	  	},
	  	
  															
	  	categoryheading = function(w, h, points){
	  		var th = 10; 
	  		var tw = 10;
	  		//return "M 0,0 h " + (w*points)  + " v " + h + " h " + (-w*points) + " v " + (-h) + " z"; 
	  		var path =  "M 0,0 v " + h;
	  		
	  		for (var i = 0; i < points; i++){
	  			path += " h " + Math.round((w/2)-tw) + " l " + tw + " " + th + " l " + tw + " " + -th + " h " + Math.round((w/2)-(tw));  
	  		}
	  		
	  		path += " v " + (-h);
	  		path += " z";
	  		
	  		return path;
	  	},
	  	
	  	menuheading = function(params){
	  	
	  	
	  		var th = 10; 
	  		var tw = 10;
	  		
	  		var w = params.w;	
	  		var h = params.h;
  			
  			var path =  "M " + params.x + "," + params.y + " v " + params.h;												
	  		path +=  " h " + ((w/2)-tw) + " l " + tw + " " + th + " l " + tw + " " + -th + " h " + (w-tw-w/2); 
	  		
	  		path += " v " + (-h);
	  		path += " z";
	  		
	  		return path;
	  	},
	  	
	  	arrow = function(params){
	  		var ah = params.width / 3;
	  		var aw = params.width / 3;
	  		var x0 = params.x + (params.width-aw)/2;
	  		var y0 = params.up ? (params.y + (params.width -(params.width-aw)/2) - aw/4) : (params.y + (params.width-aw)/2 + aw/4);
	  		
	  		var x1 = aw/2
	  		var y1 = params.up ? -aw/2 : aw/2
	  		var x2 = aw/2
	  		var y2 = -y1
	  		
	  		var path = "M " + x0 + "," + y0 + " l " + x1 + " " + y1 + " l " + x2 + " " + y2;
	  		return path;
	  	},
	  	//({up:true, width:buttonwidth, x:dim.width()-buttonwidth, y: dim.headerpadding()}
	
		//scale and relative translate
		transformpath = function(pobj, transforms){
	  		
	  		pobj.width = 0;
	  		pobj.height = 0;
	  		
	  		
	  		//scale...
	  		pobj.path.forEach(function(path){
	  		
	  			path['xcomp'] = path['xcomp'].map(function(item){
	  				return item * transforms['scalex'];
	  			});	
	  			path['ycomp'] = path['ycomp'].map(function(item){
	  				return item * transforms['scaley'];
	  			});	
	  			
	  			
	  			pobj.width  = Math.max(pobj.width, path['xcomp'].reduce(function(x,y){return Math.max(x,y)}));
  				pobj.height = Math.max(pobj.height, path['ycomp'].reduce(function(x,y){return Math.max(x,y)}));
	  			
	  		});
	  		
	  		
	  		//translate
	  		pobj.path.forEach(function(path){
	  			
	  			path['xcomp'] = path['xcomp'].map(function(item){
	  				return item + transforms.transx;
	  			});	
	  			path['ycomp'] = path['ycomp'].map(function(item){
	  				return item + transforms.transy;
	  			});	
	  			
	  			pobj.width  = Math.max(pobj.width, path['xcomp'].reduce(function(x,y){return Math.max(x,y)}));
  				pobj.height = Math.max(pobj.height, path['ycomp'].reduce(function(x,y){return Math.max(x,y)}));
	  			
	  		});
	  		
	  		
	  		return pobj.path.map(function(x){
	  			
	  			var xpath = $.map(x['xcomp'], function(v,i){
	  				return [v, x['ycomp'][i]]
	  			});
	  		
	  			return x.type + " " + xpath.join();
	  		}).reduce(function(x,y){
	  			return x + " " + y;
	  		}) + " z";
	  	},
	  	
	  	handledrag = function(d, callback){
			if (d3.event != null){
				if (d3.event.defaultPrevented){
					return;
				}
				d3.event.sourceEvent.stopPropagation();
				d3.event.sourceEvent.preventDefault();
			}
	  		callback(d);
	  	},
	  	
	  	cssautofit = function(text, width) {
	  		
	  		//need to put text in span?? rather than in div box - that way text width is calculated on span!
	  		
	  		var guard = 0;
	  		
	  	 	text.each(function(){
	  	 	
	  	 		var text = d3.select(this);
	  	 		
	  	 		while($(text.node()).width() > width * 0.9 && guard++ < 100){
	  	 			
	  	 			var fontsize = Math.floor(text.style("font-size").replace("px",'')) - 2;
	  	 		
	  	 			text.style("font-size", fontsize + "px");
	  	 		}
	  	 	}) 	
	  	},
	  	
	  	
	  	autofit = function(text, width, id) {
	  		
	  		
	  		if (width <= 0)
	  			return;
	  			
	  		
	  		
	  	 	text.each(function(){
	  	 		var text = d3.select(this);
	  	 		var fontsize = Math.floor(text.style("font-size").replace("px",''));
	  	 		
	  	 		while(text.node().getComputedTextLength() > (width*0.9)){
	  	 		
	  	 			fontsize = Math.floor(text.style("font-size").replace("px",'')) - 2;
	  	 			text.style("font-size", fontsize + "px");
	  	 		
	  	 		}	
	  	 	})
	  	},
	  	
	  	unify = function(text,id){
	  		var minsize = 999999;
	  		
	  		d3.selectAll("text." + id)
	  		  .each(function(d){
	  			 var element = d3.select(this);
	  	 		 var fs = Math.floor(element.style("font-size").replace("px",''));		
	  		   	 minsize = Math.min(minsize, fs);
	  		   });
	  	 
	  	 	d3.selectAll("text." + id)
	  		  .style("font-size", minsize + "px"); 
	  	 	
	  	},
	  	
	  	wrap = function(text, width) {
	    
	    
		  text.each(function() {
			var text = d3.select(this),
				words = text.text().split(/\s+/).reverse(),
				word,
				line = [],
				lineNumber = 0,
				lineHeight = 1.1, // ems
				y = text.attr("y"),
				x = text.attr("x"),
				dy = parseFloat(text.attr("dy")),
				tspan = text.text(null).append("tspan").attr("x", x).attr("y", y).attr("dy", dy + "em");
			while (word = words.pop()) {
			  line.push(word);
			  tspan.text(line.join(" "));
			  if (tspan.node().getComputedTextLength() > width) {
				line.pop();
				tspan.text(line.join(" "));
				line = [word];
				tspan = text.append("tspan").attr("x", x).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
			  }
			}
			
			//adjust y if multiple lines
			/*if (lineNumber > 0){
				var adjust = parseFloat(text.style("font-size"))/1.5;
				text.selectAll("tspan")
					.attr("y", function(d){return d3.select(this).attr("y")-(lineNumber*adjust)});
			}*/
		  });
		},
	  	boldstyler = function(text){
			text.each(function() {
		
			var text = d3.select(this),
				words = text.text().split(/\s+/),
				boldword  = words.shift(),
				remainder = (" " +  words.join(" ")),
				tspan = text.text(boldword)
								.style("font-weight", "bold")
								.append("tspan")
								.text(remainder)
								.style("font-weight", "normal")
								.style("fill", "#4d4d4d")
			})
		}
	  	
	return {
		generatepath: generatepath,
		transformpath:transformpath,
		rightroundedrect:rightroundedrect,
		leftroundedrect:leftroundedrect,
		toproundedrect:toproundedrect,
		categoryheading:categoryheading,
		optionsheading:optionsheading,
		menuheading:menuheading,
		arrow: arrow,
		shuffle:shuffle,
		autofit:autofit,
		boldstyler:boldstyler,
		handledrag:handledrag,
		cssautofit:cssautofit,
		unify:unify,
		wrap:wrap,
		
	}
});