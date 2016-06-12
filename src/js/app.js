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
	} 
	if($('.swiper-main').length) {
		SwiperGallery();
	}	

	function tips(id, tip) {
		tip.tooltipster({
			animation: 'grow',
			maxWidth: 330,
			speed: 500,
			functionInit: function(){
				return $('#' + id).html();
			},
			functionReady: function(){
				$('#' + id).attr('aria-hidden', false);
			},
			functionAfter: function(){
				$('#' + id).attr('aria-hidden', true);
			}
		});
	};

	function tipInit() {
		var tip = $('.tips');
			tip.each(function(){
					var aria = $(this).attr('aria-describedby')
					tips(aria, $(this));
			});
	} tipInit();

	//dropzone
	function dropFile() {
		var dropfile = $("#mydropzone1");

		if(dropfile.length) {
			Dropzone.options.mydropzone = {
				// init: function() {
				// 	this.on("addedfile", function(file) { });
				// 	this.on("success", function(file) {
				// 	 });
				// 	this.on("removedfile", function(file) {
				// 		// $.ajax({
				// 		// 	type: "POST",
				// 		// 	url: "/fileupl.php",
				// 		// 	data: "del="+file['name'],
				// 		// 	dataType: "html"
				// 		// });
				// 	 });
				// },
				accept: function(file, done) {
					var re = /(?:\.([^.]+))?$/;
					var ext = re.exec(file.name)[1];
					ext = ext.toUpperCase();
					if ( ext == "DOC" || ext == "DOCX" || ext == "PDF") {
						done();
					}
					else { 
						done("Используйте пожалуйста .doc, docx или .pdf.");
					}
				},
				uploadMultiple: false,
				paramName: "file",
				maxFilesize: 15,
				dictDefaultMessage: "",
				addRemoveLinks: true,
				dictRemoveFile: '',
				createImageThumbnails: true,
				thumbnailWidth: 73,
				thumbnailHeight: 68,
				dictInvalidFileType: 'Данный формат файла не поддерживается.',
				previewTemplate: '<div class="dz-preview dz-file-preview"><div class="dz-details"><img data-dz-thumbnail /></div><div class="dz-progress"><span class="dz-upload" data-dz-uploadprogress></span></div><div class="dz-success-mark"><span>✔</span></div><div class="dz-error-mark"><span>✘</span></div><div class="dz-error-message"><span data-dz-errormessage></span></div></div>'
			}
		};
	} dropFile();

	//popup
	
	$('[data-popup]').each(function() {
		var _ = $(this);

		_.on('click', function(e) {
			popup($(this).data('popup'));
			e.preventDefault();
		});
	});


	function popup(selector) {
		var popupSelector = $('.' + selector),
			innerSelector = popupSelector.find('.popup'),
			duration = 500,
			close = popupSelector.find('.close'),
			btnSuccess = popupSelector.find('.btn__success'),
			html = $('html');

		popupSelector
			.fadeIn({
				duration: duration,
				start: function(){
					html.addClass('hidden');
				},
				complete: function(){
					$(this).addClass('visible');
				}
			});

		innerSelector.on('click', function(event){
			event.stopPropagation();
		});

		close.add(popupSelector).add(btnSuccess).on('click', function(){
			if(!popupSelector.hasClass('visible')) return;

			popupSelector
				.fadeOut({
					duration: duration,
					complete: function(){
						$(this).removeClass('visible');
						html.removeClass('hidden');
					}
				});
		});
	};

	//google map
	var map;
	function initialize() {
		var mapOptions = {
			zoom: 14,
			disableDefaultUI: true,
			scrollwheel: false,
			panControl: false,
			zoomControl: false,
			zoomControlOptions: {
			style: google.maps.ZoomControlStyle.SMALL,
			position: google.maps.ControlPosition.RIGHT_CENTER
		},
		scaleControl: true,
		center: new google.maps.LatLng(55.872686, 37.43495)
		};

		map = new google.maps.Map(document.getElementById('map'), mapOptions);
		var image = 'img/icons/baloon.png';
		var myLatLng = new google.maps.LatLng(55.872686, 37.43495);
		var beachMarker = new google.maps.Marker({
			position: myLatLng,
			map: map,
			icon: image,
			title:"аГ. ааОбаКаВаА, баЛ. аЁаВаОаБаОаДб, 103, ббб. 8"
		});
	}
	google.maps.event.addDomListener(window, 'load', initialize);

	google.maps.event.addDomListener(window, "resize", function() {
		var center = map.getCenter();
		google.maps.event.trigger(map, "resize");
		map.setCenter(center); 
	});


	//form validetor
	function validator() {
			var form_validate = $('.js-validate');
		if (form_validate.length) {
			form_validate.each(function () {
				var form_this = $(this);
				$.validate({
					form : form_this,
					borderColorOnError : true,
					scrollToTopOnError : false,
					onSuccess: function($form){
						valid($form);
						return false;
					}
				});
			});
		};
	} validator();

	function valid(form) {
		$(form).parents('.popup__wrap').find('.front').removeClass("active");
		$(form).parents('.popup__wrap').find('.back').addClass("active");
	}

	//fancy
	function fancy(el){
		el.fancybox({
			padding: 0,
			margin: [60,20,60,20]
		})
	};
	if($('.popup__img').length){
		fancy($('.popup__img'));
	}
})