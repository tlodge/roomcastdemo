require.config({
    baseUrl: 'js/my',

    paths: {
        "jquery": "../jquery/jquery-2.1.0.min",
		"d3": "../d3/d3",
	 	"radio": "../radio/radio.min",	
	 	"moment": "../moment/moment.min",
	 	"ramda": "../ramda/ramda.min",
	 	"socketio":"../socketio/socket.io",
	 	"react":"../react/react",
	 	"bootstrap":"../../bootstrap/js/bootstrap.min"
    },
    
	//"pubnub": "//cdn.pubnub.com/pubnub.min"
    
    "shim": {
    }
});

require(['jquery', 'panel'], function($, panel) {
	
	$(document).bind(
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
		
	String.prototype.trunc =
     function(n,useWordBoundary){
         var toLong = this.length>n,
             s_ = toLong ? this.substr(0,n-1) : this;
         s_ = useWordBoundary && toLong ? s_.substr(0,s_.lastIndexOf(' ')) : s_;
         return  toLong ? s_ + '...' : s_;
      };
	

	panel.init();
			
});
