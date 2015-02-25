define(['jquery','react'], function($, React){

	"use strict";
		
	var MainPanel = React.createClass({displayName: "MainPanel",
		
		
		getButtonsFromServer: function(){
		
			$.ajax({
				url:this.props.url,
				dataType: 'json',
		
				success: function(data){
				
					var column 	= {};
					var row 	= {};
		
					data.forEach(function(item, i){
  						item.buttons.forEach(function (b, j){
  							column[b.id] = i;
  							row[b.id] = j;
  						});
  					});		
							
					console.log(data);
					console.log(column);
					console.log(row);	
					this.setState({buttons:data, column:column, row:row})
				
				
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