///<reference types="cypress" /> 

describe('Funcionaidade: Login', () => {

    it('Deve fazer login com sucesso', () => {
        cy.visit('http://lojaebac.ebaconline.art.br/my-account/')
        cy.get('#username').type('caio@123gmail.com')
        cy.get('#password').type('caio123@')
        cy.get('.woocommerce-form > .button').click()

        cy.get('.woocommerce-MyAccount-content > :nth-child(2)').should('contain', 'Olá, caio (não é caio? Sair)')
    })
    
})


