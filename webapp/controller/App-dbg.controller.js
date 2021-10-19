sap.ui.define([
	"Managment/Dashboard/controller/BaseController",
	"sap/ui/model/json/JSONModel"
], function (BaseController, JSONModel) {
	"use strict";

	return BaseController.extend("Managment.Dashboard.controller.App", {
		onInit: function () {
			this.setModel(new sap.ui.model.json.JSONModel({
				"showPageHeader": false,
				"pageTitle": "",
				"showFilter": true
			}), "app");
			this.loadFactoryData();
		},
		loadFactoryData: function () {
			var oFactoryModel = new JSONModel();
			oFactoryModel.loadData($.sap.getModulePath("Managment.Dashboard", "/json/factoryLocation.json"), "", false);
			this.setModel(oFactoryModel, "factoryLocation");
			var oFactoryDetailModel = new JSONModel();
			oFactoryDetailModel.loadData($.sap.getModulePath("Managment.Dashboard", "/json/factoryDetailByDay.json"), "", false);
			this.setModel(oFactoryDetailModel, "factoryDetail");
			var oFactorySONOModel = new JSONModel();
			oFactorySONOModel.loadData($.sap.getModulePath("Managment.Dashboard", "/json/nosoDetailByMin.json"), "", false);
			this.setModel(oFactorySONOModel, "factoryMonitor");
			var oCaveModel = new JSONModel();
			oCaveModel.loadData($.sap.getModulePath("Managment.Dashboard", "/json/caveDetailByOne.json"), "", false);
			this.setModel(oCaveModel, "caveDetailByOne");
			var oDeviceModel = new JSONModel();
			oDeviceModel.loadData($.sap.getModulePath("Managment.Dashboard", "/json/deviceUL.json"), "", false);
			this.setModel(oDeviceModel, "deviceUL");
			var oSimulateModel = new JSONModel();
			oSimulateModel.loadData($.sap.getModulePath("Managment.Dashboard", "/json/simulateHistory.json"), "", false);
			this.setModel(oSimulateModel, "simulate");
        }
	})
});