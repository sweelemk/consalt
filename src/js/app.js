$(document).ready(function () {
	
	//detected mobile an init fullpage slider
	if(!head.mobile) {
		initFullpage();
	}

	function initFullpage() {
		var fullpageSettings = {
			css3: true,
			easingcss3: 'cubic-bezier(1,.47,1,1)',
			scrollingSpeed: 1000,
			fitToSection: true,
			navigation: true,
			navigationPosition: 'left',
			afterLoad: function(anchorLink, index){
				$('.fullpage').addClass('init');
				if(index === 1) {
					$('.menu-left').removeClass('hidden');
				} else {
					$('.menu-left').addClass('hidden');
				}
				if(index !== 4) {
					$('.scroll').addClass('hide');
					$('.footer').removeClass('show');
				} else {
					$('.scroll').removeClass('hide');
					$('.footer').addClass('show');
				}
			},
			onLeave: function(index, newIndex, direction){
				if(newIndex === 1) {
					$('.menu-left').removeClass('hidden');
				} else {
					$('.menu-left').addClass('hidden');
				}
				if(newIndex !== 4) {
					$('.scroll').addClass('hide');
					$('.footer').removeClass('show');
				} else {
					$('.scroll').removeClass('hide');
					$('.footer').addClass('show');
				}
			}
		}
		function init() {
			if(window.matchMedia('(max-width: 980px)').matches){
				$('.scroll-top').addClass('mobile');
				if($('.fullpage').hasClass('init')){
					$.fn.fullpage.destroy('all');
				}
			} else {
				$('.fullpage').removeClass('fp-destroyed');
				if(!$('html').hasClass('fp-enabled')) {
					$('.fullpage').fullpage(fullpageSettings);
					$('.scroll-top').removeClass('mobile');
				}
			}
		} init();

		$(window).on('resize', function(){
			init();
		});			

		$('.scroll').on('click', function(){
			$.fn.fullpage.moveSectionDown();
		});
	};

	//moveUp
	function moveSlideUp() {
		var sTop = $('.scroll-top');

		sTop.on('click', function() {
			if(!$(this).hasClass('mobile')) {
				$.fn.fullpage.moveTo(1);
			} else {
				$('html, body').animate({
					scrollTop: 0
				}, 850);
			};
		})
	} moveSlideUp();

	//menu toggle
	function menuToggle() {
		var menu = $('.menu'),
			overlay = $('.menu-overlay'),
			menuText = menu.find('.menu-left'),
			Lside = overlay.find('.menu__left'),
			$body = $('html'),
			scroll = $('.menu-scroll');

			menu.on('click', function(){
				if(overlay.hasClass('menu-open')) {
					menuText.removeClass('hidden');
					menu.removeClass('open');
					overlay
						.removeClass('menu-open')
						.delay(500)
						.fadeOut(0);
				} else {
					overlay.fadeIn({
						duration: 0,
						complete: function(){
							overlay.addClass('menu-open');
							menuText.addClass('hidden');
							menu.addClass('open');
						}
					})
				}
			});
			Lside.on('click', function(){
				menuText.removeClass('hidden');
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

	//swiper 
	function SwiperGallery() {
		var swiperMain = new Swiper('.swiper-main', {
			nextButton: '.swiper-button-next',
			prevButton: '.swiper-button-prev',
			pagination: '.swiper-pagination',
			paginationType: 'fraction'
		});
		var swiperCaption = new Swiper('.swiper-caption', {
			
		});
		swiperMain.params.control = [swiperCaption];
		swiperCaption.params.control = [swiperMain];

		$(window).on('resize', function(){
			swiperCaption.onResize();
			swiperMain.onResize();
		});
	} SwiperGallery();

})