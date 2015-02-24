require.config({
    baseUrl: 'js/my',

    paths: {
        "jquery": "../jquery/jquery-2.1.0.min",
		"d3": "../d3/d3",
	 	"radio": "../radio/radio.min",	
	 	"moment": "../moment/moment.min",
	 	"ramda": "../ramda/ramda.min",
	 	"react": "../react/react"
    },
      
    "shim": {
    }
});

require(['jquery', 'maker'], function($,maker) {
	
	$(document).bind(
		'touchmove',
			function(e){
				e.preventDefault();
			}
	);
	
	maker.init();

});
