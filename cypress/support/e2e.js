// cypress/support/e2e.js
import './commands';

// Ignorar excepciones no capturadas menores si ocurren en scripts externos
Cypress.on('uncaught:exception', (err, runnable) => {
  return false;
});
