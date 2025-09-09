///<reference types="cypress" /> 
const { da } = require('@faker-js/faker');
const perfil = require('../../fixtures/perfil.json')

describe('Funcionalidade: Login', () => {

    beforeEach(() => {
        cy.visit('my-account')
    });

    /*afterEach(() => {
        cy.screenshot()
    })*/

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

    it.only('Deve exibir uma mensagem de erro ao inserir senha inválida', () => {
        cy.get('#username').type('caio@123gmail.com')
        cy.get('#password').type('caio@@@@')
        cy.get('.woocommerce-form > .button').click()
        cy.get('.woocommerce-error').should('contain', 'Erro: A senha fornecida para o e-mail caio@123gmail.com está incorreta. Perdeu a senha?')
        cy.get('.woocommerce-error').should('exist')  
    });

    it('Deve fazer login com sucesso - Usando massa de dados', () => {
        cy.get('#username').type(perfil.usuário)
        cy.get('#password').type(perfil.senha)
        cy.get('.woocommerce-form > .button').click()
        cy.get('.woocommerce-MyAccount-content > :nth-child(2)').should('contain', `Olá, caio (não é caio? Sair)`)
    });

    it('Deve fazer login com sucesso - Usando fixtures', () => {
        cy.fixture('perfil').then(dados =>{
            cy.get('#username').type(dados.usuário , {log:false}),
            cy.get('#password').type(dados.senha , {log:false}),
            cy.get('.woocommerce-form > .button').click()
            cy.get('.woocommerce-MyAccount-content > :nth-child(2)').should('contain', 'Olá, caio (não é caio? Sair')
        })
    });

    it('Deve fazer login com sucesso - usando comandos customizados', () => {
       cy.login('caio@123gmail.com' , 'caio123@')
       cy.get('.woocommerce-MyAccount-content > :nth-child(2)').should('contain', 'Olá, caio (não é caio? Sair)')
    })
    
});
