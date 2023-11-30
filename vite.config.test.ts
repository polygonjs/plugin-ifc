// vite.config.js
import * as path from 'path';
import {defineConfig} from 'vite';

export default defineConfig({
	build: {
		rollupOptions: {
			input: {
				test: path.resolve(__dirname, 'test.html'),
			},
		},
	},
});
