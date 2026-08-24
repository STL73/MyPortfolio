import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin'
import { useGSAP } from '@gsap/react'
import './index.css'
import App from './App.jsx'

// Register GSAP plugins once at app entry point — avoids redundant calls in each lazy-loaded section.
// useGSAP is registered here too: it is what reverts a section's animations when a route change
// unmounts it, which matters now that sections are lazy-loaded behind a router.
// DrawSVGPlugin draws the mark's strokes on first load. It used to be a paid
// Club plugin and ships free with GSAP 3.14, so no licence is involved.
gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin, useGSAP)

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
