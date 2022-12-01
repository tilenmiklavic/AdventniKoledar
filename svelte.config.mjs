import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';


/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: [
        preprocess({
          postcss: true,
        }),
      ],
	kit: {
		adapter: adapter({
            pages: 'public',
            assets: 'public',
            fallback: null,
            precompress: false
            }),
            prerender: {
            default: true
            }
	}
};

export default config;