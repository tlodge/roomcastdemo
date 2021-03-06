define(['jquery','react'], function($, React){

	"use strict";
	
	
	var ButtonNav = React.createClass({
		render: function(){
			return (<div></div>);
		}
	});
	
	var ButtonName = React.createClass({
		render: function(){
			return (<div></div>);
		}
	});
	
	var ButtonGroup = React.createClass({
		render: function(){
			return (<div></div>);
		}
	});
	
	var ButtonDescription = React.createClass({
		render: function(){
			return (<div></div>);
		}
	});
	
	var ButtonNotify = React.createClass({
		render: function(){
			return (<div></div>);
		}
	});
	
	var ButtonContext = React.createClass({
		render: function(){
			return (<div></div>);
		}
	});
	
	var ButtonUsers = React.createClass({
		render: function(){
			return (<div></div>);
		}
	});
	
	var ButtonSummary = React.createClass({
		
		make: function(){
			console.log("would pass something up here");
		},
		
		render: function(){
			return (
				<div className="content">
					<a href="#" className="btn btn-primary" onClick={this.make}>make</a>
				</div>
			)
		}
	});
	
	var MakerBox = React.createClass({
		
		
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
				<div className="main">
					<ButtonNav />
					<ButtonName />
					<ButtonGroup />
					<ButtonDescription />
					<ButtonNotify />
					<ButtonContext />
					<ButtonUsers />
					<ButtonSummary />
				</div>
			)
		}
	});

	var init = function(){
		React.render(
			<MakerBox url="red/flows"/>, document.getElementById('maker')
		)
	};
	
	return{
		init: init
	}
});