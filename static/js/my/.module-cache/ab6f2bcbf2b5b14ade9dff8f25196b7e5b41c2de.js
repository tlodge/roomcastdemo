define(['jquery', 'react'], function($, React){

	var 
	
		touchmixin ={
	
			touched: false,
	
			handleTouch: function(fn){
				this.touched=true;
				console.log(typeof fn);
				typeof fn === 'string' ? this[fn]() : this.event(fn);
			}, 
			handleClick:function(fn){
				
				if (this.touched){
				 	return 
				}
				
				this.touched = false;
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