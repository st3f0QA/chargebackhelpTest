import * as locators from '../support/locators'
import dayjs from 'dayjs';

export function addProductAsAdmin(desiredProductName,desiredProductPrice,desiredProductQuantity){
    cy.get(locators.navigationProductsButton).eq(0).click()
    cy.url().should('include','/products')

    cy.contains('a', 'Add Product').should('be.visible').click();
    cy.get(locators.productNameField).type(desiredProductName)
    cy.get(locators.productPriceField).type(desiredProductPrice)
    cy.get(locators.productQuantity).type(desiredProductQuantity)
    cy.get(locators.saveButton).click()

    cy.get(locators.tableWithProducts)
    .contains('td', desiredProductName)  // Locate the cell with the product name
    .closest('tr')  // Get the row that contains the product name
    .within(() => {
      // Check if the product price is correct in the same row
      cy.get('td').contains(desiredProductPrice).should('be.visible');
      
      // Check if the product quantity is correct in the same row
      cy.get('td').contains(desiredProductQuantity).should('be.visible');
    });
  
}

export function deleteProducts(param){ //bug with deletion
    if (param === 'all'){
        cy.get(locators.removeProductButton).then(($element)=>{
            if ($element.is(':visible')) {
                cy.wrap($element).each((button,index)=>{
                    cy.wrap(button).eq(0).click()
                    cy.get(locators.confirmProductDeletion).click()
                })
            }
        })
    }
    else if(param === 'latest'){
        cy.get(locators.removeProductButton).last().click()
        cy.get(locators.deletionModal).should('be.visible')
        cy.get(locators.confirmProductDeletion).click()
    }
    else{
        throw Error ('Param is not valid')
    }
}
export function searchForProduct(productName){
    cy.get(locators.searchField).click().type(productName)
    cy.get('table').should('contain',productName)
}
export function createOrder(productName,quantity){
    cy.get(locators.navigationOrdersButton)
        .eq(0)
        .should('be.visible')
        .click()
    cy.url().should('contain','/orders')
    cy.contains('Create an Order').click()
    cy.scrollTo('bottom')
    cy.wait(1000)
    cy.get(locators.tableBody) 
    .filter((index, row) => {
      return Cypress.$(row).text().includes(productName); 
    })
    .last() 
    .within(() => { 
        cy.get(locators.quantityField) 
            .click()
            .clear()
            .type(quantity);
        cy.get(locators.checkBox) 
            .check();
    });
    cy.get(locators.saveButton).click()    
}
export function successfulOrder(productName){
    cy.get(locators.ordersTable)
        .should('be.visible')
        .and('contain', productName);
        
    const today = dayjs().format('YYYY-MM-DD');
    cy.get(locators.ordersTable)
        .should('be.visible')
        .and('contain', today);
}

