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
							
					this.setState({buttons:data, column:column, row:row});
				
				}.bind(this),
				error: function(xhr, status, err){
					console.error(this.props.url, status, err.toString);
				}.bind(this)
			});
		},
		
		getInitialState: function(){
			return {buttons:[], column:{}, row:{}};
		},
		
		componentDidMount: function(){
			this.getButtonsFromServer();
		},
		
		render: function(){
			
			return (
				React.createElement("div", {className: "buttonpanel"}, 
					React.createElement(ButtonList, {buttons: this.state.buttons, rows: this.state.rows, cols: this.state.cols})
				)
			)
		}
	});

	var ButtonList = React.createClass({displayName: "ButtonList",
		
		render: function(){
			
			//render each set of rows for each category!
			var columns = this.props.buttons.map(function(item, i){
				return (
					 React.createElement(ButtonColumn, {column: i, category: item.category, buttons: item.buttons})
				);
			});
			
			return(	
				React.createElement("div", {className: "buttoncolumns"}, columns)
			)
			
		}
	});
	
	var ButtonColumn = React.createClass({displayName: "ButtonColumn",
		render: function(){
			var self = this;
			var column = this.props.buttons.map(function(item, i){
				
				var buttonStyle = {
					color: 'white',
					top: '10px',
					left: '100px',
					width: '100px',
					height: '100px'
				};
				
				return (
					 React.createElement(Button, {buttonstyle: buttonStyle, category: self.props.category, data: item})
				);
			});
			
			return (React.createElement("div", {className: "buttoncolumn"}, column))
		}
	
	});
	
	var Button = React.createClass({displayName: "Button",
		render: function(){
			return(
				React.createElement("div", {className: "button", style: this.props.buttonstyle}, this.props.data.name)
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