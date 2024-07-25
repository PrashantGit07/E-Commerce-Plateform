
import React from "react";
import Layout from "./Components/Layout/Layout.js";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home.js";
import { About } from "./Pages/About.js";
import Contact from "./Pages/Contact.js";
import { Policy } from "./Pages/Policy.js";
import { PageNotFound } from "./Pages/PageNotFound.js";
import Register from "./Pages/Auth/Register.js";
import Login from "./Pages/Auth/Login.js";
function App() {
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/policy" element={<Policy />} />
          <Route path="/*" element={<PageNotFound />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Layout>
    </>
  );
}

export default App;


