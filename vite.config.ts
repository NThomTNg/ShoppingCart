import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'


export default defineConfig(({ command, mode }) => {
  return {
    base: command === 'build' ? '/ShoppingCart/' : '/', 
    plugins: [react()],
  }
})

