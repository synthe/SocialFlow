if( typeof sf != 'object' ) sf = {};

sf.ui = {
	config: {
		containerID: 'social-flow',
		templateID: 'sf-template',
		itemBaseHeight: 135,
		repeatSpeed: 1000,
		noIconImage: 'img/demo-random-persons-face.jpg',
		sizeClasses: ['size-normal', 'size-small'],
		speedClasses: ['speed-fast', 'speed-normal', 'speed-slow']
	},
	elem: {
		container: null,
		template: null,
		blockUI: null
	},
	init: function(){
		this.elem.container = $('#' + this.config.containerID);
		this.elem.template = $('#' + this.config.templateID);
		this.elem.blockUI = $('.blockUI');

		$('#social-flow')
			.on('animationend webkitAnimationEnd', '.item', function() {
				$(this).remove();
			})
			.on('mouseover', '.item', function(){
				sf.ui.elem.blockUI.css('display', 'block');
			})
			.on('mouseout', '.item', function(){
				sf.ui.elem.blockUI.css('display', 'none');
			});

		this.repeater();
	},
	place: function(obj){
		if( !obj )
			return false;

		var elem = this.elem.template
			.clone()
			.removeAttr('id')
			.css('top', this.getRandomPosition() + 'px');
		var icon = elem.find('.icon')
			.attr('href', obj.link);
		icon.find('img')
			.attr('src', (obj.icon ? obj.icon : this.config.noIconImage));
		elem.find('.message p')
			.html(obj.message);
		elem.find('.message a')
			.attr('href', obj.link);

		var products = elem.find('.products');
		// Place products
		for( x=0; x<obj.products.length; x++ ){
			var y = $('<a target="_blank"><img /><span></span></a>');
			y.attr('href', obj.products[x].link);
			y.find('img').attr('src', obj.products[x].photo);
			y.appendTo(products);
		}

		var speedClass = this.config.speedClasses[Math.floor(Math.random()*this.config.speedClasses.length)];			
		elem.addClass(speedClass);
		var sizeClass = this.config.sizeClasses[Math.floor(Math.random()*this.config.sizeClasses.length)];			
		elem.addClass(sizeClass);
		// Add item to page
		elem.appendTo(this.elem.container);
	},
	getRandomPosition: function(){
		var maxHeight = this.elem.container.height();
		var maxPossible = Math.floor( maxHeight / this.config.itemBaseHeight );

		var position = (Math.floor(Math.random() * maxPossible)) * this.config.itemBaseHeight;
		position = position + (Math.floor((Math.random() * 50) - 25));
		return position;
	},
	getNext: function(queue){
		return sf.queues.getNextPending();
		/* json example structure
		return {
			link: 'http://www.twitter.com',
			icon: 'img/demo-random-persons-face.jpg',
			message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum aliquam ligula nec felis aliquet rutrum. In molestie augue a mauris commodo sit amet egestas nisi euismod.',
			products: [
				{
					photo: 'http://g-lvl3.nordstromimage.com/imagegallery/store/product/Thumbnail/11/_7081751.jpg',
					name: 'Some random product',
					link: 'http://www.nordstrom.com'
				},
				{
					photo: 'http://g-lvl3.nordstromimage.com/imagegallery/store/product/Thumbnail/11/_7081751.jpg',
					name: 'Some random product',
					link: 'http://www.nordstrom.com'
				},
				{
					photo: 'http://g-lvl3.nordstromimage.com/imagegallery/store/product/Thumbnail/11/_7081751.jpg',
					name: 'Some random product',
					link: 'http://www.nordstrom.com'
				},
				{
					photo: 'http://g-lvl3.nordstromimage.com/imagegallery/store/product/Thumbnail/11/_7081751.jpg',
					name: 'Some random product',
					link: 'http://www.nordstrom.com'
				},
			]
		}
		*/
	},
	repeater: function(){
		sf.ui.place( sf.ui.getNext() );
		clearTimeout(sf.ui.config.timer);
		sf.ui.config.timer = setTimeout('sf.ui.repeater()', sf.ui.config.repeatSpeed);
	},
	killRepeater: function(){
		clearTimeout(sf.ui.config.timer);
	}
}
