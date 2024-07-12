import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/lib/index.ts'),
      name: 'ReactTableComponentPackage',
      fileName: (format) => `react-table-component-package.${format}.js`,
    },
    rollupOptions: {
      external: ['react', 'react-dom', '@fortawesome/react-fontawesome', '@fortawesome/free-solid-svg-icons'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          '@fortawesome/react-fontawesome': 'ReactFontawesome',
          '@fortawesome/free-solid-svg-icons': 'FreeSolidSvgIcons'
        },
      },
    },
  },
});
