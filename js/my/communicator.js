define(['pusher' /*, 'pubnub'*/], function(pusher /*, pubnub*/){
	
	var 
		
		pusher = new Pusher('8e22d04310c8ee0d5159'),
		
		/*PUBNUB_demo = PUBNUB.init({
				publish_key: 'demo',
				subscribe_key: 'demo'
		}),*/
		
		send = function(){
			console.log("great!! send!!");
			//client events can only be done on private channels, and need to make sure they're set up in settings for this app!
			//see pusher docs!
			
			/*PUBNUB_demo.publish({
					channel: 'demo_tutorial',
					message: {"text":"Hey!"}
			});*/

			/*var channel = pusher.subscribe('private-channel');
			
			channel.bind('pusher:subscription_succeeded', function() {
			  console.log("nice, about to trigger an event!");
			  var triggered = channel.trigger('my_event', { message: 'hello!' });
			});
			*/
		},
		
		init = function(){
			console.log("nice am initing!!!");
		}
	
	return{
		init:init,
		send: send
	}
	
});