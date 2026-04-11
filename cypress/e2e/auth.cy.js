describe("Portfolio App Tests", () => {

  it("Login Test", () => {
    cy.visit("http://localhost:3000/login");

    cy.get("input[placeholder='Email']").type("saniya@test.com");
    cy.get("input[placeholder='Password']").type("123456");

    cy.contains("Login").click();
  });

  it("Add Project Test", () => {
    cy.visit("http://localhost:3000/projects");

    cy.get("input[placeholder='Title']").type("Cypress Project");
    cy.get("input[placeholder='Description']").type("Testing");

    cy.contains("Add Project").click();
  });

});