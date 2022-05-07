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

    describe('when several blogs exist', function() {
      beforeEach(function() {
        cy.createBlog({ title: 'blog with no like', author: 'author 3', url: 'url.com' });
        cy.createBlog({ title: 'the most liked blog', author: 'author 1', url: 'url.com' });
        cy.createBlog({ title: 'the second most liked blog', author: 'author 2', url: 'url.com' });
      });

      it('blogs are order by likes', function() {
        // like blogs
        cy.contains('the most liked blog author 1').parent().parent().as('blog1');
        cy.get('@blog1').find('.simple').contains(/^view$/).click();
        cy.get('@blog1').find('.expanded').contains(/^like$/).click();
        cy.get('@blog1').contains('likes 1');
        cy.get('@blog1').find('.expanded').contains(/^like$/).click();
        cy.get('@blog1').contains('likes 2');
        cy.get('@blog1').find('.expanded').contains(/^like$/).click();
        cy.get('@blog1').contains('likes 3').should('be.visible');

        cy.contains('the second most liked blog author 2').parent().parent().as('blog2');
        cy.get('@blog2').find('.simple').contains(/^view$/).click();
        cy.get('@blog2').find('.expanded').contains(/^like$/).click();
        cy.get('@blog2').contains('likes 1').should('be.visible');

        // check order
        cy.get('[data-cy="blog"]').eq(0).should('contain', 'the most liked blog author 1');
        cy.get('[data-cy="blog"]').eq(1).should('contain', 'the second most liked blog author 2');
        cy.get('[data-cy="blog"]').eq(2).should('contain', 'blog with no like author 3');
      });
    });
  });
});