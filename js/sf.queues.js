sf.queues = {
	
	config: {
		repeatSpeed: 1000,
		timer: null
	},

	// Just social data waiting for product information
	social: [],
	// Data with product information waiting to be entered to the DOM
	pending: [],
	// Data that has been completed and is cached to be used again if necessary
	complete: [],

	runSocial: function(){
		// console.log(this.social);
		for( x=0; x<sf.queues.social.length; x++ ){
			sf.nordapi.execute(sf.queues.social[x], sf.queues.addPending);
			sf.queues.social.splice(x,1);
			console.log('adding social item to API');
		}
		this.timer = setTimeout(sf.queues.runSocial, sf.queues.config.repeatSpeed)
	},

	addPending: function(obj){
		this.pending.push(obj);
		console.log('adding pending item to queue');
	},
	addSocial: function(obj){
		sf.queues.social.push(obj);
	},

	getNextPending: function(){
		if( !this.pending.length )
			return false;
		var result = this.pending.splice(0, 1);
		this.pending.push(result);
	},
	killRepeater: function(){
		clearTimeout(this.config.timer);
	}

};