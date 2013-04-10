/*global define */
define(function (require) {
	'use strict';

	var $ = require('jquery');
	var _ = require('lodash');
	var Backbone = require('backbone');
	var Handlebars = require('handlebars');

	function App() {

	}

	App.prototype.init = function () {
		this.pluginSettings();

		console.log('requirejs ' + window.require.version);
		console.log('jQuery ' + $.fn.jquery);
		console.log('Lodash ' + _.VERSION);
		console.log('Backbone ' + Backbone.VERSION);
		console.log('Handlebars ' + Handlebars.VERSION);
		console.log('jquery.transit ' + $.transit.version);
	};

	App.prototype.pluginSettings = function () {
		// Delegate .transition() calls to .animate()
		// if the browser can't do CSS transitions.
		if (!$.support.transition) {
			$.fn.transition = $.fn.animate;
		}
	};

	return App;
});