define(['jquery','react'], function($, React){

	"use strict";
	
	var MakerBox = React.createClass({displayName: "MakerBox",
		
		
		getInitialState: function(){
			return {data:[]};
		},
		componentDidMount: function(){
			
		},
		make: function(){
			console.log("would make!!");
		},
		render: function(){
			return (
				React.createElement("div", {className: "content"}, 
				React.createElement("button", {className: "btn btn-primary", onClick: make}, "make")
				)
			)
		}
	});

	var init = function(){
		React.render(
			React.createElement(MakerBox, null), document.getElementById('maker')
		)
	};
	
	return{
		init: init
	}
});