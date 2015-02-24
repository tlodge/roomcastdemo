define(['jquery','react'], function($, React){

	"use strict";
	
	
	var ButtonNav = React.createClass({displayName: "ButtonNav",
		render: function(){
			return ("<div></div>");
		}
	});
	
	var ButtonName = React.createClass({displayName: "ButtonName",
		render: function(){
			return ("<div></div>");
		}
	});
	
	var ButtonGroup = React.createClass({displayName: "ButtonGroup",
		render: function(){
			return ("<div></div>");
		}
	});
	
	var ButtonDescription = React.createClass({displayName: "ButtonDescription",
		render: function(){
			return ("<div></div>");
		}
	});
	
	var ButtonNotify = React.createClass({displayName: "ButtonNotify",
		render: function(){
			return ("<div></div>");
		}
	});
	
	var ButtonContext = React.createClass({displayName: "ButtonContext",
		render: function(){
			return ("<div></div>");
		}
	});
	
	var ButtonUsers = React.createClass({displayName: "ButtonUsers",
		render: function(){
			return ("<div></div>");
		}
	});
	
	var ButtonSummary = React.createClass({displayName: "ButtonSummary",
		render: function(){
			return ("<div></div>");
		}
	});
	
	var MakerBox = React.createClass({displayName: "MakerBox",
		
		
		sendFlowsToServer: function(flows){
			console.log("flows are");
			console.log(flows);
			$.ajax({
				url:this.props.url,
				dataType: 'json',
				contentType:"application/json",
				headers:{'Node-RED-Deployment-Type':"flows"},
				type:'POST',
				data:JSON.stringify(flows),
				success: function(data){			
					this.setState({data:data})
				}.bind(this),
				error: function(xhr, status, err){
					console.error(this.props.url, status, err.toString);
				}.bind(this)
			});
		
		},
		
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
			var newflows = $.extend([],this.state.data);
			
			newflows.forEach(function(item){
				if (item.type=="template"){
					item.template="This is mutated!!";
				}
			})
			
			this.sendFlowsToServer(newflows);
		},
		render: function(){
			return (
				React.createElement("div", {className: "main"}, 
					React.createElement(ButtonNav, null), 
					React.createElement(ButtonName, null), 
					React.createElement(ButtonGroup, null), 
					React.createElement(ButtonDescription, null), 
					React.createElement(ButtonNotify, null), 
					React.createElement(ButtonContext, null), 
					React.createElement(ButtonUsers, null), 
					React.createElement(ButtonSummary, null)
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