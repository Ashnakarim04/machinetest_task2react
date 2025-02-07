import React from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Cart = ({ cart, setCart }) => {
    const incrementQuantity = (id) => {
        const updatedCart = cart.map((item) =>
            item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        );
        setCart(updatedCart);
    };

    const decrementQuantity = (id) => {
        const updatedCart = cart.map((item) =>
            item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
        );
        setCart(updatedCart);
    };

    const removeItem = (id) => {
        const updatedCart = cart.filter((item) => item.id !== id);
        setCart(updatedCart);
        toast.error("Item removed from cart!");
    };

    const getTotalPrice = () => {
        return cart.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    return (
        <div className="container my-4">
            <h2 className="text-center bg-dark text-white py-2">Shopping Cart</h2>
            {cart.length === 0 ? (
                <h4 className="text-center">Your cart is empty.</h4>
            ) : (
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Product</th>
                            <th>Brand</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Total</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cart.map((item) => (
                            <tr key={item.id}>
                                <td><img src={item.image} alt="product" style={{ width: "50px", height: "50px" }} /></td>
                                <td>{item.name}</td>
                                <td>{item.brand}</td>
                                <td>${item.price}</td>
                                <td>{item.quantity}</td>
                                <td>${item.price * item.quantity}</td>
                                <td>
                                    <button className="btn btn-sm btn-primary mx-1" onClick={() => incrementQuantity(item.id)}>+</button>
                                    <button className="btn btn-sm btn-primary mx-1" onClick={() => decrementQuantity(item.id)}>-</button>
                                    <button className="btn btn-sm btn-danger mx-1" onClick={() => removeItem(item.id)}>Remove</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            <h4 className="text-right">Total: ${getTotalPrice()}</h4>
        </div>
    );
};

export default Cart;
