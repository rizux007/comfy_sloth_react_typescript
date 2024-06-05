/// <reference types="cypress" />

describe("Tri sur les produits", () => {
  beforeEach(() => {
    cy.intercept(
      "GET",
      "https://strapi-store-server.onrender.com/api/products"
    ).as("articles");
    cy.visit("http://localhost:8888/comfy_sloth_react_typescript/products");
  });

  it("Attendre le chargement de tous les produits", () => {
    cy.wait("@articles");
  });

  it("Vérifie si la class active apparait au clique sur la grid ou list view", () => {
    cy.get('[data-test="list"]')
      .click()
      .then(() => {
        cy.get('[data-test="list"]').should("have.class", "active");
      });
    cy.wait("@articles");

    cy.get('[data-test="grid"]')
      .click()
      .then(() => {
        cy.get('[data-test="grid"]').should("have.class", "active");
      });
  });

  it("Vérifie la sélection de l'option de tri dans le select", () => {
    cy.get('[data-test="priceName"]').select("price-lowest");

    cy.get('[data-test="priceName"]').should("have.value", "price-lowest");

    cy.get('[data-test="priceName"]').select("price-highest");
    cy.get('[data-test="priceName"]').should("have.value", "price-highest");

    cy.get('[data-test="priceName"]').select("name-a");
    cy.get('[data-test="priceName"]').should("have.value", "name-a");

    cy.get('[data-test="priceName"]').select("name-z");
    cy.get('[data-test="priceName"]').should("have.value", "name-z");
  });
});

describe("Filtre sur les produits", () => {
  beforeEach(() => {
    cy.intercept(
      "GET",
      "https://strapi-store-server.onrender.com/api/products"
    ).as("articles");
    cy.visit("http://localhost:8888/comfy_sloth_react_typescript/products");
  });

  it("Recherche de produit inexistant", () => {
    cy.wait("@articles");
    cy.get(".search-input").type("produit non existant");
    cy.get(".section-center > :nth-child(2) > h5").contains(
      "Sorry, no products matched your search..."
    );
  });

  it("Recherche de produit existant", () => {
    cy.reload();
    cy.wait("@articles");
    cy.get(".search-input").type("lamp");
    cy.wait("@articles");
    cy.get(".section-center > :nth-child(2) > h5").should("not.exist");
  });

  it("Rechargement de la page", () => {
    cy.reload();
    cy.wait("@articles");
  });

  it("Vérifier le click de la catégorie", () => {
    cy.get('[value="Tables"]').click().contains("Tables");
    cy.reload();
    cy.wait("@articles");
  });
});

describe("Vérification sur le single product", () => {
  beforeEach(() => {
    cy.intercept(
      "GET",
      "https://strapi-store-server.onrender.com/api/products"
    ).as("articles");
    cy.visit("http://localhost:8888/comfy_sloth_react_typescript/products");
  });

  it("Verifie si au click d'un produit ca l'envoie sur sa page", () => {
    cy.reload();
    cy.wait("@articles");
    cy.get('[data-test="list"]')
      .click()
      .then(() => {
        cy.get('[data-test="list"]').should("have.class", "active");
        cy.get(":nth-child(1) > div > .btn").click();
      });
    // cy.wait("@articles");
    // cy.get(":nth-child(1) > div > .btn").click();
  });

  it("Verifier si le ajout du nombre de produit fonctionne", () => {
    cy.reload();
    cy.wait("@articles");
    cy.get('[data-test="list"]')
      .click()
      .then(() => {
        cy.get('[data-test="list"]').should("have.class", "active");
        cy.get(":nth-child(1) > div > .btn").click();
        cy.get('[data-test="FaPlus"]').click();
        cy.wait(3000);
        cy.get('[data-test="FaMinus"]').click();
        cy.wait(3000);
        cy.get(".btn-container > .btn").click();
      });
  });

  it("Verifier le fonctionnement du remove du cart", () => {
    cy.reload();
    cy.wait("@articles");
    cy.get('[data-test="list"]')
      .click()
      .then(() => {
        cy.get('[data-test="list"]').should("have.class", "active");
        cy.get(":nth-child(1) > div > .btn").click();
        cy.get('[data-test="FaPlus"]').click();
        cy.wait(3000);
        cy.get('[data-test="FaMinus"]').click();
        cy.wait(3000);
        cy.get(".btn-container > .btn").click();
        cy.get(".remove-btn").click();
      });
  });

  // it("Verifier le fonctionnement du procédé à l'achat", () => {
  //   cy.reload();
  //   cy.wait("@articles");
  //   cy.get('[data-test="list"]')
  //     .click()
  //     .then(() => {
  //       cy.get('[data-test="list"]').should("have.class", "active");
  //       cy.get(":nth-child(1) > div > .btn").click();
  //       cy.get('[data-test="FaPlus"]').click();
  //       cy.wait(3000);
  //       cy.get('[data-test="FaMinus"]').click();
  //       cy.wait(3000);
  //       cy.get(".btn-container > .btn").click();
  //     });
  // });
});
