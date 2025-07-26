import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "https://xexit-1-mapu.onrender.com", // ✅ no trailing slash
    specPattern: "cypress/e2e/**/*.cy.js",
    video: false,
    setupNodeEvents(on, config) {
      // No event listeners needed for now
    },
  },
  reporter: "mochawesome",
  reporterOptions: {
    charts: true,
    json: true,
    reportsDir: "reports/your-reports-folder",
    reportFilename: "my-report",
    overwrite: false,
  },
});
