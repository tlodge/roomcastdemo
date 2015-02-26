define(['jquery', 'react'], function($, React){

	var 
	
		touchmixin ={
	
			touched: false,
	
			handleTouch: function(fn){
				
				this.touched=true;
				
				if (typeof fn === 'function'){
				 	fn();
				}else{
					typeof fn === 'string' ? this[fn]() : this.event(fn);
				}
			}, 
			handleClick:function(fn){
				console.log("seen a click");
				if (this.touched){
					console.log("tocuhed is true, so retruning!");
				 	return this.touched = false;
				}
				
				console.log("set touched to false");
				
				if (typeof fn === 'function'){
				 	fn();
				}else{
					typeof fn === 'string' ? this[fn]() : this.event(fn);
				}
			}	
		}
	 
	return{
		touchmixin: touchmixin,
	}

});