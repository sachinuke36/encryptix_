import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './src/App.jsx'
import './index.css'
import {BrowserRouter} from 'react-router-dom'
import StoreContext from './Context/StoreContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <StoreContext>
    <App />
  </StoreContext>
  </BrowserRouter>
)
