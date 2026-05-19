class LoginPage{

    visit(){
        cy.visit('/')
    }

    enterUsername(username){
        cy.get('[data-test="username"]').type(username)
    }

    enterPassword(password){
        cy.get('[data-test="password"]').type(password)
    }

    clickLoginbtn(){
        cy.get('[data-test="login-button"]').click()

    }

    login(username, password){
        this.enterUsername(username)
        this.enterPassword(password)
        this.clickLoginbtn()
    }

}

export default LoginPage
