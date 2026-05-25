class CartPage {

    verifyCartItems() {
        cy.get('.cart_item').should('have.length', 3)
        cy.get('[data-test="inventory-item-name"]')
          .should('contain', 'Sauce Labs Bike Light')
          .and('contain', 'Sauce Labs Bolt T-Shirt')
          .and('contain', 'Sauce Labs Onesie')
    }

    openOnesieProductPage() {
        cy.get('[data-test="inventory-item-name"]')
          .contains('Sauce Labs Onesie')
          .click()
    }

    verifyUpdatedCart() {
        cy.get('.cart_item').should('have.length', 2)
        cy.get('[data-test="inventory-item-name"]')
          .should('contain', 'Sauce Labs Bike Light')
          .and('contain', 'Sauce Labs Bolt T-Shirt')
          .and('not.contain', 'Sauce Labs Onesie')
    }
}

export default CartPage