import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import './assets/css/style.css'
import Home from "./Components/Home";
import RootLoyout from "./Components/RootLoyout";
import AddQuiz from "./Components/AddQuiz";
import ViewQuiz from "./Components/ViewQuiz";
import PlayQuiz from "./Components/PlayQuiz";
import Login from "./Components/Auth/Login";
import Register from "./Components/Auth/Register";

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <Routes>

      <Route element={<RootLoyout/>}>
        <Route path="/" element={<Home />} />
        <Route path="/add-quiz" element={<AddQuiz />} />
        <Route path="/view-quiz" element={<ViewQuiz />} />
        <Route path="/play-quiz" element={<PlayQuiz />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>


      

    </Routes>
  </BrowserRouter>,
);