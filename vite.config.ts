import {defineConfig, type UserConfig} from 'vite'
import dtsPlugin from "vite-plugin-dts";
import path from "node:path";

export default defineConfig({
    plugins: [dtsPlugin({ rollupTypes: true, tsconfigPath: "./tsconfig.json"})],
    build: {
        sourcemap: true,
        lib: {
            entry: path.resolve(__dirname, "./src/index.ts"),
            name: "white_flow",
            formats: ['es', 'cjs', 'umd', 'iife'],
            fileName: (format) => `index.${format}.js`,
        }
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src')
        },
    }
}) satisfies UserConfig;