import { ViteReactSSG } from 'vite-react-ssg'
import App from './App'
import { routes } from './routes'
import './index.css'

export const createRoot = ViteReactSSG(
  { 
    routes,
    basename: "/code1new/frontend" 
  }
)
