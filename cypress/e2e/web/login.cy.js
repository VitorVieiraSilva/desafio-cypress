import login from "../../pages/login"

describe('Login', () => {

  beforeEach(() => {
    cy.visit('https://front.serverest.dev/')
  })

  context('Testes positivos', () => {
    it('login with valid user', () => {
      login.validLogin();

      cy.contains('Bem Vindo Vitor').should('be.visible')
    })

  })

  context('Testes negativos', () => {
    it('login with invalid password', () => {
      login.invalidLogin();

      cy.contains('Email e/ou senha inválidos').should('be.visible')
    })
  })
})