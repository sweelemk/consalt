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
			navigation: true
		});
	}

})