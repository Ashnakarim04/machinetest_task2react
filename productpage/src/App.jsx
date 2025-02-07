import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductList from "./ProductList";
import Cart from "./Cart";
import { ToastContainer } from "react-toastify";

const App = () => {
    const [cart, setCart] = useState([]);

    return (
        <Router>
            <ToastContainer />
            <Routes>
                <Route path="/" element={<ProductList cart={cart} setCart={setCart} />} />
                <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />} />
            </Routes>
        </Router>
    );
};

export default App;
