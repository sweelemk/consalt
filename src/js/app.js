$(document).ready(function () {
	
	//detected mobile an init fullpage slider
	if(!head.mobile) {
		initFullpage();
	} else {
		scrolls();
	}

	function initFullpage() {
		var fullpageSettings = {
			css3: true,
			// easingcss3: 'cubic-bezier(1,.47,1,1)',
			scrollingSpeed: 400,
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
				if(direction === 'down') {
					$('.section').removeClass('up');
					$('.section.active').next().addClass('down').siblings().removeClass('down');
				} else {
					$('.section').removeClass('down');
					$('.section.active').prev().addClass('up').siblings().removeClass('up');
				}
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
				scrolls();
			};
		})
	} moveSlideUp();

	function scrolls() {
		var sTop = $('.scroll-top');

		sTop.on('click', function() {
			$('html, body').animate({
				scrollTop: 0
			}, 850);
		});
	};

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
					$body.removeClass('hidden');
					menu.removeClass('open');
					overlay
						.removeClass('menu-open')
						.delay(150)
						.fadeOut(150);
				} else {
					overlay.fadeIn({
						duration: 150,
						complete: function(){
							overlay.addClass('menu-open');
							menuText.addClass('hidden');
							$body.addClass('hidden');
							menu.addClass('open');
						}
					})
				}
			});
			Lside.on('click', function(){
				menuText.removeClass('hidden');
				$body.removeClass('hidden');
				menu.removeClass('open');
				overlay
					.removeClass('menu-open')
					.delay(150)
					.fadeOut(150);
			});

	} menuToggle();

	function menuHide() {
		var top = $(window).scrollTop(),
			menu = $('.menu');

		if(top > 50) {
			menu.addClass('hide');
		} else {
			menu.removeClass('hide');
		}
	} menuHide();

	$(window).on('scroll', function(){
		menuHide();
	});

	// switcher
	function switcher(){
		var bContainer = $('.business'),
			bItem = bContainer.find('.business-item'),
			hContainer = $('.head-categories'),
			hCmain = hContainer.prev('.head'),
			hItem = hContainer.find('.head-categories__item'),
			timeout;

		bItem.on('mouseenter', function(){
			var index = $(this).index();

			hCmain.addClass('hidden');
			timeout = setTimeout(function() {
				hCmain.addClass('top');
			}, 200);
			hContainer.addClass('visible');
			hItem.eq(index).addClass('active').siblings().removeClass('active');

		});
		// bContainer.on('mouseleave', function(){
		// 	hCmain.removeClass('hidden top');
		// 	clearTimeout(timeout);
		// });

		bItem.on('mouseleave', function(){
			hContainer.removeClass('visible');
			hItem.removeClass('active');
			hCmain.removeClass('hidden top');
			clearTimeout(timeout);
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
			animation: 'fade',
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
		var dropfile = $("#mydropzone1"),
			dropfile2 = $("#mydropzone2");

		if(dropfile.length) {
			Dropzone.autoDiscover = false;
			$('#mydropzone1').dropzone(
				{
					url: '../fileupload.php',
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
					maxFiles:1,
					init: function() {
						this.on('addedfile', function(file) {
							if (this.files.length > 1) {
								this.removeFile(this.files[0]);
							}
							var txt =  dropfile2.find('.dz-filename').find('span').text();
							dropfile2.find('.drop__title').find('span').html(txt);
							dropfile2.find('.dz-remove').on("click", function(){
								dropfile2.find('.drop__title').find('span').html('Прикрепить резюме');
							});
						});
					},
					uploadMultiple: false,
					paramName: "file",
					maxFilesize: 5,
					dictDefaultMessage: "",
					addRemoveLinks: true,
					dictRemoveFile: '',
					createImageThumbnails: true,
					thumbnailWidth: 0,
					thumbnailHeight: 0,
					previewTemplate: '<div class="dz-preview dz-file-preview"><div class="dz-details"><div class="dz-filename"><span data-dz-name></span></div></div><div class="dz-error-message"><span data-dz-errormessage></span></div></div>'
				}
			);
			$('#mydropzone2').dropzone(
				{
					url: '../fileupload.php',
					maxFiles:1,
					init: function() {
						this.on('addedfile', function(file) {
							if (this.files.length > 1) {
								this.removeFile(this.files[0]);
							}
							var txt =  dropfile2.find('.dz-filename').find('span').text();
							dropfile2.find('.drop__title').find('span').html(txt);
							dropfile2.find('.dz-remove').on("click", function(){
								dropfile2.find('.drop__title').find('span').html('Прикрепить резюме');
							});
						});
					},
					uploadMultiple: false,
					acceptedFiles: 'image/*',
					paramName: "file",
					maxFilesize: 15,
					dictDefaultMessage: "",
					addRemoveLinks: true,
					dictRemoveFile: '',
					createImageThumbnails: true,
					thumbnailWidth: 0,
					thumbnailHeight: 0,
					previewTemplate: '<div class="dz-preview dz-file-preview"><div class="dz-details"><div class="dz-filename"><span data-dz-name></span></div></div><div class="dz-error-message"><span data-dz-errormessage></span></div></div>'
				}
			);
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
	function maps(){
		var map;
		function initialize() {
			var stylez = [{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#444444"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2f2f2"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":-100},{"lightness":45}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#dde6e8"},{"visibility":"on"}]}];
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
			var mapType = new google.maps.StyledMapType(stylez, { name:"Grayscale" });
			map.mapTypes.set('tehgrayz', mapType);
    		map.setMapTypeId('tehgrayz');
			var image = 'img/icons/baloon.png';
			var myLatLng = new google.maps.LatLng(55.872686, 37.43495);
			var beachMarker = new google.maps.Marker({
				position: myLatLng,
				map: map,
				icon: image,
				title:""
			});
		}
		google.maps.event.addDomListener(window, 'load', initialize);

		google.maps.event.addDomListener(window, "resize", function() {
			var center = map.getCenter();
			google.maps.event.trigger(map, "resize");
			map.setCenter(center); 
		});
	} if($('#map').length) {
		maps();
	}

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
					onValid: function($form){
						validPick($form);
					},
					onSuccess: function($form){
						valid($form);
						return false;
					}
				});
			});
		};
	} validator();

	function validPick(form){
		var pick = $(form);
		pick.each(function(){
			var val = $(this).val();
			if(val === ''){
				$(this).addClass('error').parent().addClass('has-error');
			} else {
				$(this).removeClass('error').addClass('success');
				$(this).parent().removeClass('has-error').addClass('has-success');
			}
		});
	};

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

	//datepicker
	function picker() {
		jQuery.datetimepicker.setLocale('ru');
		$('.picker').datetimepicker({
			i18n:{
				ru:{
					months:[
					'Январь','Февраль','Март','Апрель',
					'Май','Июнь','Июль','Август',
					'Сентябрь','Октябрь','Ноябрь','Декабрь',
					],
					dayOfWeek:[
					"Пн.", "Вт.", "Ср.", "Чт.", 
					"Пт.", "Сб.", "Вс.",
					]
				},
			},
			timepicker:false,
			dayOfWeekStart: 1,
			format:'d.m.Y',
			onClose: function(current_time,$input){
				if($input.val() === '') {
					$input.addClass('error');
					$input.parent().addClass('has-error');
				} else {
					$input.removeClass('error').addClass('success');
					$input.parent().removeClass('has-error').addClass('has-success');
				}
			}
		})
	}
	if($('.picker').length) {
		picker();
	}

	//select
	function select() {
		var select = $('.select');
		select.each(function(){
			var place = $(this).attr('placeholder');
			$(this).multipleSelect({
				single: true,
				width: '100%',
				placeholder: place,
				onClose: function () {
				$('.ms-choice').removeClass('is-active');
					if($('.ms-drop').find('li.selected').length) {
						$('.ms-drop').parents('.field__body').removeClass('has-error');
						$('.ms-drop').parents('.field__body').addClass('has-success');
					}else {
						$('.ms-drop').parents('.field__body').addClass('has-error').removeClass('has-success');
					}
				}
			});
		});
	} select();

	function activeSel() {
		var parent = $('.select'),
			item = parent.find('> button'),
			li = parent.find('.ms-drop li');
		item.on('click', function () {
			var this_ = $(this),
				div = this_.find('> div');
			if (div.hasClass('open')) {
				$('.ms-choice').removeClass('is-active');
				div.parents('.ms-choice').addClass('is-active');
			}
			else {
				div.parents('.ms-choice').removeClass('is-active');
			}
		});
		li.on('click', function() {
			var parent = $(this).parents('.select');
			parent.find('.ms-choice').removeClass('is-active');
		});

	}
	activeSel();

	//autosize
	// function autoSize() {
		autosize($('.size'));
	//} autosize();
})