describe('Note app', function() {
    beforeEach(function() {
        cy.request('POST', 'http://localhost:3001/api/testing/reset')
        const user = {
            name: 'isaac r',
            username: 'isaac',
            password: '1234'
        }
        cy.request('POST', 'http://localhost:3001/api/users/', user)
        cy.visit('http://localhost:3000')
        })
    it('front page can be opened', function(){
        cy.contains('Notes')
        cy.contains('Notes')
    })
    it('login form can be opened', function() {
        cy.contains('login').click()
    })
    it('user can log in', function() {
        cy.contains('login').click()
        cy.get('#username').type('isaac')
        cy.get('#password').type('1234')
        cy.get('#login-button').click()
        cy.contains('isaac r logged in')
    })
    it('login fails with wrong password', function(){
        cy.contains('login').click()
        cy.get('#username').type('isaac')
        cy.get('#password').type('wrongpass')
        cy.get('#login-button').click()
        cy.get('.error')
            .should('contain', 'wrong credentials')
            .and('have.css', 'color', 'rgb(255,0,0)')
            .and('have.css', 'border-style', 'solid')
        cy.get('html').should('not.contain', 'isaac r logged in')
    })
    describe('when logged in', function(){
        beforeEach(function(){
            //cy.contains('login').click()
            //cy.get('#username').type('isaac')
            //cy.get('#password').type('1234')
            //cy.get('#login-button').click()
            cy.login({ username: 'isaac', password: '1234' })
        })
        it('a new note can be created', function() {
            cy.contains('new note').click()
            cy.get('input').type('another note from cypress')
            cy.contains('save').click()
            cy.contains('another note from cypress')
        })
        describe('and some notes exists', function(){
            beforeEach(function() {
                //cy.contains('new note').click()
                //cy.get('input').type('another note from cypress')
                //cy.contains('save').click()
                cy.createNote({content: 'first note',important: false})
                cy.createNote({content: 'second note',important: false})
                cy.createNote({content: 'third note',important: false})
            })
            it('one can be made important', function() {
                cy.contains('second note').parent().find('button').as('theButton')
                cy.get('@theButton').click()
                cy.get('@theButton').should('contain', 'make not important')
                //cy.contains('second note')
                    //.contains('make important')
                    //.click()
                //cy.contains('second note')
                    //.contains('make not important')
            })
        })
    })
})
