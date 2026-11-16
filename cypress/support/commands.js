// cypress/support/commands.js

/**
 * Comando personalizado para Iniciar Sesión en Maqui Ventas
 */
Cypress.Commands.add('loginAs', (email, password) => {
  cy.get('#email').clear().type(email);
  cy.get('#password').clear().type(password);
  cy.get('#form-login-container form').submit();
});

/**
 * Comando personalizado para Registrar un nuevo usuario
 */
Cypress.Commands.add('registerUser', (name, email, password) => {
  cy.get('#tab-register').click();
  cy.get('#reg-name').clear().type(name);
  cy.get('#reg-email').clear().type(email);
  cy.get('#reg-password').clear().type(password);
  cy.get('#form-register-container form').submit();
});

/**
 * Comando personalizado para Cerrar Sesión
 */
Cypress.Commands.add('logoutUser', () => {
  cy.get('#user-nav button').click({ force: true });
});
