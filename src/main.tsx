import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.scss'
import RouterPagesProvider from './root/routes/config'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterPagesProvider/>
  </React.StrictMode>,
)
