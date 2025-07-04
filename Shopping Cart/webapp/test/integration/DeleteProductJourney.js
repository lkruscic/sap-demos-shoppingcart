/*!
 * OpenUI5
 * (c) Copyright 2025 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
/*
 global QUnit
 */
sap.ui.define([
	"sap/base/i18n/Localization",
	"sap/ui/test/opaQunit",
	"./pages/Home",
	"./pages/Category",
	"./pages/Product",
	"./pages/Cart",
	"./pages/Dialog"
], function (Localization, opaTest) {
	"use strict";

	var sDefaultLanguage = Localization.getLanguage();

	QUnit.module("Delete Product Journey", {
		before : function () {
			Localization.setLanguage("en-US");
		},
		after : function () {
			Localization.setLanguage(sDefaultLanguage);
		}
	});

	opaTest("Should see the product list", function (Given, When, Then) {
		// Arrangements
		Given.iStartMyApp();

		// Actions
		When.onHome.iPressOnTheFlatScreensCategory();

		// Assertions
		Then.onTheCategory.iShouldBeTakenToTheFlatScreensCategory().
			and.iShouldSeeTheProductList().
			and.iShouldSeeSomeEntriesInTheProductList();
	});

	opaTest("Should add a product to the cart and enable the edit button", function (Given, When, Then) {
		// Actions
		When.onTheCategory.iPressOnTheFirstProduct();
		When.onTheProduct.iAddTheDisplayedProductToTheCart();
		When.onTheProduct.iToggleTheCart();

		// Assertions
		Then.onTheCart.iShouldSeeTheProductInMyCart().
		and.iShouldSeeTheEditButtonEnabled().
		and.iShouldSeeTheProceedButtonEnabled;
	});

	opaTest("Should see the delete button after pressing the edit button", function (Given, When, Then) {
		// Actions
		When.onTheCart.iPressOnTheEditButton();

		// Assertions
		Then.onTheCart.iShouldSeeTheDeleteButton();
	});

	opaTest("Should see the confirmation dialog", function (Given, When, Then) {
		// Actions
		When.onTheCart.iPressOnTheDeleteButton();

		// Assertions
		Then.onTheDialog.iShouldBeTakenToTheConfirmationDialog();
	});

	opaTest("Should cancel the delete process", function (Given, When, Then) {
		// Actions
		When.onTheDialog.iPressCancelOnTheConfirmationDialog();

		// Assertions
		Then.onTheCart.iShouldBeTakenToTheCart();
	});

	opaTest("Should see the edit button", function (Given, When, Then) {
		// Actions
		When.onTheCart.iPressOnTheSaveChangesButton();

		// Assertions
		Then.onTheCart.iShouldSeeTheEditButtonEnabled();
	});

	opaTest("Should delete the product from the cart", function (Given, When, Then) {
		// Actions
		When.onTheCart.iPressOnTheEditButton().and.iPressOnTheDeleteButton();
		When.onTheDialog.iPressDeleteButtonOnTheConfirmationDialog();

		// Assertions
		Then.onTheCart.iShouldNotSeeTheDeletedItemInTheCart().
			and.iShouldSeeTheTotalPriceEqualToZero();
	});

	opaTest("Edit button should be disabled", function (Given, When, Then) {
		// Actions
		When.onTheCart.iPressOnTheSaveChangesButton();
		// Assertions
		Then.onTheCart.iShouldSeeTheEditButtonDisabled().
		and.iShouldSeeTheProceedButtonDisabled();
		// Cleanup
		Then.iTeardownMyApp();
	});

});
