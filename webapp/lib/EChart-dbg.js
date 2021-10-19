sap.ui.define([
	"sap/ui/core/Control",
	"sap/ui/base/ManagedObject",
	"./vendor/echart/echarts-min",
	"./vendor/echart/bmap",
	"./vendor/echart/theme"
], function (Control) {
	"use strict";
	return Control.extend("sap.vco.EChart", {
		//private attribute
		_eChart: undefined,
		_option: undefined,
		_echartEventCallBack: undefined,
		_firstEchartRender: true,

		//metadata
		metadata: {
			properties: {
				width: {
					type: 'sap.ui.core.CSSSize',
					defaultValue: '100%'
				},
				height: {
					type: 'sap.ui.core.CSSSize',
					defaultValue: '100%'
				},
				margin: {
					type: 'int',
					defaultValue: 16
				},
				responsive: {
					type: "boolean",
					defaultValue: true
				},
				option: {
					type: "object",
					defaultValue: null,
					bindable: "bindable"
				},

				chartType: {
					type: "string",
					defaultValue: "Line"
				}
			},
			events: {
				"afterEchartInit": {},
				"afterResize": {}
			}
		},

		//hook method
		init: function () {
			// this handler is used to resize
			this._handlers = {
				'resize': null
			};

			this._resourceLoaded = Boolean(echarts);

			// Set timeout to assure applySetting done
			setTimeout(function () {
				if (!this.getUIArea()) {
					this._render();
				}
			}.bind(this), 0);
		},

		destroy: function () {
			if (this.__eChart) {
				this.__eChart.dispose();
			}
			Control.prototype.destroy.apply(this, arguments);
		},
		renderer: function (oRm, oControl) {
			oRm.write("<DIV ");
			oRm.writeControlData(oControl);
			oRm.addClass("echartContainer");
			oRm.writeClasses();
			if (oControl.getWidth()) {
				oRm.addStyle("width", oControl.getWidth());
			} else {
				oRm.addStyle("width", "100%");
			}
			if (oControl.getHeight()) {
				oRm.addStyle("height", oControl.getHeight());
			} else {
				oRm.addStyle("height", "100%");
			}
			oRm.writeStyles();
			oRm.write("><DIV class='echartFrame' height='100%' width='100%'/>");
			oRm.write(
				'<DIV class="ui5-viz-controls-viz-description" tabindex="-1"><DIV class="ui5-viz-controls-viz-description-title"></DIV></DIV>');
			oRm.write("</DIV>");
		},

		attachBindEChartEvent: function (callBack) {
			this.bindEchartEvent(callBack);
		},

		bindEchartEvent: function (callBack) {
			if (typeof (callBack) === 'function') {
				this._echartEventCallBack = callBack;
			}
		},

		onAfterRendering: function () {
			this._render();
		},

		getFrame: function () {
			return this.$().find(".echartFrame");
		},

		getEChart: function () {
			// only init when container in right size
			if ((!this.__eChart || this.__eChart.isDisposed()) && this._validateSize()) {
				this.initEChart();
			}
			return this.__eChart;
		},

		initEChart: function () {
			var frame = this.getFrame()[0],
				_margins = this.getMargin() * 2;
			this.__eChart = echarts.init(frame, 'theme', {
				height: this.$().height() - _margins,
				width: this.$().width() - _margins
			});
			// apply Options when init with options
			if (this.getOption()) {
				this.setOption(this.getOption());
			}

			this.fireAfterEchartInit();
			return this.__eChart;
		},

		// private
		_render: function () {
			if (this._resourceLoaded && this.getDomRef()) {
				if (this.getResponsive()) {
					this._register();
					setTimeout(this.resizeChart.bind(this), 0);
				}
				if (this.__eChart) {
					var dom = this.__eChart.getDom();
					this.getFrame().append(dom);
				}
			}
		},

		_register: function () {
			this._deregister();
			this._handlers.resize = sap.ui.core.ResizeHandler.register(
				this.getDomRef(), jQuery.proxy(this.resizeChart, this));
		},

		_deregister: function () {
			if (this._handlers.resize) {
				sap.ui.core.ResizeHandler.deregister(this._handlers.resize);
			}
			this._handlers.resize = null;
		},

		resizeChart: function () {
			// wait reload cloud for 1s, during which if the event is triggered again, clear the previous timer.
			if (this._validateSize()) {
				if (this._resizingTimeFlag) {
					clearTimeout(this._resizingTimeFlag);
				}
				this._resizingTimeFlag = setTimeout(
					function () {
						this._resizingTimeFlag = null;
						var containerDom = this.$();
						var _margins = this.getMargin() * 2;
						var height = containerDom.height() - _margins,
							width = containerDom.width() - _margins;

						this.getFrame().height(height).width(width);
						this.getEChart().resize({
							width: width,
							height: height
						});
						this.fireAfterResize();
					}.bind(this), 1000);
			}
		},

		_validateSize: function () {
			var domRef = this.getDomRef();
			if (!domRef) {
				return null;
			}
			var height = this.$().height(),
				width = this.$().width(),
				_margin = this.getMargin();

			if (domRef.offsetHeight < _margin || domRef.offsetWidth < _margin || height < _margin || width < _margin) {
				return null;
			}
			return true;
		},

		setOption: function (option) {
			var oEchart = this.getEChart();
			if (oEchart && option) {
				this.$().find(".ui5-viz-controls-viz-description").css("display", "none");
				oEchart.setOption(option, option.clear);
				this.setProperty("option", oEchart.getOption(), option.clear);
				delete option.clear;
			} else {
				this.setProperty("option", option, true);
				this.$().find(".ui5-viz-controls-viz-description").css("display", "block");
			}
		}
	});
});