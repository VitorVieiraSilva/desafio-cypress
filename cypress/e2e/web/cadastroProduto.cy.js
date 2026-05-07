import cadastro from "../../pages/cadastro";
import login from "../../pages/login";
import helperApi from "../../pages/helperApi";

describe('Create product', () => {

  before(() => {
    helperApi.createUserByApi();
    helperApi.checkAndDeleteProductByApi();
  })
  beforeEach(() => {
    cy.visit('https://front.serverest.dev/')
  })

  context('Positive tests', () => {
    it('Create a valid product.', () => {
      login.validLogin();

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

    it('Create a product with missing fields.', () => {
      login.validLogin();

      cadastro.cadastrarProdutoInvalido();

      cy.contains('Quantidade é obrigatório').should('be.visible');
      cy.screenshot('produto-nao-cadastrado', { capture: 'viewport', overwrite: true });

      });
    });
  })
