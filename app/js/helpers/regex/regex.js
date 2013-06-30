/*global define */
define(function () {
	'use strict';

	function Regex () {

	}

	Regex.prototype.inQuotes = function (str) {
		return str.match(/("|')(\\?.)*?\1/g);
	};

	Regex.prototype.isDate = function (date) {
		if (date.match(/^\d{4}-(0\d|1[0-2])-([0-2]\d|3[01])$/)) {
			return true;
		}
		return false;
	};

	Regex.prototype.isNumber = function (str) {
		if (str.match(/^[-+]?\d*\.?\d+$/)) {
			return true;
		}
		return false;
	};

	Regex.prototype.wordCount = function (str) {
		return str.split(/\s+/).length;
	};

	Regex.prototype.isHexColor = function (hexColor) {
		if (hexColor.match(/^#[0-9a-f]{3,6}$/i)) {
			return true;
		}
		return false;
	};

	Regex.prototype.stripHtml = function (str) {
		return str.replace(/<[^>]+>/g, '');
	};

	Regex.prototype.trimmString = function (str) {
		return str.replace(/^\s+|\s+$/g, '');
	};

	return Regex;
});