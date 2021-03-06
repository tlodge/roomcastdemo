define(['jquery','react', 'bootstrap', 'mixins'], function($, React, bootstrap, mixins){
	var 


		modalmixin = function() {
		
			var handlerProps = ['handleShow', 'handleShown', 'handleHide', 'handleHidden'];
 
			var bsModalEvents = {	
					handleShow: 'show.bs.modal',
					handleShown: 'shown.bs.modal',
					handleHide: 'hide.bs.modal',
					handleHidden: 'hidden.bs.modal'
			}
 
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
 
					componentDidMount: function() {
						
						
						
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
						console.log("HIDE HAS BEEN CALLED!!!");
						$(this.getDOMNode()).modal('hide')
					},
 
					show: function() {
						console.log("SHOW HAS BEEN CALLED!!!");
						$(this.getDOMNode()).modal('show')
					},
 
 					toggle: function() {
 						console.log("TOGGLE HAS BEEN CALLED!!!");
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
					//return <button type="button" className={"btn btn-" + button.type} onClickCapture={button.handler}>{button.text}</button>
					return React.createElement(ModalButton, {buttontype: button.type, handler: button.handler, text: button.text})
				})
 				
 				var modalStyle ={
 					width: this.props.modalwidth + "px"
 				}
 				
 				var bodyStyle={
 					height: this.props.modalheight + "px"
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
										React.createElement(ModalOptions, {height: this.props.modalheight, left: Math.floor(this.props.modalwidth*1/4), width: Math.floor(this.props.modalwidth*3/4)})
								
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
 					width: this.props.width + "px"
 				}
 				
 				return (React.createElement("div", {className: "modalinfo", style: myStyle, dangerouslySetInnerHTML: {__html: this.props.info}}))
 			}
 		}),
 		
 		ModalOptions = React.createClass({displayName: "ModalOptions",
 			
			render: function() {
 				var myStyle ={
 					width: this.props.width,
 					height: this.props.height,
 					left: this.props.left
 				}
 				return (React.createElement("div", {className: "modaloptions", style: myStyle}, "hello!"))
 			}
 		})
 		
		/*ExampleApp = React.createClass({

			getInitialState: function() {
				return {
					logs: []
				}
			},
 
			render: function() {
		
				var buttons = [ {type: 'danger', text: 'Hide Modal', handler: this.handleExternalHide}, {type: 'primary', text: 'Do Nothing', handler: this.handleDoingNothing}]

				var logs = this.state.logs.map(function(log) {
						return <div className={'alert alert-' + log.type}>
							[<strong>{log.time}</strong>] {log.message}
						</div>
				})
 
				return <div className="panel panel-default">
					<div className="panel-heading">
					<h3 className="panel-title">Demo</h3>
					</div>
					<div className="panel-body">
					<button type="button" className="btn btn-primary btn-lg btn-block" onClick={this.handleShowModal}>Show Modal</button>
					<h3>Logs</h3>
					{logs}
					</div>
					<Modal ref="modal" show={false} header="Example Modal" buttons={buttons} handleShow={this.handleLog.bind(this, 'Modal about to show', 'info')} 
					handleShown={this.handleLog.bind(this, 'Modal showing', 'success')} handleHide={this.handleLog.bind(this, 'Modal about to hide', 'warning')}
					handleHidden={this.handleLog.bind(this, 'Modal hidden', 'danger')}>
					<p>I am the content.</p>
					<p>That is about it, really.</p>
					</Modal>
				</div>
			},
 
			handleShowModal: function() {
				this.refs.modal.show()
			},
 
			handleExternalHide: function() {
				this.refs.modal.hide()
			},
 
			handleDoingNothing: function() {
				this.handleLog("Remember I said I'd do nothing? ...I lied!", 'danger')
			},
 
			handleLog: function(message, type) {
				this.setState({logs: [{ type: type , time: new Date().toLocaleTimeString() , message: message}].concat(this.state.logs.slice(0, 3))
				})
			}
		})*/
	
	return {
		Modal:Modal
	} 
	
});
	