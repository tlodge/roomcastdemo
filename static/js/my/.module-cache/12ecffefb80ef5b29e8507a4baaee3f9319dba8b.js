define(['jquery','react', 'mixins', 'modal'], function($, React, mixins, modal){

	"use strict";
	
	var MainPanel = React.createClass({displayName: "MainPanel",
		
		maxbuttons: 0,
		
		
		getButtonsFromServer: function(){
			
			$.ajax({
				url:this.props.url,
				dataType: 'json',
		
				success: function(data){
					
					data.forEach(function(item, i){
						this.maxbuttons = Math.max(this.maxbuttons, item.buttons.length);
  					}.bind(this));		
					this.setState({buttons:data, buttonwidth:Math.floor($(window).width()/data.length), buttonheight:Math.floor($(window).height()/this.maxbuttons)});
				
				}.bind(this),
				error: function(xhr, status, err){
					console.error(this.props.url, status, err.toString);
				}.bind(this)
			});
		},
		
		getInitialState: function(){
			return {buttons:[], buttonwidth:0, buttonheight:0};
		},
		
		componentDidMount: function(){
			
			this.getButtonsFromServer();
			var self = this;
			$(window).resize(function(){
				this.setState({buttonwidth:Math.floor($(window).width()/this.state.buttons.length), buttonheight:Math.floor($(window).height()/this.maxbuttons)});
			}.bind(this));
		},
		
		render: function(){
			
			return (
				React.createElement("div", {className: "buttonpanel"}, 
					React.createElement(ButtonList, {buttons: this.state.buttons, buttonwidth: this.state.buttonwidth, buttonheight: this.state.buttonheight})
				)
			)
		}
	});

	var ButtonList = React.createClass({displayName: "ButtonList",
		
		render: function(){
			var self = this;
			//render each set of rows for each category!
			var columns = this.props.buttons.map(function(item, i){
				var left = i * self.props.buttonwidth;
				return (
					 React.createElement(ButtonColumn, {column: i, left: left, buttonwidth: self.props.buttonwidth, buttonheight: self.props.buttonheight, category: item.category, buttons: item.buttons})
				);
			});
			
			return(	
				React.createElement("div", {className: "buttoncolumns"}, columns)
			)
			
		}
	});
	
	var ButtonColumn = React.createClass({displayName: "ButtonColumn",
		
		
		
		render: function(){
			
			var column = this.props.buttons.map(function(item, i){
				
				var buttonStyle = {
					color: 'white',
					top: 	(this.props.buttonheight * i) + "px",
					left:   this.props.left  + "px",
					width:  this.props.buttonwidth + "px",
					height: this.props.buttonheight + "px",
					lineHeight:  this.props.buttonheight + "px",
				};
				
				return (
					 React.createElement(Button, {buttonstyle: buttonStyle, category: this.props.category, data: item})
				);
			}.bind(this));
			
			return (React.createElement("div", {className: "buttoncolumn"}, column))
		}
	
	});
	
	var Button = React.createClass({displayName: "Button",
		mixins: [mixins.touchmixin],
		
		event: function(){
			this.refs.modal.show();
			console.log(this.props.data.name);
		},
		
		render: function(){
			var buttons = [ {type: 'danger', text: 'Hide Modal', handler: this.handleExternalHide}, {type: 'primary', text: 'Do Nothing', handler: this.handleDoingNothing}]

			return(
				React.createElement("div", null, 
					React.createElement("div", {className: "button", onTouchStart: this.handleTouch, onClick: this.handleClick, style: this.props.buttonstyle}, this.props.data.name, " "), 
				
					React.createElement(modal.Modal, {ref: "modal", show: false, header: "Example Modal", buttons: buttons}, 
						React.createElement("p", null, "I am the content."), 
						React.createElement("p", null, "That is about it, really.")
					)
				)
			)
		}
	});
	
	var init = function(){
		
		React.initializeTouchEvents(true);
		
		React.render(
			React.createElement(MainPanel, {url: "buttons/demo.json"}), document.getElementById('panel')
		)
		//React.render(<modal.ExampleApp/>, document.getElementById('panel'))
	};
	
	return{
		init: init
	}
});