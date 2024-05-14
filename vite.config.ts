import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/comfy_sloth_react_typescript/",
  plugins: [react()],
});
