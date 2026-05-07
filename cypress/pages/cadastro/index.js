import { elements } from "./elements";

class cadastro {

cadastrarProdutoValido() {
    cy.get('[data-testid="cadastrarProdutos"]').click();
    cy.fixture('product').then((product) => {
    cy.get('[data-testid="nome"]').type(product.name);
        cy.get('[data-testid="preco"]').type(product.price.toString());
        cy.get('[data-testid="descricao"]').type(product.description);
        cy.get('[data-testid="quantity"]').type(product.quantity.toString());
        cy.get('[data-testid="cadastarProdutos"]').click();
        });
    }
cadastrarProdutoInvalido() {
cy.get('[data-testid="cadastrarProdutos"]').click();
    cy.fixture('product').then((product) => {
    cy.get('[data-testid="nome"]').type(product.name);
        cy.get('[data-testid="preco"]').type(product.price.toString());
        cy.get('[data-testid="descricao"]').type(product.description);
        cy.get('[data-testid="cadastarProdutos"]').click();
        });
}
}

export default new cadastro();