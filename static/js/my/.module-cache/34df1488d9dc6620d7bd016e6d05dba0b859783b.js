define(['jquery','react'], function($, React){

	"use strict";
	
	var MakerBox = React.createClass({displayName: "MakerBox",
		
		
		getInitialState: function(){
			return {data:[]};
		},
		componentDidMount: function(){
			
		},
		render: function(){
			return (
				React.createElement("h1", null, " Here we go! ")
			);
		}
	});

	var init = function(){
		React.render(
			React.createElement(MakerBox, null), document.getElementById('maker')
		);
	}
	
	return{
		init: init
	}
});