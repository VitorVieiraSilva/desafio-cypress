import cadastro from "../pages/cadastro";

describe('Create product', () => {

  beforeEach(() => {
    cy.visit('https://front.serverest.dev/')
  })

  context('Positive tests', () => {
    it('Create a valid product.', () => {
      cy.fixture('user').then((user) => {
        cy.get('[data-testid="email"]').type(user.email);
        cy.get('[data-testid="senha"]').type(Cypress.env('password'));
        cy.get('[data-testid="entrar"]').click();
      });

      cadastro.cadastrarProdutoValido();

      cy.fixture('product').then((product) => {
        cy.get('table tbody tr').contains(product.name)
          .scrollIntoView()
          .then(() => {
            cy.screenshot('viewport-com-produto', { capture: 'viewport', overwrite: true });
          });
      });

    });

  });

  context('Negative tests', () => {

    it.only('Create a product with missing fields.', () => {
      cy.fixture('user').then((user) => {
        cy.get('[data-testid="email"]').type(user.email);
        cy.get('[data-testid="senha"]').type(Cypress.env('password'));
        cy.get('[data-testid="entrar"]').click();

        cadastro.cadastrarProdutoInvalido();

        cy.contains('Quantidade é obrigatório').should('be.visible');
        cy.screenshot('produto-nao-cadastrado', { capture: 'viewport', overwrite: true });

      });
    });
  })
})
