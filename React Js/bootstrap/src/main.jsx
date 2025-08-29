import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import HomePage from './Components/HomePage'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import ProductListing from './Components/ProductListing';
import './assets/css/style.css'

createRoot(document.getElementById('root')).render(
  <>
    {/* <HomePage /> */}

    <ProductListing/>
  </>,
)
