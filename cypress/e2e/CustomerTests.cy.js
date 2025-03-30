import * as helper from '../support/helpers'
import * as locators from '../support/locators'
describe('Customer tests',()=>{
    context('Customer scenarios',()=>{
        // name, price, quantity
        const product = ['airfryer', 30, 15]
        
        beforeEach(()=>{
            cy.clearAllCookies()
            cy.clearAllSessionStorage()
        })
        it('Login as admin and add product',()=>{
            cy.LoginToChargeBack('admin')       
            helper.addProductAsAdmin(product[0],product[1],product[2]) 
        })
        it('Login as customer 1, assert table is not visible and create order',()=>{
            cy.LoginToChargeBack('customer1')
            helper.createOrder(product[0],2)
            helper.successfulOrder(product[0])
        })
        it('Customer 1 insufficient stock ',()=>{
            cy.LoginToChargeBack('customer1')
            helper.createOrder(product[0],999)
            cy.contains(`Has insufficient stock for product ${product[0]}`)
            .should('be.visible')
        })
        it('Customer 2 should not see the customer 1 orders',()=>{
            cy.LoginToChargeBack('customer2')
            cy.visit(`${Cypress.env('baseUrl')}orders?`)
            cy.get(locators.tableWithProducts)
            .should('contain', 'No data')
        })
    })
})