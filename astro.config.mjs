import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
	// Enable Preact to support Preact JSX components.
	integrations: [react()],
});
