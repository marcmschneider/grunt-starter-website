require.config({
	paths: {
		jquery: 'vendor/jquery/jquery',
		lodash: 'vendor/lodash/lodash',
		backbone: 'vendor/backbone/backbone',
		handlebars: 'vendor/handlebars/handlebars.runtime'
	},
	shim: {
		'backbone': {
			deps: ['jquery', 'lodash'],
			exports: 'Backbone'
		},
		'handlebars': {
			exports: 'Handlebars'
		},
		'app/plugins': {
			deps: ['jquery']
		}
	}
});

require(['app/app', 'app/plugins', 'helpers/browser/reset'], function (App, plugins) {
	'use strict';

	var app = new App();

	if (plugins) {
		app.init();
	}
});