import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import './assets/css/bootstrap.min.css';
import './assets/css/style.css';
import './assets/css/tiny-slider.css';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [cartTotal, setCartTotal] = useState(0);

    useEffect(() => {
        fetchCart();
    }, []);

    const fetchCart = () => {
        fetch('https://dummyjson.com/carts/1')
            .then(res => res.json())
            .then(data => {
                setCartItems(data.products);
                setCartTotal(data.total);
            })
            .catch(error => console.error('Error fetching cart:', error));
    };

    const handleRemoveItem = (productId) => {
        fetch('https://dummyjson.com/carts/1')
            .then(res => res.json())
            .then(cart => {
                const updatedProducts = cart.products.filter(product => product.id !== productId);

                fetch('https://dummyjson.com/carts/1', {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ products: updatedProducts }),
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log('Cart updated:', data);
                        setCartItems(data.products);
                        setCartTotal(data.total);
                    })
                    .catch(error => console.error('Error updating cart:', error));
            })
            .catch(error => console.error('Error fetching cart:', error));
    };


    return (
        <>
            <Navbar />
            <div className="untree_co-section before-footer-section">
                <div className="container">
                    <div className="row mb-5">
                        <form className="col-md-12">
                            <div className="site-blocks-table">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th className="product-thumbnail">Image</th>
                                            <th className="product-name">Product</th>
                                            <th className="product-price">Price</th>
                                            <th className="product-quantity">Quantity</th>
                                            <th className="product-total">Total</th>
                                            <th className="product-remove">Remove</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {cartItems.map((item) => (
                                            <tr key={item.id}>
                                                <td className="product-thumbnail">
                                                    <img src={item.thumbnail} alt="Product" className="img-fluid" />
                                                </td>
                                                <td className="product-name">
                                                    <h2 className="h5 text-black">{item.title}</h2>
                                                </td>
                                                <td>${item.price}</td>
                                                <td>{item.quantity}</td>
                                                <td>${item.price * item.quantity}</td>
                                                <td>
                                                    <button type='button'
                                                        className="btn btn-black btn-sm"
                                                        onClick={() => handleRemoveItem(item.id)}
                                                    >
                                                        X
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </form>
                    </div>

                    <div className="row">
                        <div className="col-md-6">
                            <button className="btn btn-black btn-sm btn-block">Update Cart</button>
                            <button className="btn btn-outline-black btn-sm btn-block">Continue Shopping</button>
                        </div>
                        <div className="col-md-6 pl-5">
                            <div className="row justify-content-end">
                                <div className="col-md-7">
                                    <div className="row mb-3">
                                        <div className="col-md-6">
                                            <span className="text-black">Subtotal</span>
                                        </div>
                                        <div className="col-md-6 text-right">
                                            <strong className="text-black">${cartTotal}</strong>
                                        </div>
                                    </div>
                                    <div className="row mb-5">
                                        <div className="col-md-12">
                                            <button className="btn btn-black btn-lg py-3 btn-block">Proceed To Checkout</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Cart;
