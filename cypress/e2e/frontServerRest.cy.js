describe('Login', () => {

  beforeEach(() => {
    cy.visit('https://front.serverest.dev/')
  })

  context('Testes positivos', () => {
    it('login with valid user', () => {
      cy.fixture('user').then((user) => {
        cy.get('[data-testid="email"]').type(user.email)
        cy.get('[data-testid="senha"]').type(Cypress.env('password'))
        cy.get('[data-testid="entrar"]').click()
      })
      cy.contains('Bem Vindo Vitor').should('be.visible')
    })

  })

  context('Testes negativos', () => {
    it('login with invalid password', () => {
      cy.fixture('user').then((user) => {
        cy.get('[data-testid="email"]').type(user.email)
        cy.get('[data-testid="senha"]').type(user.invalidPassword)
        cy.get('[data-testid="entrar"]').click()
      })
      cy.contains('Email e/ou senha inválidos').should('be.visible')
    })
  })

})