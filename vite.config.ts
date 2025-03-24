import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import TanStackRouterVite from "@tanstack/router-plugin/vite";

export default defineConfig(() => {
    return {
        build: {
            outDir: 'build',
        },
        server: {
            port: 3000,
            host: true,
            allowedHosts: ["stockcomp.io"]
        },
        plugins: [
            TanStackRouterVite({ target: "react", autoCodeSplitting: true }),
            react()
        ],
    };
});
