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
}

export default new helperApi();