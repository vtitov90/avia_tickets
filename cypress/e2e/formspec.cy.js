describe("Form", () => {
  beforeEach(() => {
    cy.visit("http://localhost:9000/");
    cy.get("[data-hook=mainForm]").should("be.visible");

    // Вводим значения в поля автозаполнения
    cy.get("[data-hook=autocompleteOrigin]").as("autocompleteOrigin");
    cy.get("@autocompleteOrigin").should("be.visible");
    cy.get("@autocompleteOrigin").type("Пекин");
    cy.get("@autocompleteOrigin").should("have.value", "Пекин");

    cy.get("[data-hook=autocompleteDestination]").as("autocompleteDestination");
    cy.get("@autocompleteDestination").should("be.visible");
    cy.get("@autocompleteDestination").type("Токио");
    cy.get("@autocompleteDestination").should("have.value", "Токио");
  });

  it("When clicking on the depart datepicker the datepicker modal should open", () => {
    cy.get("[data-hook=datePickerDepartInput]").as("datePickerDepartInput");
    cy.get("[data-hook=datePickerDepartWrap] .datepicker-container").as(
      "modalWindow"
    );
    cy.get("@datePickerDepartInput").click();
    cy.get("@modalWindow").should("be.visible");
  });

  it("When clicking on the return datepicker the datepicker modal should open", () => {
    cy.get("[data-hook=datePickerReturnInput]").as("datePickerReturnInput");
    cy.get("[data-hook=datePickerReturnWrap] .datepicker-container").as(
      "modalWindow"
    );
    cy.get("@datePickerReturnInput").click();
    cy.get("@modalWindow").should("be.visible");
  });

  it("After selecting departing and return date, it should be displayed in the input field in the right format", () => {
    cy.get("[data-hook=datePickerDepartInput]").as("datePickerDepartInput");
    cy.get("[data-hook=datePickerDepartWrap] .datepicker-container").as(
      "modalWindow"
    );
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

    cy.get("@datePickerDepartInput").then(($input) => {
      const val = $input.val();
      //2023-07
      expect(val).to.match(/^\d{4}-\d{2}$/);
    });

    cy.get("[data-hook=datePickerReturnInput]").as("datePickerReturnInput");
    cy.get("[data-hook=datePickerReturnWrap] .datepicker-container").as(
      "modalWindow2"
    );
    cy.get("@datePickerReturnInput").click();
    cy.get("@modalWindow2").should("be.visible");

    cy.get(
      "[data-hook=datePickerReturnWrap] .datepicker-container .is-today"
    ).as("today2");
    cy.get(
      "[data-hook=datePickerReturnWrap] .datepicker-container .btn-flat"
    ).as("modalButtons2");
    cy.get("@today2").click();
    cy.get("@today2").should("have.class", "is-selected");
    cy.get("@modalButtons2").contains("Ok").click();

    cy.get("@datePickerReturnInput").then(($input2) => {
      const val2 = $input2.val();
      //2023-07
      expect(val2).to.match(/^\d{4}-\d{2}$/);
    });
  });

  it("When selecting the currency from the header dropdown it should be changed and visible in the header", () => {
    cy.get("[data-hook=currencySelect] .dropdown-trigger").as(
      "currencyTrigger"
    );
    cy.get("[data-hook=currencySelect] .dropdown-content li").as(
      "currencyItem"
    );
    cy.get("@currencyTrigger").click();
    cy.get("@currencyItem").contains("€ Euro").click();
    cy.get("@currencyTrigger").should("have.value", "€ Euro");
  });
});
