require.config({
	paths: {
		jquery: 'vendor/jquery/jquery',
		lodash: 'vendor/lodash/lodash',
		backbone: 'vendor/backbone/backbone'
	},
	shim: {
		backbone: {
			deps: ['jquery', 'lodash'],
			exports: 'Backbone'
		}
	}
});

require(['jquery', 'lodash', 'backbone', 'app/app'], function ($, _, Backbone, App) {
	'use strict';

	console.log('requirejs ' + window.require.version);
	console.log('jQuery ' + $.fn.jquery);
	console.log('Lodash ' + _.VERSION);
	console.log('Backbone ' + Backbone.VERSION);

	console.log(App);
});