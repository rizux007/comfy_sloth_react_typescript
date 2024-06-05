/// <reference types="cypress" />

describe("Barre de Navigation", () => {
  beforeEach(() => {
    cy.visit("http://localhost:8888/comfy_sloth_react_typescript");
  });

  it("Vérifie la présence des éléments dans la barre de navigation", () => {
    cy.url().should("include", "comfy_sloth_react_typescript");
    cy.get("[data-test='logo']").should("exist");
    cy.get("[data-test='home']").should("exist").click();
    cy.url().should("contain", "/");

    cy.get("[data-test='about']").should("exist").click();
    cy.url().should("contain", "/about");

    cy.get("[data-test='products']").should("exist").click();
    cy.url().should("contain", "/products");

    cy.get("[data-test='cart']").should("exist").first().click();
    cy.url().should("contain", "/cart");
  });

  it("Vérifie si les bouton de connexion existe et le checkout n'existe pas", () => {
    cy.get("[data-test='FaUserPlus']").should("exist");
    cy.get("[data-test='/checkout']").should("not.exist");
  });

  // it("Vérifie si le bouton de connexion n'existe pas et que le bouton checkout existe après connexion", () => {
  //   // Faites une requête POST à votre API de connexion
  //   cy.request('POST', 'https://dev-yolp04snkh5i6lp8.us.auth0.com/u/login', {
  //     username: 'votre_nom_utilisateur',
  //     password: 'votre_mot_de_passe'
  //   }).then((response) => {
  //     // Assurez-vous que la réponse est correcte et que vous obtenez un token ou un cookie
  //     expect(response.status).to.eq(200);
  //     const token = response.body.token; // Par exemple, si la réponse contient un token

  //     // Sauvegardez le token dans localStorage ou dans un cookie, selon comment votre application gère les sessions
  //     cy.setCookie('session_token', token);

  //     // Ensuite, visitez votre application en tant qu'utilisateur authentifié
  //     cy.visit('/');

  //     // Vérifiez que le bouton de connexion n'existe plus
  //     cy.get("[data-test='FaUserPlus']").should("not.exist");

  //     // Vérifiez que le bouton de checkout existe
  //     cy.get("[data-test='/checkout']").should("exist");
  //   });
  // });
});
