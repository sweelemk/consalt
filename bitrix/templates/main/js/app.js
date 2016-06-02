$(document).ready(function () {
	
	//detected mobile an init fullpage slider
	if(!head.mobile) {
		initFullpage();
	}

	function initFullpage() {
		$('.fullpage').fullpage({
			css3: true,
			easingcss3: 'cubic-bezier(1.000, 0.010, 0.990, 0.470)',
			scrollingSpeed: 1000,
			fitToSection: true,
			navigation: true,
			navigationPosition: 'left',
			afterLoad: function(anchorLink, index){
				if(index === 1) {
					$('.menu-left').removeClass('hidden');
				} else {
					$('.menu-left').addClass('hidden');
				}
			},
			onLeave: function(index, newIndex, direction){
				if(newIndex === 1) {
					$('.menu-left').removeClass('hidden');
				} else {
					$('.menu-left').addClass('hidden');
				}
			}
		});
	};

	//menu toggle
	function menuToggle() {
		var menu = $('.menu'),
			overlay = $('.menu-overlay'),
			Lside = overlay.find('.menu__left');

			menu.on('click', function(){
				if(overlay.hasClass('menu-open')) {
					overlay
						.removeClass('menu-open')
						.delay(500)
						.fadeOut(0);
				} else {
					overlay.fadeIn({
						duration: 0,
						complete: function(){
							overlay.addClass('menu-open');
						}
					})
				}
			});
			Lside.on('click', function(){
				overlay
					.removeClass('menu-open')
					.delay(5000)
					.fadeOut(0);
			});

	} menuToggle();

	// switcher
	function switcher(){
		var bContainer = $('.business'),
			bItem = bContainer.find('.business-item'),
			hContainer = $('.head-categories'),
			hCmain = hContainer.prev('.head'),
			hItem = hContainer.find('.head-categories__item');

		bItem.on('mouseenter', function(){
			var index = $(this).index();

			hCmain.addClass('hidden');
			hContainer.addClass('visible');
			hItem.eq(index).addClass('active').siblings().removeClass('active');

		});

		bItem.on('mouseleave', function(){
			hCmain.removeClass('hidden');
			hContainer.removeClass('visible');
			hItem.removeClass('active');
		});
		
	} switcher();

})