declare namespace Cypress {
    interface Chainable<Subject = any> {
      getDataTest(selector: string): Chainable<Subject>;
    }
  }