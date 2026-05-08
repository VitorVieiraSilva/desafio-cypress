import helperApi from '../../pages/helperApi';

let token;
let productId;

before(() => {
  helperApi.checkAndDeleteProductByApi();
  helperApi.loginAndGetToken().then((t) => {
    token = t;
  });
});

describe('API - de Produto', () => {

  it('Deve cadastrar um novo produto com sucesso', () => {
    cy.fixture('product').then((product) => {
      cy.request({
        method: 'POST',
        url: 'https://serverest.dev/produtos',
        headers: { Authorization: token },
        body: {
          nome: product.name,
          preco: product.price,
          descricao: product.description,
          quantidade: product.quantity
        }
      }).then((response) => {
        expect(response.status).to.eq(201);
        expect(response.body.message).to.eq('Cadastro realizado com sucesso');
      });
    });
  });

  const product = {
    name: `Produto Cypress ${Date.now()}`,
    price: 200,
    description: 'Produto para exclusão',
    quantity: 5
  };

  it('Deve excluir o produto criado', () => {
    helperApi.createProductByApi(product, token).then((productId) => {
      cy.log(`Produto criado com ID: ${productId}`);
      cy.request({
        method: 'DELETE',
        url: `https://serverest.dev/produtos/${productId}`,
        headers: { Authorization: token }
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.message).to.eq('Registro excluído com sucesso');
      });
    });
  });

  it('Deve listar produtos e validar que existe pelo menos um', () => {
    cy.request('GET', 'https://serverest.dev/produtos')
      .then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.produtos).to.be.an('array');
        expect(response.body.produtos.length).to.be.greaterThan(0);

        expect(response.body.produtos[0]).to.have.property('nome');
      });
  });

});
