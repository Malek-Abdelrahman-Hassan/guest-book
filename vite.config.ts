import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// The repository name is used as the base path for GitHub Pages.
export default defineConfig({
  plugins: [react()],
  base: "/guest-book/",
});
