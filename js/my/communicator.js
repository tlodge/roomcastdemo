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
			
			timer = window.setTimeout(function(){
					respond(msg,0);
			},  Math.random() * 5000);
		},
		
		respond = function(msg, count){
			radio('event').broadcast({id: msg.id, event:{id:eventidcount++, ts:Math.floor((new Date().getTime())/1000), type:"response", data:"hello e, thanks for this, we'll have it sorted soon."}});
			count = count + 1;
			if (count < 3){
				timer = window.setTimeout(function(){
					respond(msg, count);
				}, Math.random() * 5000);	
			}
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