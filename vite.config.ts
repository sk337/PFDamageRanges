import path from "path";
import { defineConfig } from "vite";
import { htmlMetaPlugin } from "vite-plugin-html-meta";
import Sitemap from "vite-plugin-sitemap";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    htmlMetaPlugin({
      viewport: {
        width: "device-width",
        height: "device-height",
        initialScale: 1,
        maximumScale: 1,
        userScalable: "no",
      },
      description: "Damgae Range Calculator for Phantom Forces",
      keywords: [
        "Phantom Forces",
        "PF",
        "Damage",
        "Range",
        "Calculator",
        "FPS",
        "Roblox",
        "Game",
      ],
      referrer: "origin",
      author: "sk337",
    }),
    Sitemap({
      hostname: "https://pf.pk3.zip",
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
