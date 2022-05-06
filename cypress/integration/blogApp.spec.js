describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset');
    let user = { name: 'root', username: 'root', password: '123456' };
    cy.request('POST', 'http://localhost:3003/api/users/', user);
    cy.visit('http://localhost:3000');
  });

  it('Login form is shown', function() {
    cy.contains('Log In');
    cy.contains('login');
  });

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.contains('username').find('input').type('root');
      cy.contains('password').find('input').type('123456');
      cy.contains('login').click();

      cy.contains('root logged in');
      cy.contains('new note');
    });

    it('fails with wrong credentials', function() {
      cy.contains('username').find('input').type('root');
      cy.contains('password').find('input').type('wrong');
      cy.contains('login').click();

      cy.contains('Wrong Credentials').should('have.css', 'color', 'rgb(255, 0, 0)');
    });
  });
});