import React from 'react'
import ReactDOM from 'react-dom/client'
import Hero from './Hero'
import '@fontsource-variable/fraunces'
import '@fontsource-variable/nunito-sans'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Hero />
  </React.StrictMode>,
)
