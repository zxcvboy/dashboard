sap.ui.define([
	"Managment/Dashboard/controller/BaseController",
	"sap/ui/model/json/JSONModel",
	"sap/suite/ui/microchart/BulletMicroChart",
	"sap/suite/ui/microchart/BulletMicroChartData",
	"Managment/Dashboard/util/formatter"
], function (BaseController, JSONModel, BulletMicroChart, BulletMicroChartData, formatter) {
	"use strict";
	var _oMapNodeTempCompany = {
		type: "effectScatter",
		coordinateSystem: "bmap",
		data: [],
		symbolSize: function (val, params) {
			// if (params.data.output === 0) {
			// 	return 16;
			// } else if (params.data.output < 4000000) {
			// 	return 48;
			// } else {
			// 	return 80
			// }
			return params.data.output / 5000
		},
		showEffectOn: "emphasis",
		rippleEffect: {
			brushType: "stroke"
		},
		hoverAnimation: true,
		label: {
			fontSize: 30,
			normal: {
				formatter: "{b}",
				position: "right",
				show: true
			}
		},
		itemStyle: {
			normal: {
				color: function (val) {
					if (val.data.alert) {
						return "#F10261";
					} else {
						return "#02FEAE";
					}
				},
				opacity: 0.8
			}
		},
		zlevel: 1
	};
	return BaseController.extend("Managment.Dashboard.controller.Map", {
		formatter: formatter,
		onInit: function () {
			var oModel = new JSONModel({
				showFilter: true,
				factoryData: [],
				sox: "0",
				nox: "0",
				totalOutput: "0"
			});
			oModel.setDefaultBindingMode(sap.ui.model.BindingMode.OneWay);
			this.getView().setModel(oModel);
			this.loadData();
			this.getRouter().getRoute("RouteMap").attachMatched(this._onRouteMatched, this);
			// this.sNowTime = this.formatDate(new Date()).substring(0, 8) + "-00:00:00";
			this.initMap();
		},
		_onRouteMatched: function () {
			this.getModel("app").setProperty("/showFilter", true);
			this.getModel("app").setProperty("/showPageHeader", true);
			this.getModel("app").setProperty("/pageTitle", "地圖");

		},
		loadData: function () {
			var aFactoryData = [];
			var aData = this.getModel("factoryLocation").getData();
			aData.forEach(function (i) {
				aFactoryData.push({
					"name": i.Name,
					"value": [i.Lng,
						i.Lat
					],
					"output": 0,
					"days": 0,
					"carbon": 0,
					"clinkerPower": 0,
					"cDischarge": 0,
					"nox": 0,
					"sox": 0,
					"cIntensity": 0,
					"alert": true,
					"id": i.ID
				})
			})
			var aFactoryDetailData = this.getModel("factoryDetail").getData();
			var oFactoryDetail = {};
			var iTotalOutput = 0;
			aFactoryDetailData.forEach(function (i) {
				if (i.Date === "20190411-00:00:00") {
					if (!oFactoryDetail[i.ID]) {
						oFactoryDetail[i.ID] = {};
					}
					if (!oFactoryDetail[i.ID].hasOwnProperty(i.CaveType)) {
						oFactoryDetail[i.ID][i.CaveType] = {};
					}
					oFactoryDetail[i.ID][i.CaveType] = i;
					iTotalOutput += Number(i.Output);
				}
			});

			for (var j = 0; j < aFactoryData.length; j++) {
				var sId = aFactoryData[j].id;
				for (var k in oFactoryDetail[sId]) {
					if (aFactoryData[j].days < Number(oFactoryDetail[sId][k]["RunDays"])) {
						aFactoryData[j].days = Number(oFactoryDetail[sId][k]["RunDays"]);
					}

					aFactoryData[j].output += Number(oFactoryDetail[sId][k]["Output"]);
					// iTotalOutput += Number(oFactoryDetail[sId][k]["Output"]);
					aFactoryData[j].carbon += Number(oFactoryDetail[sId][k]["Carbon"]);
					aFactoryData[j].clinkerPower += Number(oFactoryDetail[sId][k]["ClinkerPower"]);
					if (aFactoryData[j].cIntensity < Number(oFactoryDetail[sId][k]["CIntensity"])) {
						aFactoryData[j].cIntensity = Number(oFactoryDetail[sId][k]["CIntensity"]);
					}
					aFactoryData[j].cDischarge += Number(oFactoryDetail[sId][k]["CDischarge"]);

					if (oFactoryDetail[sId][k].Runtime > "0" && oFactoryDetail[sId][k].NOX > "0" && oFactoryDetail[sId][k].SOX > "0" &&
						oFactoryDetail[sId][k].CIntensity > "0") {
						aFactoryData[j].alert = false;
					}
					if(sId === "2011"){
						aFactoryData[j].alert = true;
					}
				}
				aFactoryData[j].value.push(aFactoryData[j].output);
			}

			this.getView().getModel().setProperty("/factoryData", aFactoryData);
			this.getView().getModel().setProperty("/totalOutput", formatter.formatThousand2(iTotalOutput));
		},
		initMap: function () {
			var aFactoryData = this.getView().getModel().getProperty("/factoryData");
			var option = {
				tooltip: {
					trigger: "item"
				},
				visualMap: {
					// orient:"horizontal",
					left: 'right',
					top: '60%',
					dimension: 2,
					min: 0,
					max: 300000,
					itemWidth: 30,
					itemHeight: 140,
					calculable: true,
					precision: 0,
					text: ['產量(噸)'],
					textGap: 30,
					textStyle: {
						color: '#28edf5',
						fontSize: '22'
					},
					inRange: {
						symbolSize: [10, 80]
					},
					outOfRange: {
						symbolSize: [10, 80],
						color: ['rgba(255,255,255,.2)']
					},
					controller: {
						inRange: {
							color: ['#28edf5']
						},
						outOfRange: {
							color: ['#444']
						}
					},
					formatter: function (v) {
						return formatter.formatThousand2(v)
					}
				},
				bmap: {
					roam: true,
					mapStyle: {
						styleJson: [{
							featureType: "background",
							elementType: "geometry",
							stylers: {
								color: "#113549ff"
							}
						}, {
							"featureType": "boundary",
							"elementType": "all",
							"stylers": {
								"color": "#000000ff"
							}
						}, {
							featureType: "all",
							elementType: "labels.text.stroke",
							stylers: {
								visibility: "off"
							}
						}, {
							featureType: "all",
							elementType: "labels.icon",
							stylers: {
								visibility: "off"
							}
						}, {
							featureType: "all",
							elementType: "labels.text.fill",
							stylers: {
								visibility: "off"
							}
						}, {
							featureType: "water",
							elementType: "geometry",
							stylers: {
								visibility: "on",
								color: "#00053e"
							}
						}, {
							featureType: "land",
							elementType: "geometry",
							stylers: {
								visibility: "on",
								color: "#223871"
							}
						}, {
							featureType: "arterial",
							elementType: "geometry",
							stylers: {
								visibility: "on",
								weight: 2
							}
						}, {
							featureType: "arterial",
							elementType: "geometry.fill",
							stylers: {
								color: "#12223dff"
							}
						}, {
							featureType: "arterial",
							elementType: "geometry.stroke",
							stylers: {
								color: "#ffeebb00"
							}
						}, {
							featureType: "arterial",
							elementType: "labels",
							stylers: {
								visibility: "on"
							}
						}, {
							featureType: "railway",
							elementType: "geometry",
							stylers: {
								visibility: "off",
								weight: 1
							}
						}, {
							featureType: "subway",
							elementType: "geometry",
							stylers: {
								visibility: "off",
								weight: 1
							}
						}, {
							featureType: "building",
							elementType: "geometry",
							stylers: {
								visibility: "off"
							}
						}, {
							featureType: "green",
							elementType: "geometry",
							stylers: {
								visibility: "off",
								color: "#0e1b30ff"
							}
						}, {
							featureType: "manmade",
							elementType: "geometry",
							stylers: {
								color: "#12223dff"
							}
						}, {
							featureType: "road",
							elementType: "geometry.fill",
							stylers: {
								color: "#12223dff"
							}
						}, {
							featureType: "road",
							elementType: "labels",
							stylers: {
								visibility: "off"
							}
						}, {
							featureType: "road",
							elementType: "geometry.stroke",
							stylers: {
								"visibility": "off"
							}
						}, {
							"featureType": "city",
							"elementType": "labels.icon",
							"stylers": {
								"visibility": "off"
							}
						}, {
							"featureType": "city",
							"elementType": "labels",
							"stylers": {
								"visibility": "off"
							}
						}, {
							"featureType": "district",
							"elementType": "labels",
							"stylers": {
								"visibility": "off"
							}
						}, {
							"featureType": "town",
							"elementType": "labels",
							"stylers": {
								"visibility": "off"
							}
						}, {
							"featureType": "water",
							"elementType": "labels",
							"stylers": {
								"visibility": "off"
							}
						}, {
							"featureType": "continent",
							"elementType": "labels",
							"stylers": {
								"visibility": "off"
							}
						}, {
							"featureType": "country",
							"elementType": "labels",
							"stylers": {
								"visibility": "off"
							}
						}, {
							"featureType": "nationalway",
							"elementType": "geometry",
							"stylers": {
								"visibility": "off"
							}
						}, {
							"featureType": "cityhighway",
							"elementType": "geometry",
							"stylers": {
								"visibility": "off"
							}
						}, {
							"featureType": "highway",
							"elementType": "geometry",
							"stylers": {
								"visibility": "off"
							}
						}, {
							"featureType": "arterial",
							"elementType": "geometry",
							"stylers": {
								"visibility": "off"
							}
						}, {
							"featureType": "provincialway",
							"elementType": "geometry",
							"stylers": {
								"visibility": "off"
							}
						}]
					}
				},
				series: [$.extend({}, _oMapNodeTempCompany, {
					data: aFactoryData,
					tooltip: {
						trigger: "item",
						backgroundColor: "rgba(0,0,0,0.90)",
						borderColor: "#00FFFE",
						borderWidth: 1,
						fontSize: "12",
						padding: [10, 10],
						formatter: function (params) {
							return this.attributeHover(params);
						}.bind(this)
					}
				})]
			};

			var oChart = this.getView().byId("idEChart");
			oChart.setOption(option);
			oChart.attachEventOnce(
				"afterEchartInit",
				function () {
					var oEChart = oChart.getEChart();
					var bmap = oEChart
						.getModel()
						.getComponent("bmap")
						.getBMap();
					bmap.addControl(
						new BMap.NavigationControl({
							anchor: 3, //BMAP_ANCHOR_BOTTOM_RIGHT
							showZoomInfo: true
						})
					);
					bmap.setMaxZoom(8);
					var boundary = new BMap.Boundary();
					oChart.fireAfterResize();
					oEChart.on("click", "series", this.attributeClick.bind(this));
				}.bind(this)
			);
		},
		onNavTable: function () {
			this.getRouter().navTo("RouteTable");
		},
		attributeClick: function (params) {
			this.getRouter().navTo("RouteMonitor");
		},
		refreshMonitorData: function (data) {
			var sSox = this.getView().getModel().getProperty("/sox");
			var sNox = this.getView().getModel().getProperty("/nox");
			var aUpdateFactoryData = this.getView().getModel().getProperty("/factoryData");
			var aData = this.getModel("factoryMonitor").getData();
			var sNowTime = "20190411-10:" + ("0" + new Date().getSeconds()).slice(-2) + ":00";
			var that = this;
			aData.forEach(function (i) {
				if (i.Date === sNowTime && i.ID === data.id) {
					for (var j = 0; j < aUpdateFactoryData.length; j++) {
						if (aUpdateFactoryData[j].id === data.id) {
							aUpdateFactoryData[j].sox = Number(i.SOX);
							aUpdateFactoryData[j].nox = Number(i.NOX);
							if (Number(i.SOX) === 0 || Number(i.NOX) === 0) {
								aUpdateFactoryData[j].alert = true;
							}
							that.getView().getModel().setProperty("/sox", Number(i.SOX));
							if (i.ID === "2011") {
								that.getView().getModel().setProperty("/nox", that._random(320, 340));//Number(i.NOX) + 150);

							} else {
								that.getView().getModel().setProperty("/nox", Number(i.NOX));

							}
							break;
						}
					}
				}
			});
			this.getView().getModel().refresh();
		},
		attributeHover: function (params) {
			var that = this;
			var data = params.data;
			that.refreshMonitorData(data);
			that.getView().getModel().setProperty("/co2", Number(data.cIntensity));
			clearInterval(this._refreshInterval);
			this._refreshInterval = setInterval(function () {
				that.refreshMonitorData(data);
			}, 1000 * 1);

			var oTooltip =
				`<div style="padding: 1.5rem">
  <div style="font-size: 32px;color: #00FFFE;margin-bottom: 1.5rem">${data.name}</div>
  <div style="font-size: 22px;display: inline-block;  width: 40%;color:#00FFFE;margin-bottom: 0.2rem">2019年4月量<p>
  	<span style="font-size: 30px;color:#02FEAE">${formatter.formatThousand2(Number(data.output.toFixed(2)))}噸</span>
  </div>
  <div style="font-size: 22px;display: inline-block;  width: 28%;color:#00FFFE;margin-bottom: 0.2rem">總效能<p>
    <span style="font-size: 30px;color:#02FEAE">${that._random(90, 99)}%</span>
  </div>
  <div style="font-size: 22px;display: inline-block;  width: 28%;color:#00FFFE;margin-bottom: 0.2rem">月生產天數<p>
  	<span style="font-size: 30px;color:#02FEAE">${data.days}</span>
  </div>
  <div class="sigma-content">
  	<div class="sigma-middle-line">
    	<span class="sigma-line-text">實際產量</span>
    </div>
  </div>
  <div class="sigma-content" style="margin-bottom: 1rem">
  	<div class="sigma-middle-line2">
    	<span class="sigma-line-text">預計產量</span>
    </div>
  </div>
  <div style="border-bottom: 1px solid #02FEAE; margin-bottom: 1.5rem;"></div>
  	<div class="container">
    	<div class="row0">
          <div class="col">
              <div class="sub-row-text0">標準煤耗(Kg/噸)</div>
              <div class="sub-row0">${data.carbon.toFixed(3)}</div>
          </div>
          <div class="col">  
              <div class="sub-row-text0">熟料綜合電耗(KWH/噸)</div>
              <div class="sub-row0">${data.clinkerPower.toFixed(3)}</div>
          </div>
          <div class="col" >
               <div class="sub-row-text0">CO<sub>2</sub>排放控管量(噸)</div>
              <div class="sub-row0">${formatter.formatThousand2(Number(data.cDischarge.toFixed(3)))}</div>
          </div>
      </div>
      <div style="border-bottom: 1px solid #02FEAE;margin-bottom: 1.5rem;"></div>
      <div class="row">
          <div class="col">
              <div class="sub-row-text">SOx排放濃度(mg/m3)</div>
              <div class="sub-row" id="soxTextId"></div><br>
               <div class="sub-row" id="chartId1"></div>
          </div>
          <div class="col"> 
              <div class="sub-row-text">CO<sub>2</sub>排放強度(CO<sub>2</sub>/熟料)</div>
              <div class="sub-row">${data.cIntensity.toFixed(3)}</div><br>
              <div class="sub-row" id="chartId2"></div>
          </div>
          <div class="col"> 
              <div class="sub-row-text">NOx排放濃度(mg/m3)</div>
              <div class="sub-row" id="noxTextId"></div><br>
               <div class="sub-row" id="chartId3"></div>
          </div>
      </div>
      <div class="row caption" style="top: -28px; height: 10px;">
    	<div class="col">
    	  	<span class="green">0</span>
    		<span class="orange" style="right: 60px;">80</span>
    		<span class="red" style="right: 20px;">100</span>
        </div>
      	<div class="col">
    	  	<span class="green">0</span>
    		<span class="orange" style="right: 65px;">0.80</span>
    		<span class="red" style="right: 15px;">0.87</span>
        </div>
        <div class="col">
    	  	<span class="green">0</span>
    		<span class="orange" style="right: 60px;">280</span>
    		<span class="red" style="right: 10px;">320</span>
        </div>
    </div>
  </div>
</div>
<style>
.container {width: 650px; height: 200px }
.row0 { display: block; height:5rem; width: 100%;  }
.sub-row0 {height: 45%; display: block;font-size: 24px;color: #00FFFE;}
.sub-row-text0{height: 40%; display: block;font-size: 18px;color: #00FFFE;}
.row { display: block; height: 120px; width: 100%;  }
.col {display: inline-block; width: 33%; height: 100%; float: left;}
.sub-row {height: 35%; display: block;font-size: 24px;color: #F4D362;}
.sub-row-text{height: 23%; display: block;font-size: 18px;color: #00FFFE;}
.sigma-content{text-align: right;width:250px}
.sigma-middle-line:before{
    content: '';
    display: block;
    height: 3px;
    width: 120px;
    background-color:  #02FEAE;
    position: relative;
    top: 13px;
}
.sigma-middle-line2:before{
    content: '';
    display: block;
    height: 3px;
    width: 150px;
    background-color: #52A0FD;
    position: relative;
    top: 13px;
}
.sigma-line-text{
    display: inline-block;
    font-size: 14px;
    font-weight: 500;
	color: #00FFFE;
}
	.caption {font-size: 95%; position: relative;}
	.caption > .col {position: relative;}
	.caption span {position: absolute;}
	.caption .green {color: #7BD269;}
	.caption .red {color: #F34C70;}
	.caption .orange {color: #F4D362;}
</style>`;
			var _BulletChar = function (sPath, iCritical, iError,iErrorMax, sColor) {
				var oColor = {};
				if (sPath === "/co2") {
					oColor = {
						path: sPath,
						formatter: formatter.formatColorBulletCo2
					};
				} else {
					oColor = {
						path: sPath,
						formatter: formatter.formatColorBulletNox
					}
				}
				return new BulletMicroChart({
					size: "M",
					scale: "",
					targetValue: {
						// value: {
						path: sPath
						// },
						// color: sColor
					},
					showThresholds: true,
					showValueMarker: false,
					showTargetValue: false,
					showActualValue: false,
					actual: [{
						value: {
							path: sPath
						},
						color: oColor
					}],
					thresholds: [new BulletMicroChartData({
						value: 0,
						color: "Good"
					}), new BulletMicroChartData({
						value: iCritical,
						color: "Critical"
					}), new BulletMicroChartData({
						value: iError,
						color: "Error"
					}), new BulletMicroChartData({
						value: iErrorMax,
						color: "Error"
					})]
				}).addStyleClass("mapTooltipChart");
			};
			var that = this;
			setTimeout(function () {
				var aChartIds = ["chartId1", "chartId2", "chartId3"];
				if (!this._chartchartId1) {
					this._chartchartId1 = _BulletChar("/sox", 80, 100,100, "Good");
					that.getView().addDependent(this._chartchartId1);
				}
				if (!this._chartchartId2) {
					this._chartchartId2 = _BulletChar("/co2", 0.80, 0.87,0.87, "Critical");
					that.getView().addDependent(this._chartchartId2);
				}
				if (!this._chartchartId3) {
					this._chartchartId3 = _BulletChar("/nox", 280, 320,350, "Error");
					that.getView().addDependent(this._chartchartId3);
				}
				aChartIds.forEach(function (i) {
					document.getElementById(i).innerHTML = "";
					this["_chart" + i].placeAt(i);
				}.bind(this));
				if (!that._SoxText)
				// that._SoxText = new sap.m.Text({
				// 	text: {
				// 		path: "/sox"
				// 	}
				// }).addStyleClass("maptooltipText");
					that._SoxText = new sap.m.ObjectNumber({
						number: {
							path: "/sox"
						},
						state: {
							path: "/sox",
							formatter: formatter.formatColorSox
						}
					}).addStyleClass("myObjNum");
				if (!that._NoxText)
				// that._NoxText = new sap.m.Text({
				// 	text: {
				// 		path: "/nox"
				// 	}
				// }).addStyleClass("maptooltipText");
					that._NoxText = new sap.m.ObjectNumber({
						number: {
							path: "/nox"
						},
						state: {
							path: "/nox",
							formatter: formatter.formatColorNox
						}
					}).addStyleClass("myObjNum");
				document.getElementById("noxTextId").innerHTML = "";
				that._NoxText.onAfterRendering();
				that.getView().addDependent(that._NoxText);
				document.getElementById("soxTextId").innerHTML = "";
				that._SoxText.onAfterRendering();
				that.getView().addDependent(that._SoxText);
				that._NoxText.placeAt("noxTextId");
				that._SoxText.placeAt("soxTextId");
			}, 100);
			return oTooltip;

		},
		onAfterMapResize: function (oEvent) {
			var oEChart = oEvent.getSource().getEChart(),
				oChartModel = oEChart.getModel();
			if (!oChartModel.getComponent || !oChartModel.getComponent("bmap")) {
				return;
			}
			setTimeout(() => {
				var bmap = oChartModel.getComponent("bmap").getBMap();
				var mapopt = oEChart.getOption().bmap[0];
				bmap.centerAndZoom(new BMap.Point(mapopt.center[0], mapopt.center[1]), mapopt.zoom);
			}, 500);
		},
		getChart: function () {
			return this.getView().byId("idEChart");
		},
		handleCancelPress: function (oEvent) {
			this._FactoryPopover.close();
		},

		onPress: function (oEvent) {
			var aFactoryId = this.getFilterFactory(oEvent);
			var aData = this.getModel("factoryDetail").getData();
			var iTotalOutput = 0;
			aData.forEach(function (x) {
				if (aFactoryId.length === 0) {
					if (x.Date === "20190411-00:00:00") {
						iTotalOutput += Number(x.Output);
					}
				} else {
					if (x.Date === "20190411-00:00:00" && aFactoryId.join(",").indexOf(x.ID) !== -1) {
						iTotalOutput += Number(x.Output);
					}
				}
			});
			this.getView().getModel().setProperty("/totalOutput", formatter.formatThousand2(iTotalOutput));
		}
	});
});