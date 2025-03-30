import * as helper from '../support/helpers'

describe('Admin tests',{retries: 1},()=>{
    context('Product iteractions',()=>{
        const product = ['popcorn machine',2.50,10]
        beforeEach(()=>{
            cy.clearAllCookies()
            cy.clearAllSessionStorage()
        })
        it('Add product as admin',()=>{
            cy.LoginToChargeBack('admin')       
            helper.addProductAsAdmin(product[0],product[1],product[2])
        })
        it('Search a product',()=>{
            cy.LoginToChargeBack('admin') 
            cy.visit(`${Cypress.env('baseUrl')}products?`)
            helper.searchForProduct(product[0]) //bug with the search link to JIRA/ TICKET ID
        })
        it('Delete a product',()=>{   // bug with deletion of products - link to the JIRA ticket / Ticket ID
            cy.LoginToChargeBack('admin')
            cy.visit(`${Cypress.env('baseUrl')}products?`)
            helper.deleteProducts('latest')
            cy.get('.table.table-cbh.table-striped').contains(product[0]).should('not.exist')
        })
    })
})