/// <reference types="cypress" />
/* globals cy */
      
describe ('Test App', () => {

  it ('launches', () => {
    cy.visit ('/');
  });

});