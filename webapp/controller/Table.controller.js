sap.ui.define([
	"Managment/Dashboard/controller/BaseController",
	"Managment/Dashboard/util/formatter"
], function (BaseController, formatter) {
	"use strict";

	return BaseController.extend("Managment.Dashboard.controller.Table", {
		formatter: formatter,
		onInit: function () {
			this.getRouter().getRoute("RouteTable").attachMatched(this._onRouteMatched, this);
		},
		onAfterRendering: function () {
			var oFilter = [];
			oFilter.push(new sap.ui.model.Filter("Date", "EQ", "20190411-00:00:00"));
			oFilter.push(new sap.ui.model.Filter("CaveType", "EQ", "K01"));
			this.getView().byId("table").getBinding("items").filter(oFilter);
			// this.getView().byId("tableTitleId").addStyleClass("titleText");
		},
		_onRouteMatched: function () {
			this.getModel("app").setProperty("/showPageHeader", true);
			this.getModel("app").setProperty("/pageTitle", "總表");
		},
		onPress: function (oEvent) {
			var aFactoryId = this.getFilterFactory(oEvent);
			var oFilter = [];
			if(aFactoryId.length === 0){
				oFilter.push(new sap.ui.model.Filter("Date", "EQ", "20190411-00:00:00"));
				oFilter.push(new sap.ui.model.Filter("CaveType", "EQ", "K01"));
				this.getView().byId("table").getBinding("items").filter(oFilter);
			}else{
				for(var i = 0; i < aFactoryId.length;i++){
					oFilter.push(new sap.ui.model.Filter("ID", "EQ", aFactoryId[i]));
				}
				oFilter.push(new sap.ui.model.Filter("Date", "EQ", "20190411-00:00:00"));
				oFilter.push(new sap.ui.model.Filter("CaveType", "EQ", "K01"));
				this.getView().byId("table").getBinding("items").filter(oFilter);
			}
		}
	});
});