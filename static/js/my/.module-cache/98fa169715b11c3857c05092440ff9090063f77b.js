define(['react','mixins'], function(mixins, React){
	var 

	Modal = React.createClass({displayName: "Modal",
	
		mixins: [mixins.modalmixin], 
	
		render: function() {
		
			var buttons = this.props.buttons.map(function(button) {
				return React.createElement("button", {type: "button", className: "btn btn-" + button.type, onClick: button.handler}, button.text)
			})
 
			return React.createElement("div", {className: "modal fade"}, 
					React.createElement("div", {className: "modal-dialog"}, 
						React.createElement("div", {className: "modal-content"}, 
							React.createElement("div", {className: "modal-header"}, 
								this.renderCloseButton(), 
								React.createElement("strong", null, this.props.header)
							), 
							React.createElement("div", {className: "modal-body"}, 
								this.props.children
							), 
							React.createElement("div", {className: "modal-footer"}, 
								buttons
							)
						)
					)
				)
			}
	}),
 
	ExampleApp = React.createClass({displayName: "ExampleApp",

		getInitialState: function() {
			return {
				logs: []
			}
		},
 
		render: function() {
		
			var buttons = [ {type: 'danger', text: 'Hide Modal', handler: this.handleExternalHide}, {type: 'primary', text: 'Do Nothing', handler: this.handleDoingNothing}]

			var logs = this.state.logs.map(function(log) {
					return React.createElement("div", {className: 'alert alert-' + log.type}, 
						"[", React.createElement("strong", null, log.time), "] ", log.message
					)
			})
 
			return React.createElement("div", {className: "panel panel-default"}, 
				React.createElement("div", {className: "panel-heading"}, 
				React.createElement("h3", {className: "panel-title"}, "Demo")
				), 
				React.createElement("div", {className: "panel-body"}, 
				React.createElement("button", {type: "button", className: "btn btn-primary btn-lg btn-block", onClick: this.handleShowModal}, "Show Modal"), 
				React.createElement("h3", null, "Logs"), 
				logs
				), 
				React.createElement(ExampleModal, {ref: "modal", 
				show: false, 
				header: "Example Modal", 
				buttons: buttons, 
				handleShow: this.handleLog.bind(this, 'Modal about to show', 'info'), 
				handleShown: this.handleLog.bind(this, 'Modal showing', 'success'), 
				handleHide: this.handleLog.bind(this, 'Modal about to hide', 'warning'), 
				handleHidden: this.handleLog.bind(this, 'Modal hidden', 'danger')
				}, 
				React.createElement("p", null, "I'm the content."), 
				React.createElement("p", null, "That's about it, really.")
				)
			)
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
	})
	
	return {
		Modal:Modal,
		ExampleApp:ExampleApp
	} 
	
});
	