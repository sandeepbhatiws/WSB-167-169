import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Header from './Header'
import Home from './Home'
import './assets/css/style.css'
import ShowHidePassword from './ShowHidePassword'

createRoot(document.getElementById('root')).render(
  
    // <Home/>
    <ShowHidePassword/>
)
