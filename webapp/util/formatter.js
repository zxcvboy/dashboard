sap.ui.define([], function () {
	'use strict';

	return {
		formatPercent2: function (num) {
			if (num) {
				return Math.round(num * 100) / 100;
			} else {
				return ""
			}
		},

		formatPercent3: function (num) {
			if (num) {
				return Math.round(num * 1000) / 1000;
			} else {
				return ""
			}
		},

		formatColorSox: function (sVal) {
			if (sVal) {
				if (sVal >= 0 && sVal < 80) {
					return "Success";
				} else if (sVal >= 80 && sVal < 100) {
					return "Warning";
				} else {
					return "Error";
				}
			} else {
				return "None";
			}
		},

		formatColorNox: function (sVal) {
			if (sVal) {
				if (sVal >= 0 && sVal < 280) {
					return "Success";
				} else if (sVal >= 280 && sVal < 320) {
					return "Warning";
				} else {
					return "Error";
				}
			} else {
				return "None";
			}
		},

		formatColorBulletNox: function (sVal) {
			if (sVal) {
				if (sVal >= 0 && sVal < 280) {
					return "Good";
				} else if (sVal >= 280 && sVal < 320) {
					return "Critical";
				} else {
					return "Error";
				}
			} else {
				return "Critical";
			}
		},

		formatColorBulletCo2: function (sVal) {
			if (sVal) {
				if (sVal >= 0 && sVal < 0.8) {
					return "Good";
				} else if (sVal >= 0.80 && sVal < 0.87) {
					return "Critical";
				} else {
					return "Error";
				}
			} else {
				return "Critical";
			}
		},

		formatThousand2: function (num) { //千分位表示
			if (num) {
				if (String(num).indexOf('.') > -1) {
					return String(num.toFixed(2)).replace(/(\d{1,3})(?=(\d{3})+(?:$|\.))/g, "$1,");
				} else {
					return String(num).replace(/(\d{1,3})(?=(\d{3})+(?:$|\.))/g, "$1,");
				}
			} else {
				return '';
			}
		},
		formatThousand: function (inum) { //转换千吨并保留两位小数
		
			
			if (inum) {
				var num = Math.round(inum / 1000 * 100) / 100;
				if (String(num).indexOf('.') > -1) {
					return String(num.toFixed(2)).replace(/(\d{1,3})(?=(\d{3})+(?:$|\.))/g, "$1,");
				} else {
					return String(num).replace(/(\d{1,3})(?=(\d{3})+(?:$|\.))/g, "$1,");
				}
			} else {
				return '';
			}
		}
	};
});