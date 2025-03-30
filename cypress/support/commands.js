import * as locators from '../support/locators'
import 'cypress-iframe';

Cypress.Commands.add('LoginToChargeBack',(user)=>{
    cy.visit(Cypress.env('baseUrl'))
    cy.get(locators.emailField).type(Cypress.env('userEmail'))
    cy.get(locators.passwordField).type(Cypress.env('password'),{log: false})
    cy.get(locators.loginButton).contains('Log In').click()
    cy.get(locators.mainNavigation).should('be.visible')
    if(user === 'admin'){
        cy.get(locators.roleIcon).eq(0).trigger('mouseover')
        cy.get(locators.dropdownMenu).should('be.visible')
        cy.contains('Administrator').click()
    }
    else if(user === 'customer1'){
        cy.get(locators.roleIcon).eq(0).trigger('mouseover')
        cy.get(locators.dropdownMenu).should('be.visible')
        cy.contains('Customer 1').click()
        cy.get(locators.tableWithProducts).should('not.exist')
    }
    else if (user === 'customer2'){
        cy.get(locators.roleIcon).eq(0).trigger('mouseover')
        cy.get(locators.dropdownMenu).should('be.visible')
        cy.contains('Customer 2').click()
        cy.get(locators.tableWithProducts).should('not.exist')
    }
    else {
        throw Error ('INVALID USER!!')
    }
})
Cypress.Commands.add('GenerateRandomProduct',(length)=>{
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
      }
      
)
Cypress.on('uncaught:exception', (err, runnable) => {
    return false; // Ignore all uncaught exceptions
});
