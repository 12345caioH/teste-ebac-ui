///<reference types="cypress" />
import { faker } from '@faker-js/faker';

describe('Funcionalidade: Finalizar compra', () => {

    let nome ;
    let sobrenome ;
    let email ;

     beforeEach(() => {

        nome = faker.person.firstName()
        sobrenome = faker.person.lastName()
        email = faker.internet.email(nome)

        cy.visit('minha-conta')
    });


    it('Deve fazer cadastro na plataforma', () => {
        cy.get('#reg_email').type(email)
        cy.get('#reg_password').type('senhateste@123')
        cy.get(':nth-child(4) > .button').click()
        cy.get('.woocommerce-MyAccount-content > :nth-child(2)').should('exist')
        cy.get('.woocommerce-MyAccount-navigation-link--edit-account > a').click()
        cy.get('#account_first_name').type(nome)
        cy.get('#account_last_name').type(sobrenome)
        cy.get('.woocommerce-Button').click() 
        cy.get('.woocommerce-message').should('contain' , 'Detalhes da conta modificados com sucesso.')
    });


    it('Deve selecionar um produto', () => {
        cy.visit('produtos')
        cy.get('.products > .row')
        .contains('Atlas Fitness Tank')
        .click()
    });

    it('Deve adicionar o produto ao carrinho e finalizar compra', () => {
        cy.visit('produtos/atlas-fitness-tank')
        cy.get('.button-variable-item-M').click()
        cy.get(':nth-child(2) > .value > .variable-items-wrapper > .variable-item').click()
        cy.get('.single_add_to_cart_button').click()
        cy.get('.woocommerce-message > .button')
        .should('contain' , 'Ver carrinho')
        .click()
        cy.get('.checkout-button').click()

        cy.get('#billing_first_name').type(nome)
        cy.get('#billing_last_name').type(sobrenome)
        cy.get('#billing_company').type('Empresa')
        cy.get('#billing_address_1').type('Rua teste, 123')
        cy.get('#billing_address_2').type('Casa 1')
        cy.get('#billing_postcode').type('01234-567')
        cy.get('#billing_phone').type('11999999999')
        cy.get('#billing_email').type(email)
        cy.get('#order_comments').type('Apenas um teste de compra automatizado')
    });
});