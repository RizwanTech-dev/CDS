sap.ui.define([
    "sap/fe/test/JourneyRunner",
	"com/capproject/products/test/integration/pages/ProductsList",
	"com/capproject/products/test/integration/pages/ProductsObjectPage"
], function (JourneyRunner, ProductsList, ProductsObjectPage) {
    'use strict';

    var runner = new JourneyRunner({
        launchUrl: sap.ui.require.toUrl('com/capproject/products') + '/test/flpSandbox.html#comcapprojectproducts-tile',
        pages: {
			onTheProductsList: ProductsList,
			onTheProductsObjectPage: ProductsObjectPage
        },
        async: true
    });

    return runner;
});

