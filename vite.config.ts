import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
import type { Plugin } from 'vite';
import { saveCollectionTypes } from './src/lib/generate';

export default defineConfig({
	plugins: [sveltekit(), godo()],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
});

function godo(): Plugin {
	return {
		name: 'godo',
		handleHotUpdate: async () => {
			// const o = load();
			// console.log(o);
			await saveCollectionTypes();
		}
	};
}
