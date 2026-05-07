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
}
export default new helperApi();