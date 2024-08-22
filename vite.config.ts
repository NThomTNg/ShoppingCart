import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  base: 'https://github.com/NThomTNg/ShoppingCart', 
  plugins: [react()],
})
