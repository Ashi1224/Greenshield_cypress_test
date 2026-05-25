import InventoryPage from  '../pages/InventoryPage'

const inventoryPage = new InventoryPage()

describe('Login to the swag labs', () =>{
    beforeEach(() =>{
        cy.visit('/')
    })

    it('Should be login successfully with valid credentials', () =>{
        cy.fixture('users').then((users) =>{
            cy.login(
                users.standardUser.username,
                users.standardUser.password
            )
        })
        inventoryPage.verifyInventoryPage()
        inventoryPage.verifyProductTitle()
    })
})
