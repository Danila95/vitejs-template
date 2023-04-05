import path from 'path'
import { defineConfig } from "vite";
import { ViteAliases } from "vite-aliases";
import legacy from "@vitejs/plugin-legacy";
import vitePugPlugin from "vite-plugin-pug-transformer";

import pages from './vitejs/pages.config'

const pagesInput = {}

pages.forEach((page => {
    pagesInput[page.name] = page.path
}));

export default defineConfig({
  root: "./src",
  build: {
    target: "es2017", // какой версии JS придерживается сборка
    outDir: "build", // в какую папку будет собираться проект
    rollupOptions: {
      input: {
          ...pagesInput
      } 
  }
  },
  server: {
    port: 3000,
    host: "0.0.0.0",
    hmr: true, // горячая перезагрузка
  },
  resolve: {
    extensions: [".js", ".json", ".png", ".xml", ".csv"], // теперь в путях не надо писать расш. вызываемых файлов
    alias: {
      "@common": path.resolve(__dirname, "src/components/common.components/common/"),
      "@": path.resolve(__dirname, "src"),
    },
  },
  plugins: [
    // ViteAliases(),
    vitePugPlugin(),
    legacy({ targets: ["defaults", "not IE 11"] }),
  ],
});
