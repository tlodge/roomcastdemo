define(['jquery','react'], function($, React){

	"use strict";
	
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
			console.log("would make!!");
			var newflows = $.extend([],this.state.data);
			
			newflows.forEach(function(item){
				if (item.type=="template"){
					item.template="This is mutated!!";
				}
			})
			
			this.sendFlowsToServer(newflows);
			console.log(newflows);
		},
		render: function(){
			return (
				<div className="content">
					<a href="#" className="btn btn-primary" onClick={this.make}>make</a>
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