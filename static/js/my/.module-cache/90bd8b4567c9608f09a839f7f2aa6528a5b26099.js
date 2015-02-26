define(['jquery', 'react'], function($, React){

	var 
	
		touchmixin ={
	
			touched: false,
			clicked: false,
			
			handleTouch: function(fn){
				this.touched=true;
				if (this.clicked)
					return;
				this.clicked = false;
				typeof fn === 'string' ? this[fn]() : this.event(fn);
			}, 
			
			handleClick:function(fn){
				this.clicked = true;
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