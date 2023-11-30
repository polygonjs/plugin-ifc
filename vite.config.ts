// vite.config.js
import * as path from 'path';
import {defineConfig} from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
	build: {
		lib: {
			entry: path.resolve(__dirname, 'src/index.ts'),
			name: 'polygonjs-ifc',
			fileName: (format) => `index.${format}.js`,
		},
		rollupOptions: {
			external: ['@polygonjs/polygonjs', 'three'],
		},
	},
	plugins: [
		dts({
			insertTypesEntry: true,
		}),
	],
});
