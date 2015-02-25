define(['jquery', 'react'], function($, React){

	var 
	
		touchmixin ={
	
			touched: false,
	
			handleTouch: function(fn){
				this.touched=true;
				typeof fn === 'string' ? this[fn]() : this.event(fn);
			}, 
			handleClick:function(fn){
				if (this.touched){
				 	console.log("am tocuhed so returning");
				 	return 
				}
				console.log("hmmmm seeen a click!");
				this.touched = false;
				typeof fn === 'string' ? this[fn]() : this.event(fn);
			}	
		}
	 
	return{
		touchmixin: touchmixin,
	}

});