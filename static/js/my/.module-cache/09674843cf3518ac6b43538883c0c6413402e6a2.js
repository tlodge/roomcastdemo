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
				console.log(typeof fn);
				if (this.touched){
				 	return 
				}
				
				this.touched = false;
				typeof fn === 'string' ? this[fn]() : this.event(fn);
			}	
		}
	 
	return{
		touchmixin: touchmixin,
	}

});