define(['jquery','react'], function($, React){

	"use strict";
	
	var MakerBox = React.createClass({displayName: "MakerBox",
		
		getFlowsFromServer: function(){
			$.ajax({
				url:this.props.url,
				dataType: 'json',
				success: function(data){
					console.log(data);
				}.bind(this),
				error: function(xhr, status, err){
					console.error(this.props.url, status, err.toString);
				}.bind(this)
			});
		},
		getInitialState: function(){
			return {data:[]};
		},
		componentDidMount: function(){
			getFlowsFromServer();
		},
		make: function(){
			console.log("would make!!");
		},
		render: function(){
			return (
				React.createElement("div", {className: "content"}, 
					React.createElement("a", {href: "#", className: "btn btn-primary", onClick: this.make}, "make")
				)
			)
		}
	});

	var init = function(){
		React.render(
			React.createElement(MakerBox, {url: "red/flows"}), document.getElementById('maker')
		)
	};
	
	return{
		init: init
	}
});