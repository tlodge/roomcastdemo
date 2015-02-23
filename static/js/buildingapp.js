require.config({
    baseUrl: 'js/my',

    paths: {
        "jquery": "../jquery/jquery-2.1.0.min",
		"d3": "../d3/d3",
	 	"pusher": "../pusher/pusher.min",
	 	"pubnub": "../pubnub/pubnub.min", 
	 	"ramda": "../ramda/ramda.min",
	 	"numeric": "../numeric/numeric-solve",
	 	"socketio":"../socketio/socket.io"	
    },
    
	//"pubnub": "//cdn.pubnub.com/pubnub.min"
    
    "shim": {
    }
});

require(['jquery','d3building', 'model', 'uidelegate', 'dimensions'], function($,building, model, ui, Dimensions) {
	
	$(document).bind(
		'touchmove',
			function(e){
				e.preventDefault();
			}
	);
	
	//perspective.init();
	
	//model stuff
	model.init();
	
	//view stuff
	ui.init(model);
 	
 	building.init(new Dimensions({
			
			anchor:{
				x: function(){return $(window).width()*3}, 
				y: function(){return 0},
			},
			
			height: function(){ return $(window).height()},
			
			width: function(){ return $(window).width()},
			
			margins:{
				top: function(){return 0},
				right: function(){return 0},
				bottom: function(){return 0},
				left: function(){return 0}
			}
	}));
	
	building.setdelegate(ui);
  	
});
