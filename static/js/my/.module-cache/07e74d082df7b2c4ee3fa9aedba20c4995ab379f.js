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
					this.setState({buttons:data, buttonwidth:Math.ceil($(window).width()/data.length), windowwidth:$(window).width(), windowheight:$(window).height()});
				
				}.bind(this),
				error: function(xhr, status, err){
					console.error(this.props.url, status, err.toString);
				}.bind(this)
			});
		},
		
		getInitialState: function(){
			return {buttons:[], buttonwidth:0, windowheight:0, windowwidth:0};
		},
		
		handleResize: function(){
			this.setState({buttonwidth:Math.ceil($(window).width()/this.state.buttons.length), windowwidth:$(window).width(), windowheight:$(window).height()});
		
		},
		
		
		componentWillUnmount: function(){
			window.removeEventListener('resize', this.handleResize);
		},
		
		componentDidMount: function(){
			
			this.getButtonsFromServer();
			var self = this;
			window.addEventListener('resize', this.handleResize);
		},
		
		render: function(){
			var colours = ["#7bb6a4","#e5cf58","#cd804a","#445662","#d35a51", "#3f3b3c"];
			
			return (
				React.createElement("div", {className: "buttonpanel"}, 
					React.createElement(ButtonList, {colours: colours, 
						buttons: this.state.buttons, 
						buttonwidth: this.state.buttonwidth, 
						windowheight: this.state.windowheight, 
						windowwidth: this.state.windowwidth})
				)
			)
		}
	});

	var ButtonList = React.createClass({displayName: "ButtonList",
		
		
		allowedtoshow: true,
		
		handleExternalHide: function() {
			this.refs.modal.hide();
		},
		
		handleModalClick: function(button){
			this.setState({currentbutton:button});
			this.refs.modal.show();
		},
		
		getInitialState: function(){
			return {currentbutton:{}};
		},
		
		render: function(){
		
			var buttoncount = 0;
			//render each set of rows for each category!
			var columns = this.props.buttons.map(function(item, i){
				var left = i * this.props.buttonwidth;
				buttoncount = buttoncount + item.buttons.length;
				//used for setting the colour of the button
				return (
					 React.createElement(ButtonColumn, {buttoncount: buttoncount-item.buttons.length, colours: this.props.colours, clickhandler: this.handleModalClick, column: i, left: left, buttonwidth: this.props.buttonwidth, buttonheight:  Math.ceil(this.props.windowheight / item.buttons.length), category: item.category, buttons: item.buttons})
				);
				
				
				
			}.bind(this));
			
			var buttons = [ {type: 'danger', text: 'Hide Modal', handler: this.handleExternalHide}, {type: 'primary', text: 'Do Nothing', handler: this.handleDoingNothing}]
			
			
			return(	
				React.createElement("div", null, 
					React.createElement("div", {className: "buttoncolumns"}, columns), 
					React.createElement(modal.Modal, {ref: "modal", button: this.state.currentbutton, modalwidth: this.props.windowwidth*0.9, modalheight: this.props.windowheight*0.6, show: false, header: this.state.currentbutton.name, buttons: buttons})
				)
			)
			
		}
	});
	
	var ButtonColumn = React.createClass({displayName: "ButtonColumn",
		
		render: function(){
			
			var column = this.props.buttons.map(function(item, i){
				
				
				var cindex =  (this.props.buttoncount + i) %this.props.colours.length;
				
				var buttonStyle = {
					color: 'white',
					top: 	(this.props.buttonheight * i) + "px",
					left:   this.props.left  + "px",
					width:  this.props.buttonwidth + "px",
					height: this.props.buttonheight + "px",
					lineHeight:  this.props.buttonheight + "px",
					background: this.props.colours[cindex],
					fontSize: '5vw',
				};
				
				return (
					 React.createElement(Button, {clickhandler: this.props.clickhandler, buttonstyle: buttonStyle, category: this.props.category, data: item})
				);
			}.bind(this));
			
			return (React.createElement("div", {className: "buttoncolumn"}, column))
		}
	
	});
	
	var Button = React.createClass({displayName: "Button",
	
		
		mixins: [mixins.touchmixin],
		
		event: function(e){
			this.props.clickhandler(this.props.data);
		},
		
		
		
		
		render: function(){
		
			
			
			return(
				React.createElement("div", null, 
					React.createElement("div", {className: "button", onTouchStart: this.handleTouch, onClick: this.handleClick, style: this.props.buttonstyle}, this.props.data.name, " ")
				)
			)
		}
	});
	
	var init = function(){
		
		React.initializeTouchEvents(true);
		
		React.render(
			React.createElement(MainPanel, {url: "buttons/dave.json"}), document.getElementById('panel')
		)
		//React.render(<modal.ExampleApp/>, document.getElementById('panel'))
	};
	
	return{
		init: init
	}
});