import { save_database_index_plugin } from './src/_modules/code_generation';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	plugins: [sveltekit(), save_database_index_plugin()],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
});
