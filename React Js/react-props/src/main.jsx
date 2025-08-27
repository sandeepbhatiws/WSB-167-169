import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Home from './Home'
import './assets/css/style.css'
import Accordian from './Accordian'


createRoot(document.getElementById('root')).render(
  <>
    {/* <Home/> */}

    <Accordian/>
  </>
  ,
)
