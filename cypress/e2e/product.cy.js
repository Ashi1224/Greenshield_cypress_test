import LoginPage from '../pages/LoginPage'
import InventoryPage from '../pages/InventoryPage'

const loginPage = new LoginPage()
const inventoryPage = new InventoryPage()

describe('Product sorting on the inventory page', () => {

    beforeEach(() => {
        loginPage.visit()
        cy.fixture('users').then((users) => {
            loginPage.login(
                users.standardUser.username,
                users.standardUser.password
            )
        })
        inventoryPage.verifyInventoryPage()
    })

    it('defaults to Name (A to Z) sort on initial page load', () => {
        inventoryPage.verifyDefaultSortIsAZ()
        inventoryPage.verifyProductsSortedByName('asc')
    })

    // it('sorts products by Name (A to Z)', () => {
    //     inventoryPage.selectSortOption('Name (A to Z)')
    //     inventoryPage.verifyProductsSortedByName('asc')
    // })

    it('sorts products by Name (Z to A)', () => {
        inventoryPage.selectSortOption('Name (Z to A)')
        inventoryPage.verifyProductsSortedByName('desc')
    })

    it('sorts products by Price (low to high)', () => {
        inventoryPage.selectSortOption('Price (low to high)')
        inventoryPage.verifyProductsSortedByPrice('asc')
    })

    it('sorts products by Price (high to low)', () => {
        inventoryPage.selectSortOption('Price (high to low)')
        inventoryPage.verifyProductsSortedByPrice('desc')
    })
})