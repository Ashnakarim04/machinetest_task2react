import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";

const ProductList = ({ cart, setCart }) => {
    const products = [
        { id: 1, name: "Laptop", brand: "Dell", quantity: 1, price: 500, image: "https://5.imimg.com/data5/KU/QR/MY-10167030/dell-laptops.jpg" },
        { id: 2, name: "Laptop", brand: "HP", quantity: 1, price: 600, image: "https://images-cdn.ubuy.co.in/64ccb2559d908f42222b598a-hp-pavilion-13-3-fhd-intel-core-i3.jpg" },
        { id: 3, name: "Laptop", brand: "Lenovo", quantity: 1, price: 550, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFRmVK8k5vB7R2ETbUQNzPNJl46i2W7XHJkg&s" },
        { id: 4, name: "Phone", brand: "Apple", quantity: 1, price: 1000, image: "https://www.maplestore.in/cdn/shop/files/iPhone_14_Blue_PDP_Image_Position-2__WWEN.jpg?v=1701815334&width=823" },
        { id: 5, name: "Phone", brand: "Samsung", quantity: 1, price: 900, image: "https://images.samsung.com/is/image/samsung/p6pim/in/2401/gallery/in-galaxy-s24-s928-sm-s928bztwins-539573349?$720_576_JPG$" },
        { id: 6, name: "Laptop", brand: "Apple", quantity: 1, price: 1200, image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mbp-14-spacegray-cto-hero-202310?wid=4000&hei=3072&fmt=jpeg&qlt=90&.v=1697308985046" },
        { id: 7, name: "Phone", brand: "OnePlus", quantity: 1, price: 750, image: "https://fdn2.gsmarena.com/vv/pics/oneplus/oneplus-nord-2-5g-1.jpg" }
    ];

    const [items, setItems] = useState(products);
    const [search, setSearch] = useState("");
    const [brandFilter, setBrandFilter] = useState("");
    const navigate = useNavigate();

   

    const addToCart = (product) => {
        const itemExists = cart.find((item) => item.id === product.id);
        if (itemExists) {
            const updatedCart = cart.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
            setCart(updatedCart);
        } else {
            setCart([...cart, product]);
        }

        toast.success(`${product.brand} ${product.name} added to cart!`);
        navigate("/cart");
    };

    const filteredProducts = items.filter((product) =>
        product.name.toLowerCase().includes(search.toLowerCase()) &&
        (brandFilter === "" || product.brand === brandFilter)
    );

    return (
        <div className="container my-4">
            <h1 className="text-center bg-dark text-white py-2">Products</h1>
            <div className="d-flex justify-content-between mb-5 mt-5">
                <input
                    type="text"
                    className="form-control w-50"
                    placeholder="Search by name(laptop/phone)"
                    onChange={(e) => setSearch(e.target.value)}
                />
                <select className="form-select w-25" onChange={(e) => setBrandFilter(e.target.value)}>
                    <option value="">All Brands</option>
                    <option value="Apple">Apple</option>
                    <option value="Samsung">Samsung</option>
                    <option value="HP">HP</option>
                    <option value="Dell">Dell</option>
                    <option value="Lenovo">Lenovo</option>
                    <option value="OnePlus">OnePlus</option>
                </select>
            </div>
            <div className="row">
                {filteredProducts.map((product) => (
                    <div className="col-lg-4 col-md-6 col-sm-12 mb-4" key={product.id}>
                        <div className="card shadow-sm text-center h-100 border-0 hover-effect">
                            <img src={product.image} alt="Product" className="card-img-top" style={{ height: "250px", objectFit: "cover" }} />
                            <div className="card-body">
                                <h5 className="card-title">{product.brand} {product.name}</h5>
                                <p className="text-primary fw-bold">Price: ${product.price}</p>
                               
                                 <button className="btn btn-success mx-1" onClick={() => addToCart(product)}>
                                     Add to Cart
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductList;
