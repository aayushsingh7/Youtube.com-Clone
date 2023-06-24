import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './assets/global.css'
import {BrowserRouter} from 'react-router-dom'
import AppFunction from './context/AppContext'

ReactDOM.createRoot(document.getElementById('root')).render(
   <BrowserRouter>
  <AppFunction>
  <App />
  </AppFunction>
   </BrowserRouter>
)
