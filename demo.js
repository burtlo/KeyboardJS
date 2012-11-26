$(function() {
	var $demoReadout, konami, kI = 0;

	$('.content').hide().fadeIn(1200);
	$('.header, .next').hide().delay(1200).fadeIn(1200);

	konami = ['up', 'up', 'down', 'down', 'left', 'right', 'left', 'right', 'b', 'a'];

	$activeKeys = $('.activeKeys');
	$activeKeys.html('Press some keys...');

	$(document).on('keydown', updateActiveKeys);
	$(document).on('keyup', updateActiveKeys);

	$(window).on('resize', resize);
	resize();

	function resize() {
		var $page, pageHeight, pageHeightPadd;
		$page = $('.page');
		pageHeight = innerHeight || document.body.clientHeight;
		pageHeightPadd = $page.outerHeight() - $page.height();
		$page.height(pageHeight - pageHeightPadd);
	}

	function updateActiveKeys() {
		setTimeout(function() {
			var keys, keysString;

			keys = KeyboardJS.activeKeys();
			if(keys.length) {
				keysString = keys.join(', ');
				for(var i = 0; i < keys.length; i += 1) {
					//check to see if the key is part of the konami code
					if(keys[i] === konami[kI]) {
						if(kI < konami.length - 1) {
							kI += 1;
						} else {
							window.location = "http://en.wikipedia.org/wiki/Konami_Code";
						}
					} else {
						kI = 0;
					}
				}
			} else {
				keysString = 'Press some keys...';
			}
			$activeKeys.html(keysString);
		}, 0);
	}
});
