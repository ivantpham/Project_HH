import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/less/SearchProducts.css';


const SearchProducts = () => {
    return (
        <div>
            <div className="search-products">
                <div className="search-products-header">
                    <h5 className="search-products-title">Hello World</h5>
                </div>
                <div className="search-products-body">
                    <p>This is a popup with the message "Hello World".</p>
                </div>
                <div className="search-products-footer">
                    <button type="button" className="btn btn-secondary">Close</button>
                </div>
            </div>
        </div>
    );
};

export default SearchProducts;
