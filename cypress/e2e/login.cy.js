import LoginPage from '../pages/LoginPage'
import InventoryPage from  '../pages/InventoryPage'

const loginPage = new LoginPage()
const inventoryPage = new InventoryPage()

describe('Login to the swag labs', () =>{
    beforeEach(() =>{
        loginPage.visit()
    })

    it('Should be login successfully with valid credentials', () =>{
        cy.fixture('users').then((users) =>{
            loginPage.login(
                users.standardUser.username,
                users.standardUser.password
            )
        })
        inventoryPage.verifyInventoryPage()
        inventoryPage.verifyProductTitle()
    })
})
