define(['jquery', 'react'], function($, React){

	var 
	
		touchmixin ={
	
			touched: false,
	
			handleTouch: function(fn){
				console.log("seen a tocuh");
				this.touched=true;
				
				if (typeof fn === 'function'){
				 	fn();
				}else{
					typeof fn === 'string' ? this[fn]() : this.event(fn);
				}
			}, 
			handleClick:function(fn){
			
				if (this.touched){
				 	return this.touched = false;
				}
				console.log("seen a click!");
				
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