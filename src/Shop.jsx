import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import './assets/css/bootstrap.min.css';
import './assets/css/style.css';
import './assets/css/tiny-slider.css';

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalProducts, setTotalProducts] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');
    const productsPerPage = 8;
    const navigate = useNavigate();

    useEffect(() => {
        fetchProducts();
    }, []);

    useEffect(() => {
        handleSearch();
    }, [searchQuery, products]);

    const fetchProducts = () => {
        fetch('https://dummyjson.com/products?limit=100')
            .then(res => res.json())
            .then(data => {
                setProducts(data.products);
                setFilteredProducts(data.products);
                setTotalProducts(data.products.length);
            })
            .catch(error => console.error('Error fetching products:', error));
    };

    const handleSearch = () => {
        const filtered = products.filter(product =>
            product.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredProducts(filtered);
        setTotalProducts(filtered.length);
        setCurrentPage(1);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleAddToCart = (product) => {
        fetch('https://dummyjson.com/carts/add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                userId: 1,
                products: [
                    {
                        id: product.id,
                        quantity: 1,
                    },
                ],
            }),
        })
            .then(res => res.json())
            .then(data => {
                console.log('Cart updated:', data);
                navigate('/cart');
            })
            .catch(error => console.error('Error adding to cart:', error));
    };

    const totalPages = Math.ceil(totalProducts / productsPerPage);
    const currentProducts = filteredProducts.slice(
        (currentPage - 1) * productsPerPage,
        currentPage * productsPerPage
    );

    return (
        <>
            <Navbar />
            <div className="hero">
                <div className="container">
                    <div className="row justify-content-between">
                        <div className="col-lg-5">
                            <div className="intro-excerpt">
                                <h1>Shop</h1>
                            </div>
                        </div>
                        <div className="col-lg-7"></div>
                    </div>
                </div>
            </div>

            <div className="untree_co-section product-section before-footer-section">
                <div className="container">
                    <div className="row mb-4">
                        <div className="col-12">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search products..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="row">
                        {currentProducts.map(product => (
                            <div key={product.id} className="col-12 col-md-4 col-lg-3 mb-5">
                                <a className="product-item" href="#" onClick={() => handleAddToCart(product)}>
                                    <img src={product.thumbnail} alt={product.title} className="img-fluid product-thumbnail" />
                                    <h3 className="product-title">{product.title}</h3>
                                    <strong className="product-price">${product.price}</strong>

                                    <span className="icon-cross">
                                        <img src="../src/assets/images/cross.svg" alt="cross" className="img-fluid" />
                                    </span>
                                </a>
                            </div>
                        ))}
                    </div>

                    <nav>
                        <ul className="pagination justify-content-center">
                            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                <button
                                    className="page-link"
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    disabled={currentPage === 1}
                                >
                                    Previous
                                </button>
                            </li>
                            {[...Array(totalPages).keys()].map(number => (
                                <li
                                    key={number + 1}
                                    className={`page-item ${currentPage === number + 1 ? 'active' : ''}`}
                                >
                                    <button
                                        className="page-link"
                                        onClick={() => handlePageChange(number + 1)}
                                    >
                                        {number + 1}
                                    </button>
                                </li>
                            ))}
                            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                                <button
                                    className="page-link"
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                >
                                    Next
                                </button>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </>
    );
};

export default Shop;
