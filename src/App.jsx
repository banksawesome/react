import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Shop from './Shop'
import Cart from './Cart'
import Contact from './Contact'
import Blog from './Blog'
import Service from './Service'
import About from './About'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/Blog" element={<Blog />} />
        <Route path="/Services" element={<Service />} />
        <Route path="/About" element={<About />} />
      </Routes>
    </Router>
  );
};

export default App;
