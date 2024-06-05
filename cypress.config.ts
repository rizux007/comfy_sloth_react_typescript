import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:8888/comfy_sloth_react_typescript",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
