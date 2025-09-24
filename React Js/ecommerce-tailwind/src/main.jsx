import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import './assets/css/style.css'
import Home from "./Components/Home";
import RootElements from "./Components/RootElements";
import About from "./Components/About";
import ProductLisitng from "./Components/ProductLisitng";
import { Provider } from "react-redux";
import { store } from "./ReduxToolkit/reduxToolkit";
import ViewCart from "./Components/ViewCart";

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(

  <BrowserRouter>
    <Provider store={store}>
      <Routes>

        <Route element={<RootElements />}>
          <Route path="/" element={<Home />} />
          <Route path="about-us" element={<About />} />
          <Route path="products" element={<ProductLisitng />} />
          <Route path="view-carts" element={<ViewCart />} />
        </Route>

      </Routes>
    </Provider>
  </BrowserRouter>
);
