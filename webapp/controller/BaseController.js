/**
 * @module BaseController
 */
sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/Device",
	"sap/ui/core/routing/History",
	"sap/ui/model/json/JSONModel",
	"sap/m/MessageBox",
	"sap/m/MessageToast"
], function (Controller, Device, History, JSONModel, MessageBox, MessageToast) {
	"use strict";

	return Controller.extend("Managment.Dashboard.controller.BaseController", {

		/**
		 * Convenience method for accessing the router in every controller of the application.
		 * @public
		 * @returns {sap.ui.core.routing.Router} the router for this component
		 */
		getRouter: function () {
			return this.getOwnerComponent().getRouter();
		},

		/**
		 * Convenience method for getting the view model by name in every controller of the application.
		 * @public
		 * @param {string} sName the model name
		 * @returns {sap.ui.model.Model} the model instance
		 */
		getModel: function (sName) {
			return this.getOwnerComponent().getModel(sName);
		},

		/**
		 * Convenience method for setting the view model in every controller of the application.
		 * @public
		 * @param {sap.ui.model.Model} oModel the model instance
		 * @param {string} sName the model name
		 * @returns {sap.ui.mvc.View} the view instance
		 */
		setModel: function (oModel, sName) {
			return this.getOwnerComponent().setModel(oModel, sName);
		},

		/**
		 * Convenience method for getting the resource bundle.
		 * @public
		 * @returns {sap.ui.model.resource.ResourceModel} the resourceModel of the component
		 */

		getResourceBundle: function () {
			return this.getOwnerComponent().getModel("i18n").getResourceBundle();
		},
		/**
		 * Convenience method for getting the resource bundle.
		 * @public
		 * @returns {sap.ui.model.resource.ResourceModel} the resourceModel of the component
		 */

		getEventBus: function () {
			return sap.ui.getCore().getEventBus();
		},
		/**
		 * Event handler for navigating back.
		 * It there is a history entry we go one step back in the browser history
		 * If not, it will replace the current entry of the browser history with the master route.
		 * @public
		 */

		onNavBack: function () {
			var sPreviousHash = History.getInstance().getPreviousHash();
			if (sPreviousHash !== undefined) {
				history.go(-1);
			} else {
				this.getRouter().navTo("RouteMain", {}, true);
			}
		},

		formatDate: function (date) { // format to yyyy-mm-ddTHH:MM:SS
			return date.getFullYear() + ("0" + (date.getMonth() + 1)).slice(-2) + ("0" + date.getDate()).slice(-2) + " " + ("0" +
				date.getHours()).slice(-2) + ":" + (
				"0" + date.getMinutes()).slice(-2) + ":" + ("0" + date.getSeconds()).slice(-
				2);
		},

		onCreatId: function (sTag, sSVG) {
			var oTag = document.querySelector('[id*="' + sSVG + '"]').querySelectorAll(sTag);
			for (var i = 0; i < oTag.length; i++) {
				var sFillUrl = oTag[i].getAttribute("fill");
				if (sFillUrl && sFillUrl.indexOf("url(#") !== -1) {
					var sFillId = sFillUrl.substring(5).replace(")", "");
					oTag[i].setAttribute("fill", "url(#" + this.createId(sFillId) + ")");
				}
				var sFilterUrl = oTag[i].getAttribute("filter");
				if (sFilterUrl && sFilterUrl.indexOf("url(#") !== -1) {
					var sFilterId = sFilterUrl.substring(5).replace(")", "");
					oTag[i].setAttribute("filter", "url(#" + this.createId(sFilterId) + ")");
				}
				var sStrokeUrl = oTag[i].getAttribute("stroke");
				if (sStrokeUrl && sStrokeUrl.indexOf("url(#") !== -1) {
					var sStrokeId = sStrokeUrl.substring(5).replace(")", "");
					oTag[i].setAttribute("stroke", "url(#" + this.createId(sStrokeId) + ")");
				}
				var sMaskUrl = oTag[i].getAttribute("mask");
				if (sMaskUrl && sMaskUrl.indexOf("url(#") !== -1) {
					var sMaskId = sMaskUrl.substring(5).replace(")", "");
					oTag[i].setAttribute("stroke", "url(#" + this.createId(sMaskId) + ")");
				}
				var sHref = oTag[i].getAttribute("xlink:href");
				if (sHref && sHref.indexOf("#") !== -1) {
					var sPathId = sHref.substring(1);
					oTag[i].setAttribute("xlink:href", "#" + this.createId(sPathId) + "");
				}

			}
		},

		/**
		 * 该方法接受如下数据结构
		 * var arrMotionSVG = [{
		 *     id: 'motion-sphere-01', // 索引元素的 ID, 并将以此 ID 创建 Animation-Name
		 *     aniLength: 8, // 动画总长度, 单位为 s,
		 *     aniDelay: 0, // 延时开始动画, 单位 s, 可选, 默认为 0
		 *     aniFn: 'linear', // 动画函数, 可选, 默认为 linear,https://developer.mozilla.org/en-US/docs/Web/CSS/animation-timing-function
		 *     pathCoord: [
		 *          {
		 *			    left: 750, // 指定元素的初始位置, 作为 keyFrames 的第 1 个帧, 以此类推
		 *			    top: 230,
		 *			    opacity: 0 // 不透明度, 可选, 默认为 1
		 *		    }... // pathCoord 至少需要两个元素, 否则将于 console 报错
		 *	   ]
		 * }]
		 * @param arrMotionSVG {Array}
		 */
		motionSvg: function (arrMotionSVG) {
			arrMotionSVG.forEach(function (svgConf) {
				if (svgConf.pathCoord.length < 2) {
					console.error('pathCoord 数组长度至少为 2');
					return
				}

				var svgEl = document.querySelector('[id$="' + svgConf.id + '"]'),
					keyframesEl = document.createElement('style'),
					keyFramesStyle = '@keyframes ' + svgConf.id + ' { ';

				svgEl.style.transform = 'translate(' + svgConf.pathCoord[0].left + 'px,' + svgConf.pathCoord[0].top + 'px)';

				for (var i = 0; i < svgConf.pathCoord.length; i++) {
					keyFramesStyle += (100 * (i / (svgConf.pathCoord.length - 1))).toFixed(2) +
						'% { transform: translate(' +
						svgConf.pathCoord[i].left + 'px, ' +
						svgConf.pathCoord[i].top + 'px); ' +
						'opacity: ' + (svgConf.pathCoord[i].opacity === undefined ? 1 : svgConf.pathCoord[i].opacity) + ' } '
				}
				keyFramesStyle += '}';
				keyframesEl.innerHTML = keyFramesStyle;
				document.head.appendChild(keyframesEl);

				svgEl.style.animation = svgConf.aniLength + 's ' +
					(svgConf.aniFn ? svgConf.aniFn : 'linear') + ' ' +
					(svgConf.aniDelay ? svgConf.aniDelay : 0) +
					's infinite normal none running ' +
					svgConf.id;
			});
		},

		/**
		 * 该方法接受如下数据结构
		 * var arrTooltipConf = [{
		 *     id: 'Group-11-Copy-9', // 触发显示 tooltip 的元素 ID
		 *     data: [[1, 2]...] // 二维数组用于填充表格
		 *     option: {...} // Tippy all options: https://atomiks.github.io/tippyjs/all-options/
		 * }...]
		 * @param arrTooltipConf {Array}
		 */
		tooltip: function (arrTooltipConf) {
			arrTooltipConf.forEach(function (tooltipConf) {
				var el = document.querySelector('[id$="' + tooltipConf.id + '"]'),
					content = '';

				if (tooltipConf.data && tooltipConf.data.length) {
					tooltipConf.data.forEach(function (arr) {
						content += '<tr><td align="left"\; style="color: ' + (arr[0].color ? arr[0].color : 'inherit') +
							'\; padding-right: 15px\;">' +
							arr[0].text +
							'</td><td align="right"\; style="color: ' + (arr[1].color ? arr[1].color : 'inherit') +
							'\; padding-left: 15px\;">' +
							arr[1].text + '</td></tr>'
					});
					content = '<table style="font-size: 120%\;">' + content + '</table>';
					tooltipConf.option.content = content;
				}
				try {
					el.addEventListener("mouseover", function () {
						el.style.cursor = 'pointer';
						tippy(el, tooltipConf.option)
					});
				} catch (err) {
					console.error(err)
				}
			})
		},

		onFilter: function (oEvent) {
			// create popover
			if (!this._oPopover) {
				this._oPopover = sap.ui.xmlfragment("Managment.Dashboard.view.FilterPopover", this);
				this.getView().addDependent(this._oPopover);
				// this._oPopover.bindElement("/ProductCollection/0");
			}
			this._oPopover.openBy(oEvent.getSource());
		},

		_random: function (min, max) {
			var imax = 0;
			var imin = 0;
			if (min > max) {
				imax = min;
				imin = max;
			} else {
				imax = max;
				imin = min;
			}
			return Math.floor(Math.random() * (imax - imin)) + imin;
		},

		getFilterFactory: function (oEvent) {
			var vbox = oEvent.getSource().getParent().getParent();
			var aBtn = [];
			for (var i = 0; i < 2; i++) {
				aBtn.push.apply(aBtn, vbox.getItems()[i].getItems());
			}
			var aFactoryId = [];
			if (!aBtn[0].getPressed()) {
				for (var i = 1; i < aBtn.length; i++) {
					aBtn[i].setPressed(true);
				}
				return [];
			} else {
				for (var i = 0; i < aBtn.length; i++) {
					if (!aBtn[i].getPressed()) {
						aFactoryId.push(aBtn[i].getCustomData()[0].getValue());
					}
				}
				return aFactoryId;
			}
		}
	});
});