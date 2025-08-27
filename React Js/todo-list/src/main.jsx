import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './assets/css/style.css'
import FormData from './Components/FormData'

createRoot(document.getElementById('root')).render(
  <>
    <FormData/>
  </>,
)
