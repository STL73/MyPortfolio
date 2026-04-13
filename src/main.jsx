import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './index.css'
import App from './App.jsx'

// Register GSAP plugins once at app entry point — avoids redundant calls in each lazy-loaded section
gsap.registerPlugin(ScrollTrigger)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
