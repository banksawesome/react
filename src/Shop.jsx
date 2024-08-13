import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import './assets/css/bootstrap.min.css';
import './assets/css/style.css';
import './assets/css/tiny-slider.css';

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalProducts, setTotalProducts] = useState(0);
    const productsPerPage = 8; // Number of products per page

    useEffect(() => {
        fetchProducts(currentPage);
    }, [currentPage]);

    const fetchProducts = (page) => {
        const skip = (page - 1) * productsPerPage;

        fetch(`https://dummyjson.com/products?limit=${productsPerPage}&skip=${skip}`)
            .then(res => res.json())
            .then(data => {
                setProducts(data.products);
                setTotalProducts(data.total);
            })
            .catch(error => console.error('Error fetching products:', error));
    };

    const totalPages = Math.ceil(totalProducts / productsPerPage);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

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
                    <div className="row">
                        {products.map(product => (
                            <div key={product.id} className="col-12 col-md-4 col-lg-3 mb-5">
                                <a className="product-item" href="#">
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

                    {/* Bootstrap Styled Pagination */}
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
