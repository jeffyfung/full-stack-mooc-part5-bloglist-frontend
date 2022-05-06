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
      cy.login({ username: 'root', password: '123456' });
    });

    it('fails with wrong credentials', function() {
      cy.contains('username').find('input').type('root');
      cy.contains('password').find('input').type('wrong');
      cy.contains('login').click();

      cy.contains('Wrong Credentials').should('have.css', 'color', 'rgb(255, 0, 0)');
    });
  });

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'root', password: '123456' });
    });

    it('A blog can be created', function() {
      cy.contains('new note').click();
      cy.contains('title').find('input').type('this is a blog title');
      cy.contains('author').find('input').type('a guy');
      cy.contains('url').find('input').type('guy.com');
      cy.get('button[type="submit"]').click();

      cy.contains('.blog', 'this is a blog title a guy');
    });

    describe('when a blog exists', function() {
      beforeEach(function() {
        cy.createBlog({ title: 'this is a blog title', author: 'a guy', url: 'guy.com' });
      });

      it('Can like a blog', function() {
        cy.get('button[name="view"]').click();
        cy.get('button[name="like"]').click();
        cy.contains('likes 1');
      });

      it('Can delete a blog the user created', function() {
        cy.get('button[name="view"]').click();
        cy.get('button[name="remove').click();
        cy.should('not.contain', 'this is a blog title a guy');
      });
    });
  });
});