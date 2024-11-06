import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import * as dotenv from 'dotenv';
import { resolve } from 'path';

// https://vitejs.dev/config/
dotenv.config({ path: resolve(__dirname, '.dev.vars') });

export default defineConfig({
  plugins: [react()],
  define: {
    'process.env': process.env,
  },
});