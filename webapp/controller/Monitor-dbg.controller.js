sap.ui.define([
	"Managment/Dashboard/controller/BaseController",
	"Managment/Dashboard/util/PAmodel",
	"Managment/Dashboard/util/formatter"
], function (BaseController, PAmodel,formatter) {
	"use strict";

	return BaseController.extend("Managment.Dashboard.controller.Monitor", {
		formatter: formatter,
		onInit: function () {
			this.getView().setModel(new sap.ui.model.json.JSONModel({
				"degreeOption": {},
				"caveOption": {},
				"simulateNOx": {
					input1: 877.00,
					input2: 0.60,
					input3: 340.00,
					input4: 429.00,
					input5: 0.85,
					predictValue: 280.12,
					simOpt: {},
					simHistoryOpt: {}
				},
				"simulateSOx": {
					input1: 877.00,
					input2: 0.60,
					input3: 340.00,
					input4: 429.00,
					input5: 0.85,
					predictValue: 280.12,
					simOpt: {},
					simHistoryOpt: {}
				},
				"showModel": true,
				"modelHistory": [{
					Date: "2019-04-25 15:11:14",
					Target: "234.23",
					NH3: "0.667",
					Degree: "877.23",
					NOX: "231.34",
					MAT: "429.94",
					NH3AVG: "0.665"
				}, {
					Date: "2019-04-25 15:21:00",
					Target: "234.20",
					NH3: "0.666",
					Degree: "876.23",
					NOX: "232.34",
					MAT: "429.04",
					NH3AVG: "0.664"
				}, {
					Date: "2019-04-25 16:32:15",
					Target: "235.23",
					NH3: "0.664",
					Degree: "878.23",
					NOX: "231.39",
					MAT: "424.94",
					NH3AVG: "0.666"
				}, {
					Date: "2019-04-25 16:43:18",
					Target: "234.63",
					NH3: "0.669",
					Degree: "877.73",
					NOX: "231.64",
					MAT: "427.94",
					NH3AVG: "0.667"
				}],
				"output": 8290,
				"HTML":'<p style="color:#00FFFE; font-size:18px;">鍛燒爐溫度持續增加 NOx 從 <strong style="color:#ffffff; font-size:18px;">280 增加到 340 </strong></p><p style="color:#00FFFE; font-size:18px;">建議氨水量由 <strong style="color:#ffffff; font-size:18px;">0.60 調整 0.85 </strong></p><p style="color:#00FFFE; font-size:18px;">預測未来<strong style="color:#ffffff; font-size:18px;"> 4-6分鐘 </strong>NOx由<strong style="color:#ffffff; font-size:18px;"> 340 降到 280.12</strong></p>',
				"HTMLTemp":'<p style="color:#00FFFE; font-size:18px;">1. 建議XXXX</p><p style="color:#00FFFE; font-size:18px;">2. 建議XXXX</p>'

			}));
			this.getView().setModel(new sap.ui.model.json.JSONModel(), "caveChartData");
			this.getRouter().getRoute("RouteMonitor").attachMatched(this._onRouteMatched, this);

		},

		onAfterRendering: function () {
			var _this = this;
			this.iCycleInd = 1;
			this.updateCaveModel();
			this.getModel("app").setProperty("/showPageHeader", true);
			this.getModel("app").setProperty("/pageTitle", "英德廠設備參數");
			this.onCreatId("g", "MonitorSVGId");
			this.onCreatId("polygon", "MonitorSVGId");
			this.onCreatId("ellipse", "MonitorSVGId");
			this.onCreatId("use", "MonitorSVGId");
			this.onCreatId("path", "MonitorSVGId");
			this.onCreatId("circle", "MonitorSVGId");
			this.onCreatId("rect", "MonitorSVGId");

			// SVG Motion Animation
			var arrMotionSVG = [{
				"aniLength": 8,
				"id": "motion-sphere-01",
				"pathCoord": [{
					"left": 816,
					"top": 600,
					"opacity": 0
				}, {
					"left": 814,
					"top": 518
				}, {
					"left": 729,
					"top": 518
				}, {
					"left": 728,
					"top": 447
				}, {
					"left": 816,
					"top": 446
				}, {
					"left": 816,
					"top": 375
				}, {
					"left": 728,
					"top": 374
				}, {
					"left": 729,
					"top": 304
				}, {
					"left": 816,
					"top": 301
				}, {
					"left": 816,
					"top": 230
				}, {
					"left": 750,
					"top": 230,
					"opacity": 0
				}]
			}, {
				"aniLength": 8.8,
				"id": "motion-sphere-02",
				"pathCoord": [{
					"left": 816,
					"top": 600,
					"opacity": 0
				}, {
					"left": 816,
					"top": 600,
					"opacity": 0
				}, {
					"left": 814,
					"top": 518
				}, {
					"left": 729,
					"top": 518
				}, {
					"left": 728,
					"top": 447
				}, {
					"left": 816,
					"top": 446
				}, {
					"left": 816,
					"top": 375
				}, {
					"left": 728,
					"top": 374
				}, {
					"left": 729,
					"top": 304
				}, {
					"left": 816,
					"top": 301
				}, {
					"left": 816,
					"top": 230
				}, {
					"left": 750,
					"top": 230,
					"opacity": 0
				}]
			}, {
				"aniLength": 9.6,
				"id": "motion-sphere-03",
				"pathCoord": [{
					"left": 816,
					"top": 600,
					"opacity": 0
				}, {
					"left": 816,
					"top": 600,
					"opacity": 0
				}, {
					"left": 816,
					"top": 600,
					"opacity": 0
				}, {
					"left": 814,
					"top": 518
				}, {
					"left": 729,
					"top": 518
				}, {
					"left": 728,
					"top": 447
				}, {
					"left": 816,
					"top": 446
				}, {
					"left": 816,
					"top": 375
				}, {
					"left": 728,
					"top": 374
				}, {
					"left": 729,
					"top": 304
				}, {
					"left": 816,
					"top": 301
				}, {
					"left": 816,
					"top": 230
				}, {
					"left": 750,
					"top": 230,
					"opacity": 0
				}]
			}, {
				"aniLength": 10.4,
				"id": "motion-sphere-04",
				"pathCoord": [{
					"left": 816,
					"top": 600,
					"opacity": 0
				}, {
					"left": 816,
					"top": 600,
					"opacity": 0
				}, {
					"left": 816,
					"top": 600,
					"opacity": 0
				}, {
					"left": 816,
					"top": 600,
					"opacity": 0
				}, {
					"left": 814,
					"top": 518
				}, {
					"left": 729,
					"top": 518
				}, {
					"left": 728,
					"top": 447
				}, {
					"left": 816,
					"top": 446
				}, {
					"left": 816,
					"top": 375
				}, {
					"left": 728,
					"top": 374
				}, {
					"left": 729,
					"top": 304
				}, {
					"left": 816,
					"top": 301
				}, {
					"left": 816,
					"top": 230
				}, {
					"left": 750,
					"top": 230,
					"opacity": 0
				}]
			}, {
				"aniLength": 11.2,
				"id": "motion-sphere-05",
				"pathCoord": [{
					"left": 816,
					"top": 600,
					"opacity": 0
				}, {
					"left": 816,
					"top": 600,
					"opacity": 0
				}, {
					"left": 816,
					"top": 600,
					"opacity": 0
				}, {
					"left": 816,
					"top": 600,
					"opacity": 0
				}, {
					"left": 816,
					"top": 600,
					"opacity": 0
				}, {
					"left": 814,
					"top": 518
				}, {
					"left": 729,
					"top": 518
				}, {
					"left": 728,
					"top": 447
				}, {
					"left": 816,
					"top": 446
				}, {
					"left": 816,
					"top": 375
				}, {
					"left": 728,
					"top": 374
				}, {
					"left": 729,
					"top": 304
				}, {
					"left": 816,
					"top": 301
				}, {
					"left": 816,
					"top": 230
				}, {
					"left": 750,
					"top": 230,
					"opacity": 0
				}]
			}, {
				"aniLength": 9,
				"id": "motion-sphere-06",
				"pathCoord": [{
					"left": 828,
					"top": 600,
					"opacity": 0
				}, {
					"left": 830,
					"top": 519
				}, {
					"left": 980,
					"top": 518
				}, {
					"left": 980,
					"top": 446
				}, {
					"left": 900,
					"top": 446
				}, {
					"left": 900,
					"top": 374
				}, {
					"left": 989,
					"top": 374
				}, {
					"left": 988,
					"top": 302
				}, {
					"left": 900,
					"top": 302
				}, {
					"left": 901,
					"top": 230
				}, {
					"left": 970,
					"top": 230,
					"opacity": 0
				}]
			}, {
				"aniLength": 9.9,
				"id": "motion-sphere-07",
				"pathCoord": [{
					"left": 828,
					"top": 600,
					"opacity": 0
				}, {
					"left": 828,
					"top": 600,
					"opacity": 0
				}, {
					"left": 830,
					"top": 519
				}, {
					"left": 980,
					"top": 518
				}, {
					"left": 980,
					"top": 446
				}, {
					"left": 900,
					"top": 446
				}, {
					"left": 900,
					"top": 374
				}, {
					"left": 989,
					"top": 374
				}, {
					"left": 988,
					"top": 302
				}, {
					"left": 900,
					"top": 302
				}, {
					"left": 901,
					"top": 230
				}, {
					"left": 970,
					"top": 230,
					"opacity": 0
				}]
			}, {
				"aniLength": 10.8,
				"id": "motion-sphere-08",
				"pathCoord": [{
					"left": 828,
					"top": 600,
					"opacity": 0
				}, {
					"left": 828,
					"top": 600,
					"opacity": 0
				}, {
					"left": 828,
					"top": 600,
					"opacity": 0
				}, {
					"left": 830,
					"top": 519
				}, {
					"left": 980,
					"top": 518
				}, {
					"left": 980,
					"top": 446
				}, {
					"left": 900,
					"top": 446
				}, {
					"left": 900,
					"top": 374
				}, {
					"left": 989,
					"top": 374
				}, {
					"left": 988,
					"top": 302
				}, {
					"left": 900,
					"top": 302
				}, {
					"left": 901,
					"top": 230
				}, {
					"left": 970,
					"top": 230,
					"opacity": 0
				}]
			}, {
				"aniLength": 11.7,
				"id": "motion-sphere-09",
				"pathCoord": [{
					"left": 828,
					"top": 600,
					"opacity": 0
				}, {
					"left": 828,
					"top": 600,
					"opacity": 0
				}, {
					"left": 828,
					"top": 600,
					"opacity": 0
				}, {
					"left": 828,
					"top": 600,
					"opacity": 0
				}, {
					"left": 830,
					"top": 519
				}, {
					"left": 980,
					"top": 518
				}, {
					"left": 980,
					"top": 446
				}, {
					"left": 900,
					"top": 446
				}, {
					"left": 900,
					"top": 374
				}, {
					"left": 989,
					"top": 374
				}, {
					"left": 988,
					"top": 302
				}, {
					"left": 900,
					"top": 302
				}, {
					"left": 901,
					"top": 230
				}, {
					"left": 970,
					"top": 230,
					"opacity": 0
				}]
			}, {
				"aniLength": 12.6,
				"id": "motion-sphere-10",
				"pathCoord": [{
					"left": 828,
					"top": 600,
					"opacity": 0
				}, {
					"left": 828,
					"top": 600,
					"opacity": 0
				}, {
					"left": 828,
					"top": 600,
					"opacity": 0
				}, {
					"left": 828,
					"top": 600,
					"opacity": 0
				}, {
					"left": 828,
					"top": 600,
					"opacity": 0
				}, {
					"left": 830,
					"top": 519
				}, {
					"left": 980,
					"top": 518
				}, {
					"left": 980,
					"top": 446
				}, {
					"left": 900,
					"top": 446
				}, {
					"left": 900,
					"top": 374
				}, {
					"left": 989,
					"top": 374
				}, {
					"left": 988,
					"top": 302
				}, {
					"left": 900,
					"top": 302
				}, {
					"left": 901,
					"top": 230
				}, {
					"left": 970,
					"top": 230,
					"opacity": 0
				}]
			}, {
				"aniLength": 2,
				"id": "motion-green-1",
				"pathCoord": [{
					"left": 837,
					"top": 194
				}, {
					"left": 837,
					"top": 242
				}, {
					"left": 819,
					"top": 260
				}]
			}, {
				"aniLength": 2.5,
				"id": "motion-green-2",
				"pathCoord": [{
					"left": 817,
					"top": 356
				}, {
					"left": 834,
					"top": 374
				}, {
					"left": 834,
					"top": 406
				}, {
					"left": 817,
					"top": 420
				}]
			}, {
				"aniLength": 3,
				"id": "motion-green-3",
				"pathCoord": [{
					"left": 815,
					"top": 500
				}, {
					"left": 815,
					"top": 510
				}, {
					"left": 875,
					"top": 555
				}]
			}, {
				"aniLength": 3,
				"id": "motion-green-4",
				"pathCoord": [{
					"left": 711,
					"top": 285
				}, {
					"left": 711,
					"top": 345
				}, {
					"left": 728,
					"top": 359
				}]
			}, {
				"aniLength": 3,
				"id": "motion-green-5",
				"pathCoord": [{
					"left": 745,
					"top": 285
				}, {
					"left": 745,
					"top": 345
				}, {
					"left": 728,
					"top": 359
				}]
			}, {
				"aniLength": 4.5,
				"id": "motion-green-6",
				"pathCoord": [{
					"left": 729,
					"top": 572
				}, {
					"left": 729,
					"top": 645
				}, {
					"left": 809,
					"top": 692
				}]
			}, {
				"aniLength": 2,
				"id": "motion-green-7",
				"pathCoord": [{
					"left": 879,
					"top": 194
				}, {
					"left": 879,
					"top": 242
				}, {
					"left": 898,
					"top": 260
				}]
			}, {
				"aniLength": 2.5,
				"id": "motion-green-8",
				"pathCoord": [{
					"left": 900,
					"top": 357
				}, {
					"left": 883,
					"top": 374
				}, {
					"left": 883,
					"top": 406
				}, {
					"left": 896,
					"top": 420
				}]
			}, {
				"aniLength": 2.5,
				"id": "motion-green-9",
				"pathCoord": [{
					"left": 308,
					"top": 174
				}, {
					"left": 308,
					"top": 280
				}]
			}, {
				"aniLength": 6,
				"id": "motion-green-10",
				"pathCoord": [{
					"left": 308,
					"top": 631
				}, {
					"left": 357,
					"top": 631
				}, {
					"left": 357,
					"top": 496
				}, {
					"left": 534,
					"top": 496
				}, {
					"left": 534,
					"top": 514
				}]
			}, {
				"aniLength": 6,
				"id": "motion-green-11",
				"pathCoord": [{
					"left": 1257,
					"top": 513
				}, {
					"left": 1257,
					"top": 545
				}, {
					"left": 912,
					"top": 545
				}]
			}, {
				"aniLength": 6,
				"id": "motion-green-12",
				"pathCoord": [{
					"left": 1538,
					"top": 891
				}, {
					"left": 1581,
					"top": 891
				}, {
					"left": 1581,
					"top": 532
				}, {
					"left": 1765,
					"top": 532
				}, {
					"left": 1765,
					"top": 560
				}]
			}, {
				"aniLength": 2,
				"id": "motion-green-13",
				"pathCoord": [{
					"left": 1146,
					"top": 190
				}, {
					"left": 1146,
					"top": 255
				}]
			}, {
				"aniLength": 6,
				"id": "motion-green-14",
				"pathCoord": [{
					"left": 447,
					"top": 689
				}, {
					"left": 663,
					"top": 689
				}, {
					"left": 663,
					"top": 194
				}, {
					"left": 879,
					"top": 194
				}]
			}, {
				"aniLength": 2,
				"id": "motion-green-15",
				"pathCoord": [{
					"left": 988,
					"top": 574
				}, {
					"left": 988,
					"top": 624
				}, {
					"left": 835,
					"top": 690
				}]
			}, {
				"aniLength": 2.5,
				"id": "motion-green-16",
				"pathCoord": [{
					"left": 1300,
					"top": 516
				}, {
					"left": 1300,
					"top": 768
				}, {
					"left": 1250,
					"top": 768
				}]
			}, {
				"aniLength": 1.8,
				"id": "motion-green-17",
				"pathCoord": [{
					"left": 308,
					"top": 631
				}, {
					"left": 357,
					"top": 631
				}, {
					"left": 357,
					"top": 496
				}, {
					"left": 465,
					"top": 496
				}, {
					"left": 465,
					"top": 514
				}]
			}, {
				"aniLength": 6.2,
				"id": "motion-green-18",
				"pathCoord": [{
					"left": 465,
					"top": 644
				}, {
					"left": 465,
					"top": 689
				}, {
					"left": 663,
					"top": 689
				}, {
					"left": 663,
					"top": 194
				}, {
					"left": 879,
					"top": 194
				}]
			}, {
				"aniLength": 3,
				"id": "motion-green-20",
				"pathCoord": [{
					"left": 972,
					"top": 285
				}, {
					"left": 972,
					"top": 344
				}, {
					"left": 983,
					"top": 355
				}]
			}, {
				"aniLength": 3,
				"id": "motion-green-21",
				"pathCoord": [{
					"left": 1007,
					"top": 285
				}, {
					"left": 1007,
					"top": 344
				}, {
					"left": 995,
					"top": 355
				}]
			}, {
				"aniLength": 2.5,
				"id": "motion-green-22",
				"pathCoord": [{
					"left": 991,
					"top": 430
				}, {
					"left": 991,
					"top": 492
				}, {
					"left": 985,
					"top": 498
				}]
			}, {
				"aniLength": 2.5,
				"id": "motion-green-23",
				"pathCoord": [{
					"left": 1276,
					"top": 388
				}, {
					"left": 1276,
					"top": 429
				}, {
					"left": 1257,
					"top": 429
				}, {
					"left": 1257,
					"top": 452
				}]
			}, {
				"aniLength": 2.5,
				"id": "motion-green-24",
				"pathCoord": [{
					"left": 1276,
					"top": 388
				}, {
					"left": 1276,
					"top": 429
				}, {
					"left": 1302,
					"top": 429
				}, {
					"left": 1302,
					"top": 452
				}]
			}, {
				"aniLength": 6,
				"id": "motion-green-25",
				"pathCoord": [{
					"left": 1538,
					"top": 891
				}, {
					"left": 1581,
					"top": 891
				}, {
					"left": 1581,
					"top": 532
				}, {
					"left": 1690,
					"top": 532
				}, {
					"left": 1690,
					"top": 560
				}]
			}];
			this.motionSvg(arrMotionSVG);

			// create tooltip
			var aDeviceUL = this.getModel("deviceUL").getData();

			var oDeviceData = {};
			for (var i = 0; i < aDeviceUL.length; i++) {
				if (aDeviceUL[i].Id === "device-TEST" || aDeviceUL[i].Id === "device-Cave") {
					continue;
				}
				if (!oDeviceData[aDeviceUL[i].Id]) {
					oDeviceData[aDeviceUL[i].Id] = [];
				}
				oDeviceData[aDeviceUL[i].Id].push([{
					text: aDeviceUL[i].Name,
					color: '#00FFFE'
				}, {
					text: formatter.formatThousand2(this._random(Number(aDeviceUL[i].L), Number(aDeviceUL[i].U))) + aDeviceUL[i].Unit,
					color: '#02FEAE'
				}])
			}
			var arrTooltipConf = [];
			for (var key in oDeviceData) {
				arrTooltipConf.push({
					id: key,
					data: oDeviceData[key],
					option: {
						animation: 'scale',
						placement: 'left',
						arrow: false,
						content: '测试内容' // 若 data 数组不为空, 则 content 失效
					}
				});
			}
			this.tooltip(arrTooltipConf);

			//create kiln-small-chart
			setTimeout(function () {
				_this.renderKilnSmallChart();
				window.onresize = function () {
					_this.renderKilnSmallChart();
				}
			}, 500);

			// bind click event
			document.getElementById(this.createId('device-C3B')).addEventListener("click", this.showDevicParameter.bind(this));
			document.getElementById(this.createId('SuggestionIncrease')).addEventListener("click", this.showSuggestion.bind(this));
			document.getElementById(this.createId('device-CaveEnd')).addEventListener("click", this.showDevicParameterNew.bind(this));
			document.getElementById(this.createId('Group-Cave')).addEventListener("click", this.showCaveParameter.bind(this));
		},

		_onRouteMatched: function () {
			this.getModel("app").setProperty("/showFilter", true);
			this.getModel("app").setProperty("/showPageHeader", true);
			this.getModel("app").setProperty("/pageTitle", "英德廠設備參數");
		},

		onNavToMap: function () {
			this.getRouter().navTo("RouteMap");
		},

		showDevicParameter: function (oEvent) {
			// var oButton = oEvent.getSource();
			if (!this.deviceParaDialog) {
				this.deviceParaDialog = sap.ui.xmlfragment("Managment.Dashboard.view.DeviceParameter", this);
				this.getView().addDependent(this.deviceParaDialog);
			}
			this.initEchartLine("idEChartNox", "month","device");
			this.initEchartLine("idEChartSox", "month","device");
			this.deviceParaDialog.open();
		},

		showDevicParameterNew: function (oEvent) {
			// var oButton = oEvent.getSource();
			if (!this.deviceParaDialogNew) {
				this.deviceParaDialogNew = sap.ui.xmlfragment("simulateFragId", "Managment.Dashboard.view.DeviceParameterNew", this);
				this.getView().addDependent(this.deviceParaDialogNew);
			}
			this.getView().getModel().setProperty("/showModel", true);
			var option = this.getSimulateChartOpt();
			this.getView().getModel().setProperty("/simulateNOx/simOpt", option);
			this.getView().getModel().setProperty("/simulateSOx/simOpt", option);
			var optionHis = this.getSimulactHistoryOpt("Degree");
			this.getView().getModel().setProperty("/simulateNOx/simHistoryOpt", optionHis);
			this.getView().getModel().setProperty("/simulateSOx/simHistoryOpt", optionHis);
			this.initEchartLine("idEChartNoxNew", "month");
			this.initEchartLine("idEChartSoxNew", "month");
			// var oICONId = sap.ui.core.Fragment.byId("simulateFragId", "PAModelIconId");
			this.deviceParaDialogNew.open();
			var arrTooltip = [];
			arrTooltip.push({
					id: sap.ui.core.Fragment.byId("simulateFragId", "PAModelIconId").getId(),
					data:[[{
					text: "設備值為綠色，設備正常運行",
					color: '#7bd269'
				}, {
					text: "",
					color: '#02FEAE'
				}],[{
					text: "設備值為橙色，設備當前運行正常，但智能模擬工具預測在未來幾分鐘後出現異常",
					color: '#F4D362'
				}, {
					text: "",
					color: '#02FEAE'
				}],[{
					text: "設備值為紅色，設備運行異常",
					color: ' #F34C70'
				}, {
					text: "",
					color: '#02FEAE'
				}]] ,
					option: {
						animation: 'scale',
						placement: 'left',
						arrow: false,
						content: '测试内容' // 若 data 数组不为空, 则 content 失效
					}
				});
			this.tooltip(arrTooltip);
		},
		showCaveParameter: function (oEvent) {
			// var oButton = oEvent.getSource();
			if (!this.caveParaDialog) {
				this.caveParaDialog = sap.ui.xmlfragment("Managment.Dashboard.view.CaveParameter", this);
				this.getView().addDependent(this.caveParaDialog);
			}
			this.initEchart();
			this.initCaveEchart();
			this.CaveInterver = setInterval(function () {
				this.updateCaveModel();
				this.initEchart();
				this.initCaveEchart();
			}.bind(this), 15 * 1000);
			this.caveParaDialog.open();
		},
		showSuggestion: function (oEvent) {
			if (!this.suggestDialog) {
				this.suggestDialog = sap.ui.xmlfragment("Managment.Dashboard.view.Suggestion", this);
				this.getView().addDependent(this.suggestDialog);
			}
		
			this.suggestDialog.open();
		},
		handleDialogClose: function (oEvent) {
			if (this.CaveInterver) {
				clearInterval(this.CaveInterver);
			}
			oEvent.getSource().getParent().close();
		},

		updateCaveModel: function () {
			var aAllData = this.getModel("caveDetailByOne").getData();
			var aData = [];
			var that = this;
			aAllData.forEach(function (i) {
				if (i.Cycle === String(that.iCycleInd) && Number(i.Angle) / 12 !== 0) {
					aData.push(i)
				}
			});
			this.getView().getModel("caveChartData").setData(aData);
			if (this.iCycleInd === 6) {
				this.iCycleInd = 1;
			} else {
				this.iCycleInd++;
			}
		},

		initEchart: function () {
			var xData = [];
			var yData = [];
			var data = [];
			var aData = this.getView().getModel("caveChartData").getData();
			for (var key in aData[0]) {
				if (key !== "Angle" && key !== "Cycle") {
					xData.push(key);
				}
			}
			for (var p = 0; p < xData.length; p++) {
				var attTemp = [];
				for (var i = 0; i < aData.length; i++) {
					attTemp.push(aData[i][xData[p]]);
				}
				var max = Math.max.apply(null, attTemp);
				var min = Math.min.apply(null, attTemp);
				var ave = (eval(attTemp.join("+")) / attTemp.length * 100) / 100;
				data.push({
					"xAxis": xData[p],
					"value": ave,
					"max": max,
					"min": min
				});
			}
			for (var k = 0; k < aData.length; k++) {
				yData.push(aData[k].Angle);
			}
			this.getView().getModel().setProperty("/degreeOption", {
				tooltip: {
					trigger: 'axis',
					axisPointer: {
						type: 'cross',
						animation: false,
						label: {
							backgroundColor: '#ccc',
							borderColor: '#aaa',
							borderWidth: 1,
							shadowBlur: 0,
							shadowOffsetX: 0,
							shadowOffsetY: 0,
							textStyle: {
								color: '#222'
							}
						}
					},
					formatter: function (params) {
						return params[2].name + ': ' + (params[2].value).toFixed(2) + '<br/> min: ' + params[0].value + '<br/> max: ' + (Number(params[0].value) + Number(params[1].value));
					}
				},
				grid: {
					left: '3%',
					right: '4%',
					bottom: '3%',
					top: "5%",
					containLabel: true,
					show: true,
					borderColor: '#04FFFB',
				},
				xAxis: {
					type: 'category',
					data: xData,
					axisLabel: {
						color: '#00FFFE',
						fontSize: 12
					},
					axisLine: {
						lineStyle: {
							color: "#00FFFE"
						},
						width: 0.5
					},
					splitLine: {
						show: true,
						lineStyle: {
							color: '#04FFFB',
							width: 0.5
						}
					}
				},
				yAxis: {
					axisLine: {
						lineStyle: {
							color: "#00FFFE"
						},
						width: 0.5
					},
					axisLabel: {
						color: '#00FFFE',
						fontSize: 12
					},
					splitLine: {
						show: true,
						lineStyle: {
							color: '#04FFFB',
							width: 0.5
						}
					}
				},
				series: [{
					name: 'L',
					// name: 'max',
					type: 'line',
					data: data.map(function (item) {
						return item.min;
					}),
					lineStyle: {
						normal: {
							opacity: 0
						}
					},
					stack: 'confidence-band',
					symbol: 'none'
				}, {
					name: 'U',
					type: 'line',
					data: data.map(function (item) {
						return item.max - item.min;
					}),
					lineStyle: {
						normal: {
							opacity: 0
						}
					},
					areaStyle: {
						normal: {
							color: '#02feae4d'
						}
					},
					stack: 'confidence-band',
					symbol: 'none'
				}, {
					type: 'line',
					data: data.map(function (item) {
						//return item.value + base;
						return item.value;
					}),
					hoverAnimation: false,
					symbolSize: 6,
					itemStyle: {
						normal: {
							color: '#02FEAE'
						}
					},
					showSymbol: false
				}]
			});
		},

		initCaveEchart: function () {
			var xData = [];
			var yData = [];
			var data = [];
			var aData = this.getView().getModel("caveChartData").getData();
			for (var key in aData[0]) {
				if (key !== "Angle" && key !== "Cycle") {
					xData.push(key);
				}
			}
			for (var k = 0; k < aData.length; k++) {
				yData.push(aData[k].Angle);
				for (var m = 0; m < xData.length; m++) {
					data.push([xData[m], aData[k].Angle, aData[k][xData[m]]]);
				}
			}

			var option = {
				tooltip: {},
				xAxis: {
					type: 'category',
					data: xData,
					axisLine: {
						lineStyle: {
							color: "#00FFFE"
						},
						width: 0.5
					},
					axisLabel: {
						color: '#00FFFE',
						fontSize: 12
					}
				},
				yAxis: {
					type: 'category',
					data: yData,
					axisLine: {
						lineStyle: {
							color: "#00FFFE"
						},
						width: 0.5
					},
					axisLabel: {
						color: '#00FFFE',
						fontSize: 12
					}
				},
				grid: {
					left: '3%',
					right: '4%',
					bottom: '3%',
					top: "5%",
					containLabel: true
				},
				visualMap: {
					min: 0,
					max: 600,
					calculable: true,
					realtime: false,
					inRange: {
						color: ['#F5DEB3', '#436EEE', '#00EE00', '#EEEE00', '#EE4000', '#EE30A7']
					},
					textStyle: {
						color: '#00FFFE',
						fontSize: 12
					},
					align: "right",
					left: 'right',
					bottom: '30%'
				},
				series: [{
					name: '溫度',
					type: 'heatmap',
					data: data,
					itemStyle: {
						emphasis: {
							borderColor: '#333',
							borderWidth: 1
						}
					},
					progressive: 1000,
					animation: false
				}]
			};
			this.getView().getModel().setProperty("/caveOption", option);
		},

		initEchartLine: function (sId, sKey,sDialog) {
			var allData = this.getModel("factoryMonitor").getData();
			var aData = [];
			if (sKey === "month") {
				aData = this.getModel("factoryMonitor").getData();
			} else if (sKey === "week") {
				var aID = ["2011", "2511", "2711", "3211"];
				for (var i = 0; i < allData.length; i++) {
					if (aID.join(",").indexOf(allData[i].ID) !== -1) {
						aData.push(allData[i]);
					}
				}
			} else {
				var aID = ["2011", "2511"];
				for (var i = 0; i < allData.length; i++) {
					if (aID.join(",").indexOf(allData[i].ID) !== -1) {
						aData.push(allData[i]);
					}
				}
			}
			var sTitle = "";
			if(sDialog){
				if (sId.indexOf("idEChartNox") !== -1) {
				sTitle = "風壓";
			} else {
				sTitle = "溫度";
			}
			}else{
				if (sId.indexOf("idEChartNox") !== -1) {
				sTitle = "Nox排放量";
			} else {
				sTitle = "Sox排放量";
			}
			}
			
			var option = {
				title: {
					text: sTitle,
					textStyle: {
						color: '#00FFFE',
						fontStyle: 'normal',
						fontWeight: "normal",
						fontSize: 12
					},
					top: "5%",
					left: "6%"
				},
				tooltip: {
					trigger: 'axis'
				},
				grid: {
					left: '3%',
					right: '4%',
					bottom: '3%',
					top: "5%",
					containLabel: true
				},
				toolbox: {
					feature: {
						saveAsImage: {}
					},
					show: false
				},
				xAxis: {
					type: 'category',
					boundaryGap: false,
					data: aData.map(function (item) {
						return item.Date;
					}),
					axisLine: {
						lineStyle: {
							color: "#00FFFE"
						},
						width: 0.5
					},
					axisLabel: {
						color: '#00FFFE',
						fontSize: 12
					}
				},
				yAxis: {
					type: 'value',
					axisLine: {
						lineStyle: {
							color: "#00FFFE"
						},
						width: 0.5
					},
					axisLabel: {
						color: '#00FFFE',
						fontSize: 12
					}
				},
				// dataZoom: [{
				// 	type: 'slider',
				// 	disabled:true
				// }],
				series: [{
					type: 'line',
					data: aData.map(function (item) {
						if (sId.indexOf("idEChartNox") !== -1) {
							return item.NOX;
						} else {
							return item.SOX;
						}
					}),
					lineStyle: {
						color: '#00feb0'
					}
				}]
			};
			if (sId.indexOf("idEChartNox") !== -1) {
				this.getView().getModel().setProperty("/noOption", option);
			} else {
				this.getView().getModel().setProperty("/soOption", option);
			}
		},

		renderKilnSmallChart: function () {
			var kilnSmallChartEl = document.querySelector('[id$="kiln-small-chart"]'),
				KilnSvgEl = document.querySelector('[id$="Group-Cave-hover"]');

			kilnSmallChartEl.style.left = (KilnSvgEl.getBoundingClientRect().left + 5) + 'px';
			kilnSmallChartEl.style.top = KilnSvgEl.getBoundingClientRect().top + 'px';
			kilnSmallChartEl.style.width = KilnSvgEl.getBoundingClientRect().width + 'px';
			kilnSmallChartEl.style.height = KilnSvgEl.getBoundingClientRect().height + 'px';

			if (!this.kilnSmallChartInstance) {
				this.kilnSmallChartInstance = echarts.init(kilnSmallChartEl);
			}
			this.kilnSmallChartInstance.setOption(this.getKilnSmallChartOpt());
			if (!this.MonitorCaveInterver) {
				this.MonitorCaveInterver = setInterval(function () {
					this.updateCaveModel();
					this.kilnSmallChartInstance.setOption(this.getKilnSmallChartOpt());
				}.bind(this), 15 * 1000);
			}
		},

		getKilnSmallChartOpt: function () {
			var xData = [],
				yData = [],
				data = [],
				aData = this.getView().getModel("caveChartData").getData();
			for (var key in aData[0]) {
				if (key !== "Angle" && key !== "Cycle") {
					xData.push(key);
				}
			}
			for (var k = 0; k < aData.length; k++) {
				yData.push(aData[k].Angle);
				for (var m = 0; m < xData.length; m++) {
					data.push([xData[m], aData[k].Angle, aData[k][xData[m]]]);
				}
			}

			return {
				tooltip: {},
				xAxis: {
					type: 'category',
					show: false,
					data: xData,
					axisLine: {
						lineStyle: {
							color: "#00FFFE"
						},
						width: 0.5
					},
					axisLabel: {
						color: '#00FFFE',
						fontSize: 12
					}
				},
				yAxis: {
					type: 'category',
					show: false,
					data: yData,
					axisLine: {
						lineStyle: {
							color: "#00FFFE"
						},
						width: 0.5
					},
					axisLabel: {
						color: '#00FFFE',
						fontSize: 12
					}
				},
				grid: {
					left: 0,
					right: 0,
					bottom: 0,
					top: 0
				},
				visualMap: {
					show: false,
					min: 0,
					max: 600,
					calculable: true,
					realtime: false,
					inRange: {
						color: ['#F5DEB3', '#436EEE', '#00EE00', '#EEEE00', '#EE4000', '#EE30A7']
					},
					textStyle: {
						color: '#00FFFE',
						fontSize: 12
					},
					align: "right",
					left: 'right',
					bottom: '30%'
				},
				series: [{
					name: '溫度',
					type: 'heatmap',
					data: data,
					itemStyle: {
						emphasis: {
							borderColor: '#333',
							borderWidth: 1
						}
					},
					progressive: 1000,
					animation: false
				}]
			};
		},
		onSelect: function (oEvent) {
			var sKey = oEvent.getSource().getSelectedKey();
			this.initEchartLine("idEChartNox", sKey);
			this.initEchartLine("idEChartSox", sKey);
		},
		onPressSimulate: function (oEvent) {
			var oKey = sap.ui.core.Fragment.byId("simulateFragId", "simulateIconTabBar").getSelectedKey();
			var score;
			var lInputs = new Array(5);
			var lAllInputs = new Array(5);

			score = 0.0;
			if (oKey === "nox") {
				var oInput = this.getView().getModel().getProperty("/simulateNOx");
			} else {
				var oInput = this.getView().getModel().getProperty("/simulateSOx");

			}
			score += PAmodel.Kxen_RobustRegression_0_KxVar1(oInput.input1);
			score += PAmodel.Kxen_RobustRegression_0_KxVar2(oInput.input2);
			score += PAmodel.Kxen_RobustRegression_0_KxVar3(oInput.input3);
			score += PAmodel.Kxen_RobustRegression_0_KxVar4(oInput.input4);
			score += PAmodel.Kxen_RobustRegression_0_KxVar5(oInput.input5);
			var zscore = PAmodel.Extra_0_KxVar0(score);
			oInput.predictValue = Number(zscore.toFixed(2));
			var option = this.getSimulateChartOpt();
			this.getView().getModel().setProperty("/simulateNOx/simOpt", option);
			this.getView().getModel().refresh();
		},
		getSimulateChartOpt: function () {
			var that = this;
			var aData = this.getModel("simulate").getData();
			var xData = [],
				actualData = [],
				preData = [];
			var d = new Date();
			var sNowTime = "2018-09-25 10:12" + ":" + ("0" +  (d.getSeconds() - d.getSeconds()%5)).slice(-2);
			// var sNowTime = "2018-09-25 " + ("0" + d.getHours()).slice(-2)  + ":" + ("0" + d.getMinutes()).slice(-2) + ":00";
			var s6Time = "";
			// var sd = new Date(d.getTime() + 90 * 60 * 1000);
			// var s6Time = "2018-09-25 " + ("0" + sd.getHours()).slice(-2) + ":" + ("0" + sd.getMinutes()).slice(-2) + ":00";
		
			var sInd2 = 0;
			aData.forEach(function (i) {
				xData.push(i.Time);
				if (i.Time < sNowTime) {
					actualData.push(i.NOX);
					preData.push(i.NOX);
				} else{
					if (sInd2 < 120) {
						sInd2++;
					}
					var sVal = Number(i.NOX) + sInd2;
					if (sVal > 320 && s6Time === "") {
						s6Time = i.Time;
					}
					actualData.push(sVal);
					preData.push(i.NOX - that._random(0,15));
				} 

			});
			var option = {
				tooltip: {
					trigger: 'axis',
					axisPointer: {
						type: 'cross'
					}
				},
					grid: {
					left: '3%',
					right: '4%',
					bottom: '3%',
					// top: "5%",
					containLabel: true
				},
					xAxis: {
					type: 'category',
					boundaryGap: false,
					data: xData,
					axisLine: {
						lineStyle: {
							color: "#00FFFE"
						},
						width: 0.5
					},
					axisLabel: {
						color: '#00FFFE',
						fontSize: 12
					}
				},
			
				yAxis: {
					type: 'value',
					name: "NOx排放量",
					boundaryGap: false,
					axisPointer: {
						snap: true
					},
					max: 450,
						axisLine: {
						lineStyle: {
							color: "#00FFFE"
						},
						width: 0.5
					},
					axisLabel: {
						color: '#00FFFE',
						fontSize: 12
					}
				},
				visualMap: {
					show: false,
					dimension: 1,
					pieces: [{
						lte: 320,
						color: 'green'
					}, {
						gt: 320,
						lte: 450,
						color: 'red'
					}]
				},
				series: [{
					name: 'actual',
					type: 'line',
					smooth: true,
					data: actualData,
					markArea: {
						itemStyle:{
					    color:"#460120"
					},
						data: [
							[{
								yAxis: '320'
							}, {
								yAxis: '450'
							}]
						]
					},
					markLine: {
						silent: true,
						lineStyle: {
							width: 1,
							type: "solid",
							color: "green"
						},
						label: {
							formatter: "Current Time"
						},
						data: [{
							xAxis: sNowTime
						}]
					}
				}, {
					name: 'predict',
					type: 'line',
					lineStyle: {
						type: "dashed"
					},
					smooth: true,
					data: preData,
					markLine: {
						silent: true,
						lineStyle: {
							width: 3,
							type: "solid",
							color: "red"
						},
						label: {
							formatter: "出错时间点"
						},
						data: [{
							xAxis: s6Time
						}]
					}
				}]
			};
			return option;

		},
		onSelectEchart: function (oEvent) {
			var sKey = oEvent.getSource().getSelectedKey();
			var option = this.getSimulactHistoryOpt(sKey);
			var oKey = sap.ui.core.Fragment.byId("simulateFragId", "simulateIconTabBar").getSelectedKey();

			if (oKey === "nox") {
				this.getView().getModel().setProperty("/simulateNOx/simHistoryOpt", option);
			} else {
				this.getView().getModel().setProperty("/simulateSOx/simHistoryOpt", option);

			}

		},
		getSimulactHistoryOpt: function (sKey) {
			var aData = this.getModel("simulate").getData();
			var option = {
				tooltip: {
					trigger: 'axis'
				},
				grid: {
					left: '3%',
					right: '4%',
					bottom: '3%',
					top: "5%",
					containLabel: true
				},

				xAxis: {
					type: 'category',
					boundaryGap: false,
					data: aData.map(function (item) {
						return item.Time;
					}),
					axisLine: {
						lineStyle: {
							color: "#00FFFE"
						},
						width: 0.5
					},
					axisLabel: {
						color: '#00FFFE',
						fontSize: 12
					}
				},
				yAxis: {
					type: 'value',
					axisLine: {
						lineStyle: {
							color: "#00FFFE"
						},
						width: 0.5
					},
					axisLabel: {
						color: '#00FFFE',
						fontSize: 12
					}
				},
				series: [{
					type: 'line',
					data: aData.map(function (item) {
						return item[sKey]
					}),
					lineStyle: {
						color: '#00feb0'
					}
				}]
			};
			return option;
		},
		onPressModel: function (oEvent) {
			var sKey = oEvent.getSource().getSelectedKey();
			if (sKey === "model") {
				this.getView().getModel().setProperty("/showModel", true);
			} else {
				this.getView().getModel().setProperty("/showModel", false);
			}
		},
		onPressSimulateOutput:function(){
				this.getView().getModel().setProperty("/output", this._random(8000,10000));
		}
	});
});