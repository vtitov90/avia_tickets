// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.add("reachThePage", () => {
  cy.intercept("GET", "https://aviasales-api.herokuapp.com/countries", {
    fixture: "countries.json",
  }).as("getCountries");
  cy.intercept("GET", "https://aviasales-api.herokuapp.com/cities", {
    fixture: "cities.json",
  }).as("getCities");
  cy.intercept("GET", "https://aviasales-api.herokuapp.com/airlines", {
    fixture: "airlines.json",
  }).as("getAirlines");

  cy.visit("http://localhost:9000/");

  cy.wait("@getCountries");
  cy.wait("@getCities");
  cy.wait("@getAirlines");
});

Cypress.Commands.add("initElements", () => {
  cy.visit("http://localhost:9000/");
  cy.get("[data-hook=autocompleteOrigin]").as("autocompleteOrigin");
  cy.get("[data-hook=autocompleteDestination]").as("autocompleteDestination");

  cy.get("[data-hook=datePickerDepartInput]").as("datePickerDepartInput");
  cy.get("[data-hook=datePickerDepartWrap] .datepicker-container").as(
    "modalWindow"
  );

  cy.get("[data-hook=submitButton]").as("submitButton");
  cy.get("[data-hook=resetButton]").as("resetButton");
});

Cypress.Commands.add("fillTheForm", () => {
  cy.get("@resetButton").click();

    cy.get("@autocompleteOrigin").type("Харьков");
    cy.get(".field-origin .autocomplete-content li:first")
      .contains("Харьков,Украина")
      .click();

    cy.get("@autocompleteDestination").type("Париж,");
    cy.get(".field-destination .autocomplete-content li:first")
      .contains("Париж,Франция")
      .click();

    cy.get("@datePickerDepartInput").click();
    cy.get("@modalWindow").should("be.visible");

    cy.get(
      "[data-hook=datePickerDepartWrap] .datepicker-container .is-today"
    ).as("today");
    cy.get(
      "[data-hook=datePickerDepartWrap] .datepicker-container .btn-flat"
    ).as("modalButtons");

    cy.get("@today").click();
    cy.get("@today").should("have.class", "is-selected");
    cy.get("@modalButtons").contains("Ok").click();
});
