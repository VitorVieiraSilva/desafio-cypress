class helperApi {
    createUserByApi() {
    cy.fixture('user').then((user) => {
    cy.request('GET', 'https://serverest.dev/usuarios')
    .then((response) => {
        const usuarioExistente = response.body.usuarios.find(
         (u) => u.email === user.email
        );
          if (!usuarioExistente) {
            cy.request('POST', 'https://serverest.dev/usuarios', {
              nome: user.name,
              email: user.email,
              password: Cypress.env('password'),
              administrador: 'true'
            }).then((response) => {
              expect(response.status).to.eq(201);
              expect(response.body.message).to.eq('Cadastro realizado com sucesso');
            });
            }
            });
        });
    }

    checkAndDeleteProductByApi() {
    cy.fixture('product').then((product) => {
    cy.fixture('user').then((user) => {
    let token;

// 1. Faz login e captura o token
    cy.request('POST', 'https://serverest.dev/login', {
    email: user.email,
    password: Cypress.env('password')
    }).then((response) => {
    expect(response.status).to.eq(200);
    token = response.body.authorization; // Assign to outer scope variable
    });
    // Verifica se o produto já existe
    cy.request('GET', 'https://serverest.dev/produtos')
      .then((response) => {
        const produtoExistente = response.body.produtos.find(
          (p) => p.nome === product.name
        );

    if (produtoExistente) {
          // Se existir, exclui
        cy.log(`Produto já existe, será excluído: ${produtoExistente._id}`);
        cy.request({
          method: 'DELETE',
          url: `https://serverest.dev/produtos/${produtoExistente._id}`,
          headers: {
          Authorization: token
            }
          }).then((deleteResponse) => {
            expect(deleteResponse.status).to.eq(200);
            expect(deleteResponse.body.message).to.eq('Registro excluído com sucesso');
          });
        } else {
          cy.log('Produto não existe, pronto para criação.');
        }
      });
    });
    });
    }

loginAndGetToken() {
    return cy.fixture('user').then((user) => {
      return cy.request('POST', 'https://serverest.dev/login', {
        email: user.email,
        password: Cypress.env('password')
      });
    }).then((response) => {
      expect(response.status).to.eq(200);
      return response.body.authorization; // só esse return é necessário
    });
  }

  createProductByApi(product, token) {
    return cy.request({
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
      cy.log(`ID do produto: ${response.body._id}`);
      return cy.wrap(response.body._id);
    });
  }
}
export default new helperApi();