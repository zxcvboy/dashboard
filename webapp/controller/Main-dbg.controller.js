sap.ui.define([
	"Managment/Dashboard/controller/BaseController"
], function (BaseController) {
	"use strict";

	return BaseController.extend("Managment.Dashboard.controller.Main", {
		onInit: function () {
			this.getRouter().getRoute("RouteMain").attachMatched(this._onRouteMatched, this);
		},

		onAfterRendering: function () {
			this.onCreatId("g", "FlowSVGId");
			this.onCreatId("polygon", "FlowSVGId");
			this.onCreatId("ellipse", "FlowSVGId");
			this.onCreatId("use", "FlowSVGId");
			this.onCreatId("path", "FlowSVGId");
			this.onCreatId("circle", "FlowSVGId");
			this.bindEleEvent("foundation-A", "foundation-A-hover");
			this.bindEleEvent("foundation-B", "foundation-B-hover");
			this.bindEleEvent("foundation-C", "foundation-C-hover");
			this.bindEleEvent("foundation-D", "foundation-D-hover");
			this.bindEleEvent("foundation-E", "foundation-E-hover");
			this.bindEleEvent("foundation-F", "foundation-F-hover");
			document.getElementById(this.createId("foundation-D")).addEventListener("click", this.onNavToMap.bind(this));
			document.getElementById(this.createId("CoalPredictId")).addEventListener("click", this.onOpenNewTab.bind(this));

			this.onSVGAnimation();
			// create tooltip
			var arrTooltipConf = [
				{
					id: 'foundation-A',
					data: [
						[{text: '當日生產量', color: '#00FFFE'}, {text: '84,077.09噸', color: '#00FFFE'}],
						[{text: '庫容率', color: '#00FFFE'}, {text: '53%', color: '#00FFFE'}]
					],
					option: {
						animation: 'scale',
						placement: 'left',
						arrow: false,
						content: '测试内容'
					}
				}, {
					id: 'foundation-B',
					data: [
						[{text: '產量', color: '#00FFFE'}, {text: '63,908.422噸', color: '#00FFFE'}],
						[{text: '庫容率', color: '#00FFFE'}, {text: '83%', color: '#00FFFE'}]
					],
					option: {
						animation: 'scale',
						placement: 'left',
						arrow: false,
						content: '测试内容'
					}
				}, {
					id: 'foundation-C',
					data: [
						[{text: '產量', color: '#00FFFE'}, {text: '272,809.063噸', color: '#00FFFE'}],
						[{text: '煤倉庫容率', color: '#00FFFE'}, {text: '70%', color: '#00FFFE'}]
					],
					option: {
						animation: 'scale',
						placement: 'left',
						arrow: false,
						content: '测试内容'
					}
				}, {
					id: 'foundation-D',
					data: [
						[{text: '熟料產量', color: '#00FFFE'}, {text: '262,853.247噸', color: '#00FFFE'}],
						[{text: '熟料庫容率', color: '#00FFFE'}, {text: '85%', color: '#00FFFE'}]
					],
					option: {
						animation: 'scale',
						placement: 'left',
						arrow: false,
						content: '测试内容'
					}
				}, {
					id: 'foundation-E',
					data: [
						[{text: '產量', color: '#00FFFE'}, {text: '105,775.889噸', color: '#00FFFE'}],
						[{text: '庫容率', color: '#00FFFE'}, {text: '44.26%', color: '#00FFFE'}]
					],
					option: {
						animation: 'scale',
						placement: 'left',
						arrow: false,
						content: '测试内容'
					}
				}, {
					id: 'foundation-F',
					data: [
						[{text: '銷售目標-散泥', color: '#00FFFE'}, {text: '19,643.36噸', color: '#00FFFE'}],
						[{text: '實際銷售量', color: '#00FFFE'}, {text: '19,519.13噸', color: '#00FFFE'}],
						[{text: '銷售目標-熟料', color: '#00FFFE'}, {text: '4,400.01噸', color: '#00FFFE'}],
						[{text: '實際銷售量', color: '#00FFFE'}, {text: '6,327.83噸', color: '#00FFFE'}],
						[{text: '銷售目標-袋泥', color: '#00FFFE'}, {text: '4,090.02噸', color: '#00FFFE'}],
						[{text: '實際銷售量', color: '#00FFFE'}, {text: '3,990.5噸', color: '#00FFFE'}],
					],
					option: {
						animation: 'scale',
						placement: 'left',
						arrow: false,
						content: '测试内容'
					}
				}
			];
			this.tooltip(arrTooltipConf)
		},

		bindEleEvent: function (sElementId, sUrlId) {
			var oElement = document.getElementById(this.createId(sElementId));
			oElement.addEventListener("mouseover", function () {
				this._onMouseover(sElementId, sUrlId)
			}.bind(this));
			oElement.addEventListener("mouseout", function () {
				this._onMouseout(sElementId)
			}.bind(this));

		},
		_onMouseover: function (sElementId, url) {
			document.getElementById(this.createId(sElementId)).setAttribute("filter", "url(#" + this.createId(url) + ")");
		},
		_onMouseout: function (sElementId) {
			document.getElementById(this.createId(sElementId)).removeAttribute("filter");
		},
		_onRouteMatched: function () {
			this.getModel("app").setProperty("/showFilter", false);
			this.getModel("app").setProperty("/showPageHeader", false);
			this.getModel("app").setProperty("/pageTitle", "臺泥動態管理平臺");
		},
		onNavToMap: function () {
			this.getRouter().navTo("RouteMap");
		},
		onSVGAnimation: function () {
			// SVG Motion Animation
			var arrMotionSVG = [{
				id: 'motion-main-01',
				aniLength: 5, // 动画总长度, 单位为 s
				pathCoord: [{
					left: -89, // 作为 keyFrames 的第 2 个帧, 以此类推
					top: -45,
					opacity: 0
				}, {
					left: 0, // 作为 keyFrames 的第 2 个帧, 以此类推
					top: 0,
					opacity: 1
				}, {
					left: 160,
					top: 85,
					opacity: 1
				}]
			}, {
				id: 'motion-main-02',
				aniLength: 3, // 动画总长度, 单位为 s
				pathCoord: [{
					left: -118,
					top: -66,
					opacity: 1
				}, {
					left: 0,
					top: 0,
					opacity: 1
				}, {
					left: 20,
					top: 10,
					opacity: 0
				}]
			}, {
				id: 'motion-main-03',
				aniLength: 1.5, // 动画总长度, 单位为 s
				pathCoord: [{
					left: -28,
					top: -12,
					opacity: 0
				}, {
					left: 0,
					top: 0,
					opacity: 1
				}, {
					left: 25,
					top: 13,
					opacity: 0
				}]
			}, {
				id: 'motion-main-04',
				aniLength: 1.5, // 动画总长度, 单位为 s
				pathCoord: [{
					left: -35,
					top: 15,
					opacity: 0
				}, {
					left: 0,
					top: 0,
					opacity: 1
				}, {
					left: 15,
					top: -7,
					opacity: 0
				}]
			}, {
				id: 'motion-main-05',
				aniLength: 4, // 动画总长度, 单位为 s
				pathCoord: [{
					left: 170,
					top: 89,
					opacity: 0
				}, {
					left: 0,
					top: 0,
					opacity: 1
				}, {
					left: -90,
					top: -49,
					opacity: 0
				}]
			}, {
				id: 'motion-main-06',
				aniLength: 5, // 动画总长度, 单位为 s
				pathCoord: [{
					left: -50,
					top: 128,
					opacity: 0
				}, {
					left: -15,
					top: 110,
					opacity: 1
				}, {
					left: 0,
					top: 90,
					opacity: 0
				}, {
					left: 0,
					top: 0,
					opacity: 1
				}, {
					left: 0,
					top: -80,
					opacity: 0
				}]
			}, {
				id: 'motion-main-07',
				aniLength: 2, // 动画总长度, 单位为 s
				pathCoord: [{
					left: 29,
					top: -15,
					opacity: 0
				}, {
					left: 0,
					top: 0,
					opacity: 1
				}, {
					left: -15,
					top: 9,
					opacity: 0
				}]
			}, {
				id: 'motion-main-08',
				aniLength: 2, // 动画总长度, 单位为 s
				pathCoord: [{
					left: -35,
					top: -18,
					opacity: 0
				}, {
					left: 0,
					top: 0,
					opacity: 1
				}, {
					left: 18,
					top: 10,
					opacity: 0
				}]
			}, {
				id: 'motion-main-09',
				aniLength: 2, // 动画总长度, 单位为 s
				pathCoord: [{
					left: -40,
					top: -21,
					opacity: 0
				}, {
					left: 0,
					top: 0,
					opacity: 1
				}, {
					left: 20,
					top: 12,
					opacity: 0
				}]
			}, {
				id: 'motion-main-10',
				aniLength: 2, // 动画总长度, 单位为 s
				pathCoord: [{
					left: -22,
					top: 10,
					opacity: 0
				}, {
					left: 0,
					top: 0,
					opacity: 1
				}, {
					left: 22,
					top: -12,
					opacity: 0
				}]
			}, {
				id: 'motion-main-11',
				aniLength: 1.5, // 动画总长度, 单位为 s
				pathCoord: [{
					left: 80,
					top: -43,
					opacity: 1
				}, {
					left: 100,
					top: -55,
					opacity: 0
				}]
			}, {
				id: 'motion-main-12',
				aniLength: 3, // 动画总长度, 单位为 s
				pathCoord: [{
					left: -60,
					top: -30,
					opacity: 0
				}, {
					left: 0,
					top: 0,
					opacity: 1
				}, {
					left: 17,
					top: 9,
					opacity: 0
				}]
			}, {
				id: 'motion-main-13',
				aniLength: 3, // 动画总长度, 单位为 s
				pathCoord: [{
					left: 42,
					top: -22,
					opacity: 0
				}, {
					left: 0,
					top: 0,
					opacity: 1
				}, {
					left: -58,
					top: 32,
					opacity: 0
				}]
			}, {
				id: 'motion-main-14',
				aniLength: 3, // 动画总长度, 单位为 s
				pathCoord: [{
					left: -38,
					top: -20,
					opacity: 0
				}, {
					left: 0,
					top: 0,
					opacity: 1
				}, {
					left: 30,
					top: 17,
					opacity: 0
				}, {
					left: 59,
					top: 16,
					opacity: 0
				}, {
					left: 79,
					top: 6,
					opacity: 1
				}, {
					left: 100,
					top: -3,
					opacity: 0
				}]
			}, {
				id: 'motion-main-15',
				aniLength: 3, // 动画总长度, 单位为 s
				pathCoord: [{
					left: -65,
					top: -32,
					opacity: 0
				}, {
					left: 0,
					top: 0,
					opacity: 1
				}, {
					left: 20,
					top: 11,
					opacity: 0
				}]
			}, {
				id: 'motion-main-car1',
				aniLength: 3.5, // 动画总长度, 单位为 s
				pathCoord: [{
					left: 1421,
					top: 666,
					opacity: 1
				}, {
					left: 1351,
					top: 691,
					opacity: 1
				}]
			}];
			this.motionSvg(arrMotionSVG);
		},
		onOpenNewTab: function () {
			// window.open("image/CaolPredict.png");
			
			// var oButton = oEvent.getSource();
			if (!this.outSystemDialog) {
				this.outSystemDialog = sap.ui.xmlfragment("Managment.Dashboard.view.OutSystem", this);
				this.getView().addDependent(this.caveParaDialog);
			}
	
			this.outSystemDialog.open();
		
		},
			handleDialogClose: function (oEvent) {
			oEvent.getSource().getParent().close();
		}
	});
});