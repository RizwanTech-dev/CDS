sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/Fragment",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast",
    "sap/m/MessageBox"
], function (Controller, Fragment, JSONModel, MessageToast, MessageBox) {
    "use strict";

    return Controller.extend("your.namespace.controller.BooksObjectPage", {

        // -------------------------------------------------------
        // Lifecycle
        // -------------------------------------------------------
        onInit: function () {
            // Initialize a JSON model to hold new chapter data
            const oNewChapterModel = new JSONModel({
                chapterName: "",
                isValid: false
            });
            this.getView().setModel(oNewChapterModel, "newChapter");
        },

        // -------------------------------------------------------
        // Open Dialog
        // -------------------------------------------------------
        onAddChapter: function () {
            const oView = this.getView();

            // Reset the model before opening
            oView.getModel("newChapter").setData({
                chapterName: "",
                isValid: false
            });

            // Load fragment only once (lazy loading)
            if (!this._oAddChapterDialog) {
                Fragment.load({
                    id: oView.getId(),
                    name: "your.namespace.fragments.AddChapter", // ← update namespace
                    controller: this
                }).then(oDialog => {
                    this._oAddChapterDialog = oDialog;
                    oView.addDependent(oDialog);  // Ensures model propagation
                    oDialog.open();
                });
            } else {
                this._oAddChapterDialog.open();
            }
        },

        // -------------------------------------------------------
        // Live Validation
        // -------------------------------------------------------
        onChapterNameLiveChange: function (oEvent) {
            const sValue = oEvent.getParameter("value").trim();
            this.getView().getModel("newChapter").setProperty(
                "/isValid",
                sValue.length > 0
            );
        },

        // -------------------------------------------------------
        // Save Chapter
        // -------------------------------------------------------
        onSaveChapter: function () {
            const oModel = this.getView().getModel("newChapter");
            const sChapterName = oModel.getProperty("/chapterName").trim();

            if (!sChapterName) {
                MessageBox.error(this.getView().getModel("i18n")
                    .getResourceBundle().getText("chapterNameRequired"));
                return;
            }

            // Get the OData V4 binding context of the current Book
            const oBindingContext = this.getView().getBindingContext();

            // Create a new Chapter entry via OData V4
            const oChaptersBinding = oBindingContext
                .getModel()
                .bindList("/Chapters", oBindingContext, [], [], {
                    $$updateGroupId: "chaptersGroup"
                });

            // Use the table's list binding instead for inline creation
            const oTable = this.byId("chaptersTable"); // ← match your table id
            const oTableBinding = oTable.getBinding("items");

            oTableBinding.create({
                chapterName: sChapterName,
                book_ID: oBindingContext.getProperty("ID")
            });

            // Submit the batch
            oBindingContext.getModel().submitBatch("$auto").then(() => {
                MessageToast.show(
                    this.getView().getModel("i18n")
                        .getResourceBundle().getText("chapterSaved")
                );
                this._oAddChapterDialog.close();
            }).catch(oError => {
                MessageBox.error("Error saving chapter: " + oError.message);
            });
        },

        // -------------------------------------------------------
        // Cancel / Close
        // -------------------------------------------------------
        onCancelChapter: function () {
            this._oAddChapterDialog.close();
        }
    });
});