sap.ui.define([
    "sap/ui/core/Control",
    "sap/m/Bar",
    "sap/m/Button",
    "sap/ui/unified/Calendar",

], function (Control, Bar, Button, Calendar) {
    "use strict";
    return Control.extend("sap.voc.customcontrol.monthPicker", {
        metadata: {
            properties: {
                width: {
                    type: "sap.ui.core.CSSSize", //this is optional, but it helps prevent errors in your code by enforcing a type
                    defaultValue: "100%" //this is also optional, but recommended, as it prevents your properties being null
                },
                height: {
                    type: "sap.ui.core.CSSSize",
                    defaultValue: "auto"
                },
                month: {
                    type: "int",
                    defaultValue: 0
                },
                year: {
                    type: "int",
                    defaultValue: new Date().getFullYear()
                }
            },
            aggregations: {
                _calendar: {
                    type: "sap.ui.unified.calendar.MonthPicker",
                    multiple: false,
                    visibility: "hidden"
                },
                _bar: {
                    type: "sap.m.Bar",
                    multiple: false,
                    visibility: "hidden"
                },
                _button: {
                    type: "sap.m.Button"
                }
            },
            events: {
            selectMonth:{}
            }
        },
        onAfterRendering: function () {
            if (sap.ui.core.Control.prototype.onAfterRendering) {
                sap.ui.core.Control.prototype.onAfterRendering.apply(this, arguments);
            }
            if (this.getYear()) {
                this.getAggregation("_bar").getContentMiddle()[0].setText(this.getYear());
            }

         $('.sapUiCalMonthPicker').css('width','100%');
        },
        init: function () {
            var that = this;
            this.setAggregation("_bar", new Bar({
                design: "Header",
                contentLeft: new Button({
                    press:this.setDown.bind(this),
                    icon: "sap-icon://slim-arrow-left"
                }),
                contentMiddle: new Button({
                    text: that.getYear()
                }),
                contentRight: new Button({
                    press:this.setUp.bind(this),
                    icon: "sap-icon://slim-arrow-right"
                }),
            }));
            this.setAggregation("_calendar",
                new sap.ui.unified.calendar.MonthPicker({
                    width:"100%",
                    month:this.getMonth(),
                    select:this.seletMonth.bind(this)
                })
          
            )
        },
        setUp:function(){
            var value = this.getYear();
            this.setProperty("year", value+1);
        
        },
        seletMonth:function(){
           var month = this.getAggregation("_calendar").getMonth();
           this.setProperty("month",month);
           this.fireSelectMonth();
        },
        setDown:function(){
            var value = this.getYear();
            this.setProperty("year", value-1);
        },
        renderer: function (oRM, oControl) {
            oRM.write("<div");
            oRM.write(" style=\"width: " + oControl.getWidth() + "; height: " + oControl.getHeight() + ";\"");
            oRM.writeControlData(oControl);
            //oRM.addClass("myAppDemoWTProductRating");
            oRM.writeClasses();
            oRM.write(">");
            oRM.renderControl(oControl.getAggregation("_bar"));
            oRM.renderControl(oControl.getAggregation("_calendar"));
            oRM.write("</div>");
        }
    });
});