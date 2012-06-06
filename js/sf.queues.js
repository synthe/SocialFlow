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
		for( x=0; x<this.social.length; x++ ){
			sf.nordapi.execute(this.social[x].filter, sf.queues.addPending);
			this.social.splice(x,1);
		}
		this.timer = setTimeout(sf.queues.runSocial, this.config.repeatSpeed)
	},

	addPending: function(obj){
		this.pending.push(obj);
	},
	addSocial: function(obj){
		this.social.push(obj);
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