/*global define */
define(['backbone', 'lodash'], function (Backbone, _) {
	'use strict';

	var Vent = _.extend({}, Backbone.Events);

	return Vent;
});