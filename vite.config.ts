import react from "@vitejs/plugin-react-swc";
import path from "path";
import {defineConfig} from "vite";
import {checker} from "vite-plugin-checker";
import svgr from "vite-plugin-svgr";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
	server: {
		proxy: {
			"/api": {
				target: "http://91.243.71.111:8443",
				changeOrigin: true,
				secure: false,
			},
		},
	},
	plugins: [
		react(),
		tsconfigPaths(),
		svgr(),
		checker({
			typescript: true,
			eslint: {
				lintCommand: 'eslint "./src/**/*.{ts,tsx,js,jsx}"',
			},
			enableBuild: false,
		}),
	],
	resolve: {
		alias: {
			"@fonts": path.resolve(__dirname, "./src/shared/assets/fonts"),
		},
	},
});
