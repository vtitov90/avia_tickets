describe("Test search request", () => {
  before("visit homepage", () => {
    cy.reachThePage();
  });

  beforeEach(() => {
    cy.initElements();

    cy.fillTheForm();
  });

  it("Form submit with correct request params", () => {
    cy.intercept(
      "GET",
      "https://aviasales-api.herokuapp.com/prices/cheap*",
      (req) => {
        expect(req.query.currency).to.equal("USD");
        expect(req.query.depart_date).to.equal("2023-07");
        expect(req.query.origin).to.equal("HRK");
        expect(req.query.destination).to.equal("PAR");
      }
    );

    cy.get("@submitButton").click();
  });

  it("Tickets display correctly", () => {
    cy.intercept("GET", "https://aviasales-api.herokuapp.com/prices/cheap*", {
      fixture: "tickets.json",
    });
    cy.get("@submitButton").click();
    cy.get("[data-hook=ticketsContainer]").as("ticketsContainer");
    cy.get("@ticketsContainer").find(".ticket-card").should("have.length", 2);
  });
});
