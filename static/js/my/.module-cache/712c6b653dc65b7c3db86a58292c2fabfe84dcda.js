define(['jquery', 'react'], function($, React){

	var 
	
		touchmixin ={
	
			touched: false,
	
			handleTouch: function(fn){
				this.touched=true;
				console.log("seen at tocuh---<");
				if (typeof fn === 'function'){
				 	fn();
				}else{
					typeof fn === 'string' ? this[fn]() : this.event(fn);
				}
			}, 
			handleClick:function(fn){
				
				if (this.touched){
					console.log("forgetting click!!");
				 	return 
				}
				console.log("seen click!");
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