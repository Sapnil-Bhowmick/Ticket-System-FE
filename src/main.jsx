import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { appStore } from "./Redux/store.js"
import { Provider } from 'react-redux'
import { Toaster } from 'react-hot-toast';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={appStore}>
      <App />
      <Toaster />
    </Provider>
  </StrictMode>,
)
