import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './index.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import About from "./components/About";
import Home from "./pages/Home";
import Contact from "./components/Contact";
import Countries from "./pages/Countries"
import CountriesByRegion from "./components/countries-compo/CountriesByRegion";
import CountryDetail from "./components/countries-compo/CountryDetail";

const App = () => {
  return (
    <Router>
      <Navbar />
      <div className="min-h-screen">
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/countries" element={<CountriesByRegion />} /> 
          <Route path="/about" element={<About/>} />
          <Route path="/contact" element={<Contact/>} />
          <Route path="/country/:countryName" element={<CountryDetail />} /> 
        </Routes>
      </div>
      <Footer />
    </Router>
  )
}

export default App
