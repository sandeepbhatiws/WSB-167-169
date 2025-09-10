import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import HomePage from './Components/HomePage'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import ProductListing from './Components/ProductListing';
import './assets/css/style.css'
import { BrowserRouter, Routes, Route } from "react-router";
import AboutUs from './Components/AboutUs';
import RootLayout from './Components/RootLayout';
import ProductDetails from './Components/ProductDetails';
import ViewCart from './Components/ViewCart';

createRoot(document.getElementById('root')).render(
  <>
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<HomePage />} /> */}
        
        
        <Route element={<RootLayout/>}>
          <Route path="/" element={<HomePage />} />
          <Route path="/product-listings/:slug?/:slug2?/:slug3?" element={<ProductListing />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/product-listings/details/:id?" element={<ProductDetails/> } />
          <Route path="/view-cart" element={<ViewCart />} />
        </Route>

        <Route path='admin-panel'>
          <Route path='category'>
            <Route path="add" element={<HomePage />} />
            <Route path="view" element={<HomePage />} />
          </Route>
          

          <Route path="products/add" element={<HomePage />} />
          <Route path="products/view" element={<HomePage />} />
        </Route>

        
      </Routes>
    </BrowserRouter>


    {/* <HomePage /> */}

    {/* <ProductListing /> */}
  </>,
)
