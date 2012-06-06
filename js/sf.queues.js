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
			//console.log(sf.queues.social[x]);
		}
		this.timer = setTimeout(sf.queues.runSocial, sf.queues.config.repeatSpeed)
	},

	addPending: function(obj){
		sf.queues.pending.push(obj);
		// console.log('adding pending item to queue', obj);
	},
	addSocial: function(obj){
		sf.queues.social.push(obj);
	},

	getNextPending: function(){
		if( !sf.queues.pending.length )
			return false;
		var result = sf.queues.pending.splice(0, 1);
		if (result.length > 0) {
			sf.queues.pending.push(result[0]);
		}
		return result[0];
	},
	killRepeater: function(){
		clearTimeout(this.config.timer);
	}

};