define(['jquery','react'], function($, React){

	"use strict";
	
	var MakerBox = React.createClass({displayName: "MakerBox",
		
		
		getFlowsFromServer: function(){
			$.ajax({
				url:this.props.url,
				dataType: 'json',
				success: function(data){
					
					this.setState({data:data})
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
			this.getFlowsFromServer();
		},
		make: function(){
			console.log("would make!!");
			
			console.log(this.state);
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