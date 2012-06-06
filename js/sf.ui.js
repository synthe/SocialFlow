if( typeof sf != 'object' ) sf = {};

sf.ui = {
	config: {
		containerID: 'social-flow',
		templateID: 'sf-template',
		itemBaseHeight: 100,
		repeatSpeed: 2000,
		speedClasses: ['speed-fast', 'speed-normal', 'speed-slow']
	},
	elem: {
		container: null,
		template: null
	},
	init: function(){
		this.elem.container = $('#' + this.config.containerID);
		this.elem.template = $('#' + this.config.templateID);

		$('#social-flow').on('animationend webkitAnimationEnd', '.item', function() {
			$(this).remove();
		});

		this.repeater();
	},
	place: function(obj){
		if( !obj )
			return false;

		var elem = this.elem.template
			.clone()
			.removeAttr('id')
			.css("right", '500px')
			.css('top', this.getRandomPosition() + 'px');
		console.log(elem);
		var icon = elem.find('.icon')
			.attr('href', obj.link);
		icon.find('img')
			.attr('src', obj.icon)
		elem.find('.message p')
			.html(obj.message);
		elem.find('.message a')
			.attr('href', obj.link);

		var speedClass = this.config.speedClasses[Math.floor(Math.random()*this.config.speedClasses.length)];			
		elem.addClass(speedClass);
		// Add item to page
		elem.appendTo(this.elem.container);
	},
	getRandomPosition: function(){
		var maxHeight = this.elem.container.height();
		var maxPossible = Math.floor( maxHeight / this.config.itemBaseHeight );

		var position = (Math.floor(Math.random() * maxPossible)) * this.config.itemBaseHeight;
		position = position + (Math.floor((Math.random() * 50) - 25));
		console.log(position);
		return position;
	},
	getNext: function(queue){
		return {
			link: 'http://www.twitter.com',
			icon: 'img/demo-random-persons-face.jpg',
			message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum aliquam ligula nec felis aliquet rutrum. In molestie augue a mauris commodo sit amet egestas nisi euismod.',
			products: [
				{
					image: 'http://g-lvl3.nordstromimage.com/imagegallery/store/product/Thumbnail/11/_7081751.jpg',
					name: 'Some random product',
					link: 'http://www.nordstrom.com'
				},
				{
					image: 'http://g-lvl3.nordstromimage.com/imagegallery/store/product/Thumbnail/11/_7081751.jpg',
					name: 'Some random product',
					link: 'http://www.nordstrom.com'
				},
				{
					image: 'http://g-lvl3.nordstromimage.com/imagegallery/store/product/Thumbnail/11/_7081751.jpg',
					name: 'Some random product',
					link: 'http://www.nordstrom.com'
				},
				{
					image: 'http://g-lvl3.nordstromimage.com/imagegallery/store/product/Thumbnail/11/_7081751.jpg',
					name: 'Some random product',
					link: 'http://www.nordstrom.com'
				},
			]
		}
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