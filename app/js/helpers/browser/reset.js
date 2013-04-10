/*global define */
define(function (require) {
	'use strict';

	var $ = require('jquery');

	// remove osx bounce top behavior
	if (navigator.appVersion.match(/mac/i)) {

		$(window).bind('mousewheel', function (e) {
			var y = e.originalEvent.wheelDeltaY || 0;
			var top = $(this).scrollTop();

			if (y > 0 && top <= 0) {
				e.preventDefault();
			}
		});

	}

	return true;
});