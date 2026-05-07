import { elements } from "./elements";

class login {
    validLogin() {
        cy.fixture('user').then((user) => {
          cy.get('[data-testid="email"]').type(user.email);
          cy.get('[data-testid="senha"]').type(Cypress.env('password'));
          cy.get('[data-testid="entrar"]').click();
        });
    }

    invalidLogin() {
        cy.fixture('user').then((user) => {
        cy.get('[data-testid="email"]').type(user.email)
        cy.get('[data-testid="senha"]').type(user.invalidPassword)
        cy.get('[data-testid="entrar"]').click()
      })
}
}

export default new login();