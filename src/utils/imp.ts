
// VITE_AUTH_DOMAIN=dev-yolp04snkh5i6lp8.us.auth0.com
// VITE_AUTH_CLIENT_ID=q73Jrv6kSr9EiidnrZ1HLIaOkxRU333c
// VITE_STRIPE_PUBLIC_KEY=pk_test_51PM7I8H3XXImQry6lR1tlmmALIJhmCPhFshHE2oEXqJcS3qb0O1OXo4sxQjFCAir7UEibrr4jdhkYFe8hKyvnXxJ00HtCsqa2j
// VITE_STRIPE_SECRET_KEY=sk_test_51PM7I8H3XXImQry6de9Xk4hfqW1wXNTEk2YkjJpHrHfCHJKLJjdLUxITOy0o2thRY6BxIoeon5DHpkyy6jvoq0tH00brIbDR8R




// /// <reference types="cypress" />






// describe("Barre de Navigation", () => {
//   beforeEach(() => {
//     cy.visit("http://localhost:8888/comfy_sloth_react_typescript");
//   });

//   it("Vérifie la présence des éléments dans la barre de navigation", () => {
//     cy.url().should("include", "comfy_sloth_react_typescript");
//     cy.get("[data-test='logo']").should("exist");
//     cy.get("[data-test='home']")
//       .should("exist")
//       .then(() => {
//         cy.get("[data-test='home']")
//           .contains("home")
//           .click()
//           .then(() => {
//             cy.url().should("contain", "/");
//           });
//       });
//     cy.get("[data-test='about']")
//       .should("exist")
//       .then(() => {
//         cy.get("[data-test='about']")
//           .contains("about")
//           .click()
//           .then(() => {
//             cy.url().should("contain", "/about");
//           });
//       });
//     cy.get("[data-test='products']")
//       .should("exist")
//       .then(() => {
//         cy.get("[data-test='products']")
//           .contains("products")
//           .click()
//           .then(() => {
//             cy.url().should("contain", "/products");
//           });
//       });

//     cy.get("[data-test='cart']").should("exist").first().click();

//     it("shows FaPlus button when user is not authenticated", () => {
//       // Simulating user not authenticated
//       cy.window().then((win) => {
//         win.localStorage.setItem("user", "false");
//       });

//       cy.reload();

//       // Check that FaPlus button is visible
//       cy.get(".nav-toggle").should("be.visible");
//       cy.get("[data-test='/checkout']").should("not.contain", "checkout");
//     });

//     it("shows checkout link when user is authenticated", () => {
//       // Simulating user authenticated
//       cy.window().then((win) => {
//         win.localStorage.setItem("user", "true");
//       });

//       cy.reload();

//       // Check that the checkout link is visible
//       cy.get("[data-test='/checkout']").should("contain", "checkout");
//     });

//   });
// });