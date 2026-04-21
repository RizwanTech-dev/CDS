sap.ui.define([
	"sap/ui/core/mvc/ControllerExtension",
	"sap/m/Dialog",
	 "sap/m/Button"
], function (
	ControllerExtension,
	Dialog,
	Button



) {
	'use strict';

	return ControllerExtension.extend('com.capproject.authors.ext.controller.ListReportController', {
		// this section allows to extend lifecycle hooks or hooks provided by Fiori elements
		override: {
			/**
			 * Called when a controller is instantiated and its View controls (if available) are already created.
			 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
			 * @memberOf com.capproject.authors.ext.controller.ListReportController
			 */
			onInit: function () {
				// you can access the Fiori elements extensionAPI via this.base.getExtensionAPI
				var oModel = this.base.getExtensionAPI().getModel();
				console.log("ListReportController Triggered");
			}

		},
		openDialog: function () {
			var that = this;
			console.log("openDialog");

			this.oDialog = new Dialog({
				title: "Wanna change Profile?",
				verticalScrolling: false,
				content: [],
				beginButton: new Button({
					text: "Upload",
					type: "Emphasized",
					press: function () {
						// that.onPressUpdateProfile();
						console.log("save triggered");
					}
				}),

				endButton: new Button({
					text: "Cancel",
					press: function () {
						console.log("Close triggered");
						that.oDialog.close();
					}
				})
			});

			  this.oDialog.open();

		}

	});
});
