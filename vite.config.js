import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
    server: {
        port: 3000,
        open: true,
        proxy: {
            "/api": {
                target: "http://technoPort.ru",
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, ""),
            }
        }
    },
    css: {
        preprocessorOptions: {
            scss: {
                api: "modern",
            }
        }
    },
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, "./index.html"),
                basket: resolve(__dirname, "./pages/basket.html"),
                catalog: resolve(__dirname, "./pages/catalog.html"),
                favourites: resolve(__dirname, "./pages/favourites.html"),
            }
        }
    }
})