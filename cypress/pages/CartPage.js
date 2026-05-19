class CartPage {

    verifyCartItems() {

        cy.contains('Sauce Labs Bike Light')
          .should('be.visible')

        cy.contains('Sauce Labs Bolt T-Shirt')
          .should('be.visible')

        cy.contains('Sauce Labs Onesie')
          .should('be.visible')
    }

    openOnesieProductPage() {
        cy.contains('Sauce Labs Onesie').click()
    }

    verifyUpdatedCart() {

        cy.contains('Sauce Labs Bike Light')
          .should('be.visible')

        cy.contains('Sauce Labs Bolt T-Shirt')
          .should('be.visible')

        cy.contains('Sauce Labs Onesie')
          .should('not.exist')
    }
}

export default CartPage