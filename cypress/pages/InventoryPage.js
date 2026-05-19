class InventoryPage {

    verifyInventoryPage() {
        cy.url().should('include', '/inventory')
        cy.get('[data-test="inventory-list"]').should('be.visible')
    }

    shoppingCart() {
        cy.get('[data-test="shopping-cart-link"]').click()
    }

    verifyProductTitle() {
        cy.get('.title').should('contain', 'Products')
    }

    addBikeLightToCart() {
        cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]').click()
    }

    addBoltTshirtToCart() {
        cy.get('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click()
    }

    addOnesieToCart() {
        cy.get('[data-test="add-to-cart-sauce-labs-onesie"]').click()
    }

    verifyCartBadge(count) {
        cy.get('.shopping_cart_badge').should('contain', count)
    }

    verifyInventoryButtonStates() {
        // Items not in cart — should show "Add to cart"
        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').should('be.visible')
        cy.get('[data-test="add-to-cart-sauce-labs-fleece-jacket"]').should('be.visible')
        cy.get('[data-test="add-to-cart-sauce-labs-onesie"]').should('be.visible')
        cy.get('[data-test="add-to-cart-test.allthethings()-t-shirt-(red)"]').should('be.visible')

        // Items still in cart — should show "Remove"
        cy.get('[data-test="remove-sauce-labs-bike-light"]').should('be.visible')
        cy.get('[data-test="remove-sauce-labs-bolt-t-shirt"]').should('be.visible')
    }

    selectSortOption(optionText) {
        cy.get('[data-test="product-sort-container"]').select(optionText)
    }

    verifyDefaultSortIsAZ() {
        cy.get('[data-test="active-option"]').should('contain', 'Name (A to Z)')
    }

    verifyProductsSortedByName(direction = 'asc') {
        const names = []
        cy.get('[data-test="inventory-item-name"]').each(($el) => {
            names.push($el.text().trim())
        }).then(() => {
            const sorted = [...names].sort()
            if (direction === 'desc') sorted.reverse()
            expect(names).to.deep.equal(sorted)
        })
    }

    verifyProductsSortedByPrice(direction = 'asc') {
        const prices = []
        cy.get('[data-test="inventory-item-price"]').each(($el) => {
            prices.push(parseFloat($el.text().replace('$', '')))
        }).then(() => {
            const sorted = [...prices].sort((a, b) =>
                direction === 'asc' ? a - b : b - a
            )
            expect(prices).to.deep.equal(sorted)
        })
    }

    resetAppState() {
        cy.get('#react-burger-menu-btn').click()
        cy.get('#reset_sidebar_link').click()
        cy.get('#react-burger-cross-btn').click()
    }

    verifyDefaultState() {
        cy.get('.shopping_cart_badge').should('not.exist')
        cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]').should('be.visible')
    }
}

export default InventoryPage