import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RouterProvider } from 'react-router-dom'
import { router } from './Router/Router.jsx'
import 'aos/dist/aos.css';
import Aos from 'aos';
import AuthProvider from './Contexts/AuthContext/AuthProvider.jsx'

Aos.init();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className="font-urbanist max-7xl mx-auto">
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </div>
  </StrictMode>,
)
