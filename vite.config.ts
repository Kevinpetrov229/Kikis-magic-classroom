import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { cloudflare } from "@cloudflare/vite-plugin";

export default defineConfig({
  plugins: [
    react(),
    // Workers AI has no local emulation, so the plugin would otherwise open a
    // remote binding session and require an API token just to run the dev
    // server. Locally the reading generator falls through to its offline
    // composer, which is the path worth exercising anyway. Set this to true when
    // you want to develop against the real models.
    cloudflare({ remoteBindings: false }),
  ],
  build: {
    rollupOptions: {
      output: {
        // hanzi-writer only loads on the tracing activity; pinyin-pro carries a
        // dictionary that must not sit in the first paint.
        manualChunks(id) {
          if (id.includes("hanzi-writer")) return "strokes";
          if (id.includes("pinyin-pro")) return "pinyin";
          return undefined;
        },
      },
    },
  },
});
