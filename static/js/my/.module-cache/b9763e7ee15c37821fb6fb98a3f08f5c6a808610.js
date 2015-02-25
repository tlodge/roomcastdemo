define(['jquery','react'], function($, React){

	"use strict";
		
	var MakerBox = React.createClass({displayName: "MakerBox",
		
		
		getButtonsFromServer: function(){
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
			this.getButtonsFromServer();
		},
		
		render: function(){
			return (
				React.createElement("div", {className: "buttonpanel"}, 
					React.createElement("div", {className: "button"})
				)
			)
		}
	});

	var init = function(){
		console.log("great stuff, creating the buttons grid");
		
		React.render(
			React.createElement(MainPanel, {url: "buttons/demo.json"}), document.getElementById('panel')
		)
	};
	
	return{
		init: init
	}
});