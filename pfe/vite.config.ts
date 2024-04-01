// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import replace from '@rollup/plugin-replace';


export default defineConfig({
  plugins: [
    react(),
    replace({
      'process.env.JWT_SECRET_KEY': JSON.stringify(process.env.JWT_SECRET_KEY || ''),
    }),
  ],
});
