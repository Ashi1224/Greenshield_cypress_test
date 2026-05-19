import LoginPage from '../pages/LoginPage'
import InventoryPage from '../pages/InventoryPage'
import CheckoutPage from '../pages/CheckoutPage'
import CartPage from '../pages/CartPage'

const loginPage = new LoginPage()
const inventoryPage = new InventoryPage()
const checkoutPage = new CheckoutPage()
const cartPage = new CartPage()

describe('Should login and add items with full workflow', () =>{
beforeEach(() =>{
    loginPage.visit()
    cy.fixture('users').then((users) => {

            loginPage.login(
                users.standardUser.username,
                users.standardUser.password
            )
        })
})

it('Should be able checkout successfully', () =>{
    inventoryPage.verifyInventoryPage()
    inventoryPage.addBikeLightToCart()
    inventoryPage.addBoltTshirtToCart()
    inventoryPage.addOnesieToCart()
    inventoryPage.verifyCartBadge('3')
    inventoryPage.shoppingCart()
    cartPage.verifyCartItems()
    cartPage.openOnesieProductPage()
    checkoutPage.removeButton()
    checkoutPage.backToProducts()
    inventoryPage.verifyInventoryButtonStates()
    inventoryPage.shoppingCart()
    cartPage.verifyUpdatedCart()
    checkoutPage.clickCheckout()
    checkoutPage.enterFirstName('Ashwini')
    checkoutPage.enterLastName('Parte')
    checkoutPage.enterpostalCode('N7M 0R9')
    checkoutPage.continuebtn()
    checkoutPage.verifyCheckoutOverviewPage()
    checkoutPage.clickFinishBtn()
    checkoutPage.verifyOrderSuccess()
    checkoutPage.backToProducts() 
    inventoryPage.verifyInventoryPage()
    inventoryPage.resetAppState()
    inventoryPage.verifyDefaultState()
})

})