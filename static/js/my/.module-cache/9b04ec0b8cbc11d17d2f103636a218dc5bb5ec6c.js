define(['jquery', 'react'], function($, React){

	var 
	
		touchmixin ={
	
			touched: false,
	
			handleTouch: function(fn){
			
				//stop touches from hitting other components below this one
				e.nativeEvent.preventDefault();
				e.nativeEvent.stopPropagation();
				this.touched=true;
				
				typeof fn === 'string' ? this[fn]() : this.event(fn);
				
			}, 
			handleClick:function(fn){
				
				if (this.touched){
				 	return this.touched = false;
				}
				typeof fn === 'string' ? this[fn]() : this.event(fn);
			
			}	
		}
	 
	return{
		touchmixin: touchmixin,
	}

});