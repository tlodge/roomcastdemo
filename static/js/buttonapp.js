require.config({
    baseUrl: 'js/my',

    paths: {
        "jquery": "../jquery/jquery-2.1.0.min",
		"d3": "../d3/d3",
	 	"radio": "../radio/radio.min",	
	 	"moment": "../moment/moment.min",
	 	"ramda": "../ramda/ramda.min",
	 	"socketio":"../socketio/socket.io"
    },
    
	//"pubnub": "//cdn.pubnub.com/pubnub.min"
    
    "shim": {
    }
});

require(['jquery', 'buttons', 'dimensions'], function($, buttons,  Dimensions) {
	
	console.log("ok logging is ---->-->s working!");
	
	/*$(document).bind(
		'touchmove',
			function(e){
				e.preventDefault();
			}
	);

	$(document).ready(function(){
		document.ontouchmove = function(e){
			e.preventDefault();
		}
	});
	*/	
	String.prototype.trunc =
     function(n,useWordBoundary){
         var toLong = this.length>n,
             s_ = toLong ? this.substr(0,n-1) : this;
         s_ = useWordBoundary && toLong ? s_.substr(0,s_.lastIndexOf(' ')) : s_;
         return  toLong ? s_ + '...' : s_;
      };
	

	console.log("ok window height is:");
	console.log($(window).height());
	
	console.log("ok window width is");
	console.log($(window).width());
	
	buttons.init(
		new Dimensions({
			
			anchor:{
				x: function(){return 0}, 
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
		})
	);
			
});
