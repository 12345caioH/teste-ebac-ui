///<reference types="cypress" /> 

describe('Funcionalidade: Login', () => {

    beforeEach(() => {
        cy.visit('http://lojaebac.ebaconline.art.br/my-account/')
    });

    afterEach(() => {
        cy.screenshot()
    })

    it('Deve fazer login com sucesso', () => {    
        cy.get('#username').type('caio@123gmail.com')
        cy.get('#password').type('caio123@')
        cy.get('.woocommerce-form > .button').click()
        cy.get('.woocommerce-MyAccount-content > :nth-child(2)').should('contain', 'Olá, caio (não é caio? Sair)')
    })
    
    it('Deve exibir uma mensagem de erro ao inserir usuário inválido', () => {        
        cy.get('#username').type('fabio@123gmail.com')
        cy.get('#password').type('caio123@')
        cy.get('.woocommerce-form > .button').click()
        cy.get('.woocommerce-error').should('exist')
    });

    it('Deve exibir uma mensagem de erro ao inserir senha inválida', () => {
        cy.get('#username').type('caio@123gmail.com')
        cy.get('#password').type('caio@@@@')
        cy.get('.woocommerce-form > .button').click()
        cy.get('.woocommerce-error').should('contain', 'Erro: A senha fornecida para o e-mail caio@123gmail.com está incorreta. Perdeu a senha?')
        cy.get('.woocommerce-error').should('exist')
        
    });
})


