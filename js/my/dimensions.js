define(['jquery', 'd3'], function($, d3){
	
	"use strict";
	
	function Dimensions(options){
		this.xf 			= options.anchor.x;
		this.yf 			= options.anchor.y;
		this.margins 		= options.margins;
		
		//width and height functions
		this.wf 			= options.width;
		this.hf 			= options.height;
	}
  	
	Dimensions.prototype.margin = function(){
		
		return {
			top:this.margins.top(),
			right:this.margins.right(),
			bottom:this.margins.bottom(),
			left:this.margins.left(),
		};
	}
	
	Dimensions.prototype.x = function(){	
		return this.xf();
	}
	
	Dimensions.prototype.y = function(){	
		return this.yf();
	}
	
	Dimensions.prototype.height = function(){	
		return this.hf() - this.margins.top() - this.margins.bottom();
	}
	
	Dimensions.prototype.width = function(){
		return this.wf() - this.margins.left() - this.margins.right();
	}
	
	Dimensions.prototype.padding = function(){
			return this.height()/30;
	}
		
	Dimensions.prototype.headerpadding = function(){
			return this.padding()*2;
	}
		
	return Dimensions;
});