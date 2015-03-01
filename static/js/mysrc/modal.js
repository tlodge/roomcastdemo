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
						return <button type="button" className="close" onClick={this.hide} dangerouslySetInnerHTML={{__html: '&times'}} />
					}
				}
		}(),
		
		ModalButton = React.createClass({
			
		
			handleClick: function(){
				this.props.handler();
			},
			
			render: function() {
			
				return(
					<button type="button" className={"btn btn-" + this.props.buttontype} onClick={this.handleClick}>{this.props.text}</button>
			
				)
			}
			
		}),
	
		Modal = React.createClass({
			
			mixins: [modalmixin], 
			
			render: function() {
				
				
				var buttons = this.props.buttons.map(function(button) {
					//return <button type="button" className={"btn btn-" + button.type} onClickCapture={button.handler}>{button.text}</button>
					return <ModalButton buttontype={button.type} handler={button.handler} text={button.text}/>
				})
 				
 				var modalStyle ={
 					width: this.props.modalwidth
 				}
 				
 				var bodyStyle={
 					height: this.props.modalheight 
 				}
 			
 				console.log(this.props.button);
 				
				return <div className="modal fade" >
						<div className="modal-dialog" style={modalStyle}>
							<div className="modal-content">
								<div className="modal-header">
									{this.renderCloseButton()}
									<strong>{this.props.header}</strong>
								</div>
								<div className="modal-body" style={bodyStyle}>
									
										<ModalAbout  width={Math.floor(this.props.modalwidth*1/4)} info={this.props.button.info} />
										<ModalOptions options={this.props.button.options || []} height={this.props.modalheight} left={Math.floor(this.props.modalwidth*1/4)} width={Math.floor(this.props.modalwidth*3/4)-1} />
								
								</div>
								<div className="modal-footer">
									{buttons}
								</div>
							</div>
						</div>
					</div>
				}
		}),
		
		ModalAbout = React.createClass({
 			render: function() {
 				var myStyle={
 					width: this.props.width + "px"
 				}	
 				return (<div className="modalinfo" style={myStyle} dangerouslySetInnerHTML={{__html: this.props.info}}/>)
 			}
 		}),
 		
 		ModalOptions = React.createClass({
 			
			render: function() {
				
				var questions = this.props.options.map(function(option, i){
					return(
						<Question top={i*this.props.height/this.props.options.length} height={Math.ceil(this.props.height/this.props.options.length)} width={this.props.width} question={option.question} components={option.components || []} />
					)
				}.bind(this));
				
 				var myStyle ={
 					width: this.props.width,
 					height: this.props.height,
 					left: this.props.left,
 				}
 				return (<div className="modaloptions" style={myStyle}>{questions}</div>)
 			}
 		}),
 		
 		Question = React.createClass({
 			render: function() {
 			
 				var headingheight = this.props.height/5;
 				
 				myStyle = {
 					top: this.props.top,
 					position: 'absolute',
 					left: 0,
 					textAlign: 'center',
 					width: this.props.width,
 					height: headingheight,
 					
 				}	
 				
 				headingStyle={
 					fontSize: headingheight*0.7,
 				}
 							
 				var components = this.props.components.map(function(component,i){
 					return <Component column={i} top={this.props.top+headingheight} height={this.props.height-headingheight} width={Math.ceil(this.props.width/this.props.components.length)} left={i*this.props.width/this.props.components.length} component={component} />
 				}.bind(this));
 				
 				return(
 					<div>
 						<div style={myStyle}><span style={headingStyle} className="optionsquestion">{this.props.question}</span></div>
 						<div>{components}</div>
 					</div>
 				)
 			}
 		}),
 		
 		Component = React.createClass({
 			
 			render: function(){
 				
 				myStyle={
 					left: this.props.left,
 					top: this.props.top,
 					width: this.props.width,
 					height: this.props.height,
 					position:'absolute',
 					background: this.props.column % 2 == 0 ? '#d4d4d4' : '#cccccc',
 				}
 				
 				var formitem = "";
 				
 				switch (this.props.component.type){
 					case "options":
 						formitem = <DropDown width={this.props.width} height={this.props.height} options={this.props.component.options || []}/>
 						break;
 					case "checkbox":
 						formitem = <CheckBox width={this.props.width} height={this.props.height} text={this.props.component.text} value={this.props.component.value} id={this.props.component.id}/>
 						
 					default:
 						break;
 				}
 				
 				return <div style={myStyle}>{formitem}</div>
 				
 			}
 		})
 		
 		DropDown = React.createClass({
 			
 			render:function(){
 				
 				var options = this.props.options.map(function(option){
 					return <option>{option}</option>
 				});
 				
 				var width 	= this.props.width * 0.9;
 				var height = this.props.height * 0.9;
 				var top = (this.props.height - height)/2;
 				var left = (this.props.width - width)/2;
 				//try paddingtop rather than top?
 				myStyle={
 					height: height,
 					width:  width,
 					textAlign: 'center',
 					fontSize: height * 0.5,
 					position: 'absolute',
 					top: top,
 					left: left,
 				}
 			
 				return <select style={myStyle} className="form-control">{options}</select>
 			}
 		}),
 		
 		
 		CheckBox = React.createClass({
 			
 			render:function(){
 					
 				var dim 	= Math.min(this.props.width * 0.9, this.props.height * 0.9);
 				var top =  (this.props.height-dim)/2;
 				var left = (this.props.width-dim)/2;
 				
 				//try paddingtop rather than top?
 				myStyle={
 					height: dim,
 					width:  dim,
 					textAlign: 'center',
 					fontSize: dim * 0.5,
 					position: 'absolute',
 					top: 5,
 					border: 3,
 					borderColor: '#4d4d4d',
 					borderStyle: 'solid',
 					background: 'white',
 					left: left,
 					
 				}
 				
 				myContainer={
 				
 					width: this.props.width,
 				}
 				
 				checkText={
 					top: 5 + dim + 5,
 					width: this.props.width,
 					position: 'absolute',
 					textAlign: 'center',
 					fontSize: dim/4,
 				}
 				
 				return 	<div style={myContainer}>
 							<div style={myStyle} id={this.props.id} value={this.props.value}></div>
 							<span style={checkText}>{this.props.text}</span>
 						</div>
 						
 			}
 		})
	return {
		Modal:Modal
	} 
	
});
	