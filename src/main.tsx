import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Initialize Google Analytics if GA_ID is configured
const GA_ID = import.meta.env.VITE_GA_ID
if (GA_ID) {
  // IMPORTANT: dataLayer and gtag must be initialized BEFORE loading the script
  window.dataLayer = window.dataLayer || []

  // Use standard gtag pattern with arguments object (not rest params)
  // This is required for GA4 to properly process the dataLayer entries
  function gtag() {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer.push(arguments)
  }

  // Expose gtag globally for event tracking
  window.gtag = gtag as (...args: unknown[]) => void
    ; (gtag as (...args: unknown[]) => void)('js', new Date())
    ; (gtag as (...args: unknown[]) => void)('config', GA_ID)

  // Load the gtag.js script after initialization
  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`
  document.head.appendChild(script)
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
