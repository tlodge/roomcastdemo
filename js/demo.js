require.config({
    baseUrl: 'js/my',

    paths: {
        "jquery": "../jquery/jquery-2.1.0.min",
		"d3": "../d3/d3",
	 	"radio": "../radio/radio.min",	
	 	"moment": "../moment/moment.min",
    },
    
	//"pubnub": "//cdn.pubnub.com/pubnub.min"
    
    "shim": {
    }
});

require(['jquery', 'buttons', 'buttonmaker', 'stats', 'dashboard', 'navigator', 'dimensions', 'd3'], function($, buttons, buttonmaker, stats, dashboard, nav, Dimensions, d3) {
	
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
	
	
	
	var navbarheight = 75;
	
	buttons.init(
		new Dimensions({
			
			anchor:{
				x: function(){return 0}, 
				y: function(){return 0},
			},
			
			height: function(){ return $(window).height()},
			
			width: function(){ return $(window).width()},
			
			margins:{
				top: function(){return 20},
				right: function(){return 0},
				bottom: function(){return 0},
				left: function(){return 0}
			}
		})
	);
	
	buttonmaker.init(
		new Dimensions({
			
			anchor:{
				x: function(){return $(window).width()}, 
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
	
	dashboard.init(
		new Dimensions({
			
			anchor:{
				x: function(){return $(window).width()*2}, 
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
	
	stats.init(
		new Dimensions({
			
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
		})
	);
	
	
	nav.init(
		new Dimensions({
			
			anchor:{
				x: function(){return 0}, 
				y: function(){return $(window).height()-navbarheight},
			},
			
			height: function(){ return navbarheight},
			
			width: function(){ return $(window).width()},
			
			margins:{
				top: function(){return 0},
				right: function(){return 0},
				bottom: function(){return 0},
				left: function(){return 0}
			}
		}), []
	);
	
	d3.select(window).on('resize', function(){
		console.log("seen a resize!");
		buttons.update();
		buttonmaker.update();
		nav.update();
	});
			
	
	/*cpanel.init(
		new Dimensions({
			
			anchor:{
						x: function(){
							return  $(window).width()/2;
						}, 
						y: function(){
							return 0;
						}
			},
			
			height: function(){ return $(window).height()/2},
			
			width: function(){ return $(window).width()/2},
			
			margins:{
				top: function(){return 10},
				right: function(){return 10},
				bottom: function(){return 10},
				left: function(){return 10}
			}
	}));*/
			
});
