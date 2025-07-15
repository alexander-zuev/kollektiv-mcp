import {defineConfig} from 'vite';
import {tanstackRouter} from '@tanstack/router-plugin/vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import {cloudflare} from '@cloudflare/vite-plugin';

const ReactCompilerConfig = {
    target: '19',
};

// https://vite.dev/config/
export default defineConfig({
    plugins: [tanstackRouter({
        target: 'react',
        autoCodeSplitting: true,
        // Routes directory
        routesDirectory: 'src/react-spa/routes',
        // Path where to generate the route tree
        generatedRouteTree: 'src/react-spa/routeTree.gen.ts',
    }), tsconfigPaths(),
        react({
            babel: {
                plugins: [['babel-plugin-react-compiler', ReactCompilerConfig]],
            },
        }), tailwindcss(),
        cloudflare(),],
    build: {
        // TODO: re-enable sourcemaps when ready later
        chunkSizeWarningLimit: 1000,
        // sourcemap: true
    },
    server: {
        host: '127.0.0.1',
        open: false, // do not open window
        cors: true,
        allowedHosts: ['localhost', '127.0.0.1', '0.0.0.0'],
    },
    base: '/',

});