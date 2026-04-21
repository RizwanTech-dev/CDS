sap.ui.define([
    "sap/m/MessageToast",
    "sap/ui/core/Fragment"
], function (MessageToast, Fragment) {
    'use strict';

    return {
        /**
         * Generated event handler.
         *
         * @param oContext the context of the page on which the event was fired. `undefined` for list report page.
         * @param aSelectedContexts the selected contexts of the table rows.
         */
        createBook: async function (oContext, aSelectedContexts) {
            // MessageToast.show("Custom handler invoked.");
            if (!this._oDialog) {
                this._oDialog = await Fragment.load({
                    name: "com.capproject.authors.ext.fragments.AddBooksAndChapters",
                    controller: this
                });

                this.base.getView().addDependent(this._oDialog);
            }

            this._oDialog.open();

        }

    }
    });
