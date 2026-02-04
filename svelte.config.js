import adapter from '@sveltejs/adapter-cloudflare'; // Change this back to auto
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),
	kit: {
		adapter: adapter() // No need for 'fallback' here usually
	}
};

export default config;