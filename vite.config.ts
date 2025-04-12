import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
  base: "https://dannyfgithub.github.io/dtl",
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: [
        "favicon.ico",
        "icons8-tree-windows-11-color-48.png",
        "mask-icon.svg",
      ],
      manifest: {
        name: "DTL&IDT",
        short_name: "DTL&IDT",
        description: "Decision Tree Learning and Incremental Decision Trees",
        theme_color: "#ffffff",
        icons: [
          {
            src: "icons8-tree-windows-11-color-48.png",
            sizes: "48x48",
            type: "image/png",
          },
          {
            src: "icons8-tree-windows-11-color-96.png",
            sizes: "96x96",
            type: "image/png",
          },
        ],
      },
    }),
  ],
});
