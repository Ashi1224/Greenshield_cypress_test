class CheckoutPage{
    
    clickCheckout(){
        cy.get('[data-test="checkout"]').click()
    }

    enterFirstName(firstname){
        cy.get('[data-test="firstName"]').type(firstname)
    }

    enterLastName(lastname){
        cy.get('[data-test="lastName"]').type(lastname)
    }

    enterpostalCode(zipcode){
        cy.get('[data-test="postalCode"]').type(zipcode)

    }
     
    continuebtn(){
        cy.get('[data-test="continue"]').click()
    }

    cancelBtn(){
        cy.get("#cancel").click()
    }

    clickFinishBtn(){
        cy.get('[data-test="finish"]').click()
    }

    verifyCartCount(count){
        cy.get('[data-test="shopping-cart-badge"]').should('contain', count)
    }

    verifyOrderSuccess() {
        cy.get('.complete-header')
          .should('contain', 'Thank you for your order!')
    }

    removeButton(){
        cy.get('[data-test="remove"]').click()
    }

     verifyCheckoutOverviewPage() {

        cy.url().should('include', 'checkout-step-two.html')

        cy.contains('Checkout: Overview')
          .should('be.visible')

        cy.get('.cart_item')
          .should('have.length.greaterThan', 0)

        cy.get('[data-test="finish"]')
          .should('be.visible')
    }

    backToContinueShopping(){
        cy.get('[data-test="continue-shopping"]').click()
    }

    backToProducts(){
        cy.get('[data-test="back-to-products"]').click()
    }

    backToHome() {
    cy.get('[data-test="back-to-home"]').click()
}

}

export default CheckoutPage