import React from 'react';
import { useLocation } from 'react-router-dom';
import './assets/css/bootstrap.min.css';
import './assets/css/style.css';
import './assets/css/tiny-slider.css';

const Navbar = () => {
    const location = useLocation();

    return (
        <>
            <nav className="custom-navbar navbar navbar-expand-md navbar-dark bg-dark" aria-label="Furni navigation bar">
                <div className="container">
                    <a className="navbar-brand" href="/">Furni<span>.</span></a>

                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsFurni" aria-controls="navbarsFurni" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarsFurni">
                        <ul className="custom-navbar-nav navbar-nav ms-auto mb-2 mb-md-0">
                            <li className={`nav-item ${location.pathname === '/' ? 'active' : ''}`}>
                                <a className="nav-link" href="/">Home</a>
                            </li>
                            <li className={`nav-item ${location.pathname === '/shop' ? 'active' : ''}`}>
                                <a className="nav-link" href="/shop">Shop</a>
                            </li>
                            <li className={`nav-item ${location.pathname === '/about' ? 'active' : ''}`}>
                                <a className="nav-link" href="/about">About us</a>
                            </li>
                            <li className={`nav-item ${location.pathname === '/services' ? 'active' : ''}`}>
                                <a className="nav-link" href="/services">Services</a>
                            </li>
                            <li className={`nav-item ${location.pathname === '/blog' ? 'active' : ''}`}>
                                <a className="nav-link" href="/blog">Blog</a>
                            </li>
                            <li className={`nav-item ${location.pathname === '/contact' ? 'active' : ''}`}>
                                <a className="nav-link" href="/contact">Contact us</a>
                            </li>
                        </ul>

                        <ul className="custom-navbar-cta navbar-nav mb-2 mb-md-0 ms-5">
                            <li><a className="nav-link" href="#"><img src="../src/assets/images/user.svg" alt="user icon" /></a></li>
                            <li><a className="nav-link" href="/cart"><img src="../src/assets/images/cart.svg" alt="cart icon" /></a></li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar;
