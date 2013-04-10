/*global define */
define(function () {
	'use strict';

	function CloseViews(views) {
		this.Views = views;
	}

	CloseViews.prototype.close = function () {
		var viewsLength = this.keys(this.Views).length;

		for (var i = 0; i < viewsLength; i++) {
			var viewName = this.keys(this.Views)[0];
			this.Views[viewName].remove();

			if (this.Views[viewName].closeSubViews) {
				this.Views[viewName].closeSubViews();
			}

			delete this.Views[viewName];
		}

	};

	CloseViews.prototype.keys = function (o) {
		var result = [];

		for (var name in o) {
			if (o.hasOwnProperty(name)) {
				result.push(name);
			}
		}
		return result;
	};

	return CloseViews;
});