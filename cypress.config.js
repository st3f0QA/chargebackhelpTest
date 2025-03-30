const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    defaultCommandTimeout: 20000,
    setupNodeEvents(on, config) {
      // Implement node event listeners here
    },
  },
});

