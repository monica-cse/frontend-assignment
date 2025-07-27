// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';
// import { configDefaults } from 'vitest/config';

// export default defineConfig({
//   plugins: [react()],
//   test: {
//     globals: true,
//     environment: 'jsdom',
//     setupFiles: './src/setupTests.ts',
//     exclude: [...configDefaults.exclude, 'dist'],
//   },
// });


/// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.js',
  },
});
