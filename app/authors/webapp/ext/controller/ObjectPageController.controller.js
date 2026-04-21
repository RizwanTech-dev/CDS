// const { func } = require("@sap/cds/lib/ql/cds-ql");

sap.ui.define([
	'sap/ui/core/mvc/ControllerExtension',
	'sap/ui/core/Fragment',
	'sap/ui/base/Event',
	'sap/ui/model/json/JSONModel'

], function (ControllerExtension, Fragment, Event, JSONModel) {
	'use strict';

	return ControllerExtension.extend('com.capproject.authors.ext.controller.ObjectPageController', {
		// this section allows to extend lifecycle hooks or hooks provided by Fiori elements
		override: {
			/**
			 * Called when a controller is instantiated and its View controls (if available) are already created.
			 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
			 * @memberOf com.capproject.authors.ext.controller.ObjectPageController
			 */
			onInit: function () {
				// you can access the Fiori elements extensionAPI via this.base.getExtensionAPI
				this.getView().setModel(new JSONModel(), "booksDialogMdl")
					// for getting author id
		
			}
		},
		createBook: async function () {
			console.log("createBook");

			if (!this._oDialog) {
				this._oDialog = await Fragment.load({
					id: this.base.getView().getId(), // 🔥 VERY IMPORTANT
					name: "com.capproject.authors.ext.fragment.AddBooksAndChapters",
					controller: this
				});

				this.base.getView().addDependent(this._oDialog);
			}

			this._oDialog.open(); // ✅ correct reference
		},

		onSaveDialog: function () {
			     var oContext = this.base.getExtensionAPI().getBindingContext();
				let sAuthorId = oContext?.getProperty("ID") ||null;

			var oLocal = this.getView().getModel("booksDialogMdl").getData();
			var oModel = this.getView().getModel();

			var oBinding = oModel.bindList("/Books");

			var oContext = oBinding.create({
				title: oLocal.title,
				type: oLocal.type,
				cost: oLocal.cost,
				currency_code: oLocal.currency,
				author_ID: sAuthorId        //oLocal.author_ID
			});

			oContext.created().then(function () {
				sap.m.MessageToast.show("Book Created");
			}).catch(function () {
				sap.m.MessageToast.show("Error");
			});

			this._oDialog.close();
		},

		onCloseDialog: function () {
			this._oDialog.close(); // ✅ now works
		}
	});
});
