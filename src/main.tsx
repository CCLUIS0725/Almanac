import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'

// Reduced-motion detection: add a data attribute for global checks
const mql = window.matchMedia('(prefers-reduced-motion: reduce)')
document.documentElement.setAttribute('data-reduced-motion', mql.matches ? 'true' : 'false')
mql.addEventListener?.('change', (e) => {
  document.documentElement.setAttribute('data-reduced-motion', e.matches ? 'true' : 'false')
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

