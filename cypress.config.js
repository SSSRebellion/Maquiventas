const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    supportFile: 'cypress/support/e2e.js',
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    viewportWidth: 1280,
    viewportHeight: 850,
    video: true,
    screenshotOnRunFailure: true,
    setupNodeEvents(on, config) {
      // Event listeners de Cypress
    },
  },
});
