define(['jquery','react', 'bootstrap', 'mixins'], function($, React, bootstrap, mixins){
	
	"use strict"
	
	var 


		modalmixin = function() {
		
			var handlerProps = ['handleShow', 'handleShown', 'handleHide', 'handleHidden'];
 
 			var hidecount = 0;
 			
			var bsModalEvents = {	
					handleShow: 'show.bs.modal',
					handleShown: 'shown.bs.modal',
					handleHide: 'hide.bs.modal',
					handleHidden: 'hidden.bs.modal'
			};
 
			return {
					
					propTypes: {
						handleShow: React.PropTypes.func,
						handleShown: React.PropTypes.func,
						handleHide: React.PropTypes.func,
						handleHidden: React.PropTypes.func,
						backdrop: React.PropTypes.bool,
						keyboard: React.PropTypes.bool,
						show: React.PropTypes.bool,
						remote: React.PropTypes.string,
					},
 
					getDefaultProps: function() {
						return {
							backdrop: true,
							keyboard: true,
							show: true,
							remote: '',
						}
					},
 
 					getInitialState: function(){
						return {test: 0};
					},
					
					componentDidMount: function() {
						
						console.log("ok component mounted!");
						
						var $modal = $(this.getDOMNode()).modal({
							backdrop: this.props.backdrop,
							keyboard: this.props.keyboard,
							show: this.props.show,
							remote: this.props.remote
						})
					
						handlerProps.forEach(function(prop) {
							if (this[prop]) {
								$modal.on(bsModalEvents[prop], this[prop])
							}
							if (this.props[prop]) {
								$modal.on(bsModalEvents[prop], this.props[prop])
							}
						}.bind(this))
					},
					
 
					componentWillUnmount: function() {
						var $modal = $(this.getDOMNode())
						
						handlerProps.forEach(function(prop) {
							if (this[prop]) {
								$modal.off(bsModalEvents[prop], this[prop])
							}
							if (this.props[prop]) {
								$modal.off(bsModalEvents[prop], this.props[prop])
							}
						}.bind(this))
					},
					
					hide: function() {
						this.hidecount = this.hidecount +1;
						this.setState({test: 9});
						$(this.getDOMNode()).modal('hide')
					},
 
					show: function() {
						$(this.getDOMNode()).modal('show')
					},
 
 					toggle: function() {
						$(this.getDOMNode()).modal('toggle')
					},
					
					renderCloseButton: function() {
						return React.createElement("button", {type: "button", className: "close", onClick: this.hide, dangerouslySetInnerHTML: {__html: '&times'}})
					}
				}
		}(),
		
		ModalButton = React.createClass({displayName: "ModalButton",
			
		
			handleClick: function(){
				this.props.handler();
			},
			
			render: function() {
			
				return(
					React.createElement("button", {type: "button", className: "btn btn-" + this.props.buttontype, onClick: this.handleClick}, this.props.text)
			
				)
			}
			
		}),
	
		Modal = React.createClass({displayName: "Modal",
			
			mixins: [modalmixin], 
 			
			render: function() {
				
				var buttons = this.props.buttons.map(function(button) {
					return React.createElement(ModalButton, {buttontype: button.type, handler: button.handler, text: button.text})
				})
 				
 				var modalStyle ={
 					width: this.props.modalwidth
 				}
 				
 				var bodyStyle={
 					height: this.props.modalheight 
 				}
 				
				return React.createElement("div", {className: "modal fade"}, 
						React.createElement("div", {className: "modal-dialog", style: modalStyle}, 
							React.createElement("div", {className: "modal-content"}, 
								React.createElement("div", {className: "modal-header"}, 
									this.renderCloseButton(), 
									React.createElement("strong", null, this.props.header)
								), 
								React.createElement("div", {className: "modal-body", style: bodyStyle}, 
									
										React.createElement(ModalAbout, {width: Math.floor(this.props.modalwidth*1/4), info: this.props.button.info}), 
										React.createElement(ModalOptions, {test: this.state.test, id: this.props.button.id, options: this.props.button.options || [], height: this.props.modalheight, left: Math.floor(this.props.modalwidth*1/4), width: Math.floor(this.props.modalwidth*3/4)-1})
								
								), 
								React.createElement("div", {className: "modal-footer"}, 
									buttons
								)
							)
						)
					)
				}
		}),
		
		ModalAbout = React.createClass({displayName: "ModalAbout",
 			render: function() {
 				var myStyle={
 					width: this.props.width
 				}	
 				return (React.createElement("div", {className: "modalinfo", style: myStyle, dangerouslySetInnerHTML: {__html: this.props.info}}))
 			}
 		}),
 		
 		ModalOptions = React.createClass({displayName: "ModalOptions",
 			
 			values: {},
 			
 			handleUpdate: function(item){
 				
 				console.log("ok state is " + this.props.test);
 				
 				if (this.values[this.props.id]==undefined){
 					this.values[this.props.id] = {};
 				}
 				//remove all entries that do not belong to this button?
 				
 				this.values[this.props.id][item.questionid + "_" + item.componentid] = {"name":item.name, "value":item.value}
 				console.log(this.values[this.props.id]);
 			},
 			
 			
			render: function() {
			
				
				var questions = this.props.options.map(function(option, i){
					return(
						React.createElement(Question, {handleUpdate: this.handleUpdate, top: i*this.props.height/this.props.options.length, height: Math.ceil(this.props.height/this.props.options.length), width: this.props.width, question: option.question, id: option.id, components: option.components || []})
					)
				}.bind(this));
				
 				var myStyle ={
 					width: this.props.width,
 					height: this.props.height,
 					left: this.props.left,
 				}
 				return (React.createElement("div", {className: "modaloptions", style: myStyle}, questions))
 			}
 		}),
 		
 		Question = React.createClass({displayName: "Question",
 		
 			handleUpdate: function(item){
 				item.questionid=this.props.id;
 				this.props.handleUpdate(item);
 			},
 			
 			render: function() {
 			
 				var headingheight = this.props.height/5;
 				
 				var myStyle = {
 					top: this.props.top,
 					position: 'absolute',
 					left: 0,
 					textAlign: 'center',
 					width: this.props.width,
 					height: headingheight,
 					lineHeight: headingheight + "px"
 				}	
 				
 				var headingStyle={
 					fontSize: headingheight*0.5,
 					
 				}
 							
 				var components = this.props.components.map(function(component,i){
 					return React.createElement(Component, {handleUpdate: this.handleUpdate, id: component.id, column: i, top: this.props.top+headingheight, height: this.props.height-headingheight, width: Math.ceil(this.props.width/this.props.components.length), left: i*this.props.width/this.props.components.length, component: component})
 				}.bind(this));
 				
 				return(
 					React.createElement("div", null, 
 						React.createElement("div", {style: myStyle}, React.createElement("span", {style: headingStyle, className: "optionsquestion"}, this.props.question)), 
 						React.createElement("div", null, components)
 					)
 				)
 			}
 		}),
 		
 		Component = React.createClass({displayName: "Component",
 			
 			handleUpdate: function(item){
 				
 				item.componentid = this.props.id;
 				this.props.handleUpdate(item)
 			},
 			
 			render: function(){
 				
 				var myStyle={
 					left: this.props.left,
 					top: this.props.top,
 					width: this.props.width,
 					height: this.props.height,
 					position:'absolute',
 					background: this.props.column % 2 == 0 ? '#d4d4d4' : '#cccccc',
 				}
 				
 				var formitem = "";
 				
 				switch (this.props.component.type){
 					case "text":
 						formitem = React.createElement(TextInput, {width: this.props.width, height: this.props.height, name: this.props.component.name, value: this.props.component.value, handleUpdate: this.handleUpdate})
 						break;
 					case "options":
 						formitem = React.createElement(DropDown, {width: this.props.width, height: this.props.height, value: this.props.component.value, options: this.props.component.options || [], handleUpdate: this.handleUpdate})
 						break;
 					case "checkbox":
 						formitem = React.createElement(CheckBox, {width: this.props.width, height: this.props.height, text: this.props.component.text, value: this.props.component.value, selected: this.props.component.selected, handleUpdate: this.handleUpdate})
 						break;
 					case "radio":
 						formitem = React.createElement(Radios, {width: this.props.width, height: this.props.height, value: this.props.component.value, options: this.props.component.options || [], handleUpdate: this.handleUpdate})
 						break;
 					default:
 						break;
 				}
 				
 				return React.createElement("div", {style: myStyle}, formitem)
 				
 			}
 		}),
 		
 		TextInput = React.createClass({displayName: "TextInput",
 		
 			handleChange:function(event){
 				this.setState({value:event.target.value});
 				this.props.handleUpdate({name:this.props.name, value:event.target.value});
 			},
 			
 			getInitialState: function(){
 				return {value:this.props.value};	
 			},
 			
 			componentDidMount: function(){
				//set the initial state of this checkbox!
				this.props.handleUpdate({name:this.props.name, value:this.state.value})
			},
			
 			render:function(){
 				
					var width 	= this.props.width * 0.9;
					var height = this.props.height * 0.9;
					var top = (this.props.height - height)/2;
					var left = (this.props.width - width)/2;
			
					var myStyle={
						height: height,
						width:  width,
						fontSize: height * 0.4,
						position: 'absolute',
						top: top,
						left: left,
					}
 			
 				return React.createElement("input", {type: "text", style: myStyle, value: this.state.value, className: "form-control", onChange: this.handleChange})	
 			}
 			
 		}),
 		
 		DropDown = React.createClass({displayName: "DropDown",
 			
 			handleChange: function(event){
 				if (event.target.value != this.state.value){
 					this.props.handleUpdate({name:this.state.value, value:false});
 					this.setState({value:event.target.value});
 					this.props.handleUpdate({name:event.target.value, value:true});
 				}
 			},
 			
 			getInitialState: function(){
 				return {value:this.props.value};	
 			},
 			
 			componentDidMount: function(){
				//set the initial state of this checkbox!
				this.props.handleUpdate({name:this.state.value, value:true})
			},
			
 			render:function(){
 				
 				var options = this.props.options.map(function(option){
 					return React.createElement("option", null, option)
 				});
 				
 				var width 	= this.props.width * 0.9;
 				var height = this.props.height * 0.9;
 				var top = (this.props.height - height)/2;
 				var left = (this.props.width - width)/2;
 				//try paddingtop rather than top?
 				var myStyle={
 					height: height,
 					width:  width,
 					textAlign: 'center',
 					fontSize: height * 0.4,
 					position: 'absolute',
 					top: top,
 					left: left,
 				}
 			
 				return React.createElement("select", {style: myStyle, value: this.state.value, className: "form-control", onChange: this.handleChange}, options)
 			}
 		}),
 		
 		Radios = React.createClass({displayName: "Radios",
 			
 			getInitialState: function(){
				return {selected: this.props.value};
			},
			
			handleSelect: function(item){
				if (item!=this.state.selected){
					this.props.handleUpdate({name:this.state.selected, value:false});
					this.setState({selected: item});	
					this.props.handleUpdate({name:item, value:true});
				}
			},
			componentDidMount: function(){
				//set the initial state of this checkbox!
				this.props.handleUpdate({name:this.state.selected, value:true})
			},
			
 			render:function(){
 				
 				
 				var fontpadding = 5;
 				var width = this.props.width/this.props.options.length;
 				var dim  = Math.min(width * 0.6, (this.props.height + (this.props.height*0.6/4) + fontpadding*2) * 0.6);
 				var fontsize = dim/6;
 				var left = (this.props.width-dim)/2;
 				var top   =  (this.props.height- (dim+fontpadding+fontsize))/2;
 				var options = this.props.options.map(function(option, i){
 					
 					var containerStyle={
 						height: this.props.height,
 						width: width,
 						left: width*i,
 						position: 'absolute',
 					}
 					
 					var radioStyle={
 						height: dim,
 						width:  dim,
 						position: 'absolute',
 						top: top,
 						left: (width-dim)/2,
 						background: this.state.selected==option? '#cd804a':'white',
 					}
 					var radioText={
						top: top + dim + fontpadding,
						width: width,
						fontSize: fontsize,
						textAlign: 'center',
						position: 'absolute',
						whiteSpace: 'nowrap',
						overflow: 'hidden',
						left:0,
					}
 					
 					return React.createElement("div", {style: containerStyle}, 
 						 	 React.createElement(Radio, {textStyle: radioText, radioStyle: radioStyle, value: option, handleSelect: this.handleSelect}), 
 						 	 React.createElement("span", {style: radioText}, option)
 						   )
 				}.bind(this));
 				
 				
 				return React.createElement("div", null, options)
 			}
 		}),
 		
 		Radio = React.createClass({displayName: "Radio",
 				
 			mixins: [mixins.touchmixin],
		
			event: function(e){
				this.props.handleSelect(this.props.value);
			},
			
			
 			render:function(){
 				return	React.createElement("div", null, 
 							React.createElement("div", {style: this.props.radioStyle, onTouchStart: this.handleTouch, onClick: this.handleClick})
 						)
 			}
 		
 		}),
 		
 		CheckBox = React.createClass({displayName: "CheckBox",
 			
 			mixins: [mixins.touchmixin],
		
			event: function(e){
				this.setState({selected: !this.state.selected});
				this.props.handleUpdate({name:this.props.value, value:!this.state.selected});
			},
			
			getInitialState: function(){
				return {selected: this.props.selected};
			},
			
			componentDidMount: function(){
				//set the initial state of this checkbox!
				this.props.handleUpdate({name:this.props.value, value:this.state.selected})
			},
			
 			render:function(){
 					
 				var dim 		= Math.min(this.props.width * 0.6, this.props.height * 0.6);
 				var fontsize 	= dim/6;
 				var fontpadding = 5;
 				var top =  (this.props.height-(dim+fontsize+fontpadding))/2;
 				var left = (this.props.width-dim)/2;
 				
 				//try paddingtop rather than top?
 				var myStyle={
 					height: dim,
 					width:  dim,
 					position: 'absolute',
 					top: top,
 					background: this.state.selected ? '#cd804a':'white',
 					left: left,
 					
 				}
 				
 				var myContainer={
 				
 					width: this.props.width,
 				}
 				
 				var checkText={
 					top: top + dim + 5,
 					width: this.props.width,
 					position: 'absolute',
 					textAlign: 'center',
 					fontSize: fontsize,
 					overflow: 'hidden',
 					whiteSpace: 'nowrap',
 				}
 				
 				return 	React.createElement("div", {style: myContainer}, 
 							React.createElement("div", {style: myStyle, id: this.props.id, value: this.props.value, onTouchStart: this.handleTouch, onClick: this.handleClick}), 
 							React.createElement("span", {style: checkText}, this.props.text)
 						)
 						
 			}
 		})
	return {
		Modal:Modal
	} 
	
});
	