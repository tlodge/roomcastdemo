define(['radio'], function(radio){
	
	var 
		
		msgidcount = 789,
		eventidcount = 30,
		
		timer,
		
		send = function(message){
		
			var msg = {};
			
			//do something, then when successfully sent, let messages know!
			
			msg.id = msgidcount++;
			
			
			msg.button = message.name;
			
			msg.events = [{id:eventidcount++, ts:Math.floor((new Date().getTime())/1000), type:"press"}];
			
			radio('message').broadcast(msg);
			console.log("broadcast a message!");
			timer = window.setTimeout(function(){
					console.log("adding a new message (2s passed!)");
					radio('event').broadcast({id: 785, event:{id:eventidcount++, ts:Math.floor((new Date().getTime())/1000), type:"response", data:"hello e, thanks for this, we'll have it sorted soon."}});
			}, 2000);
		},
		
		subscribe = function(){
			radio('buttonpress').subscribe(send);
		},
		
		init = function(){
			subscribe();
		}
	
	return{
		init:init,
	}
	
});