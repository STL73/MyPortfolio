import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './index.css'
import App from './App.jsx'

// Register GSAP plugins once at app entry point — avoids redundant calls in each lazy-loaded section
gsap.registerPlugin(ScrollTrigger)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* Real paths, not hashes — the case study needs its own indexable URL.
        Cloudflare's public/_redirects rule is what makes a hard refresh on
        one of them resolve instead of 404ing at the host. */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
