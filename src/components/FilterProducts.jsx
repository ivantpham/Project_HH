import React, { useState, useEffect } from 'react';
import { getDataProduct } from '../api/dataDrawFilter';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/less/FilterProduct.css';

const FilterProducts = ({ allProducts, onAllProductsChange }) => {

    const [filter, setFilter] = useState('All');
    const [brandFilter, setBrandFilter] = useState('All');
    const [filteredProducts, setFilteredProducts] = useState([]);

    useEffect(() => {
        setFilteredProducts(allProducts);
        if (typeof onAllProductsChange === 'function') {
            onAllProductsChange(allProducts);
        }
    }, [allProducts]);

    useEffect(() => {
        const updatedFilteredProducts = allProducts.filter((product) => {
            if (filter === 'All') {
                return true;
            }
            return product.category === filter;
        }).filter((product) => {
            if (brandFilter === 'All') {
                return true;
            }
            return product.brand === brandFilter;
        });

        setFilteredProducts(updatedFilteredProducts);
    }, [allProducts, filter, brandFilter]);

    const handleCategoryFilter = (category) => {
        setFilter(category);
        setBrandFilter('All');
    };

    const handleBrandFilter = (brand) => {
        setBrandFilter(brand);
    };

    return (
        <div className='container'>
            <div className='btn-group'>
                <button
                    className={`btn btn-primary category-btn ${filter === 'All' ? 'active' : ''}`}
                    onClick={() => handleCategoryFilter('All')}
                >
                    Tất Cả Sản Phẩm
                </button>
                <button
                    className={`btn btn-primary category-btn ${filter === 'smartphones' ? 'active' : ''}`}
                    onClick={() => handleCategoryFilter('smartphones')}
                >
                    Điện Thoại
                </button>
                <button
                    className={`btn btn-primary category-btn ${filter === 'laptops' ? 'active' : ''}`}
                    onClick={() => handleCategoryFilter('laptops')}
                >
                    Laptop
                </button>
                <button
                    className={`btn btn-primary category-btn ${filter === 'tablets' ? 'active' : ''}`}
                    onClick={() => handleCategoryFilter('tablets')}
                >
                    Tablet
                </button>
                <button
                    className={`btn btn-primary category-btn ${filter === 'watches' ? 'active' : ''}`}
                    onClick={() => handleCategoryFilter('watches')}
                >
                    Đồng Hồ
                </button>
                <button
                    className={`btn btn-primary category-btn ${filter === 'powerbanks' ? 'active' : ''}`}
                    onClick={() => handleCategoryFilter('powerbanks')}
                >
                    Sạc Dự Phòng
                </button>
                <button
                    className={`btn btn-primary category-btn ${filter === 'mouses' ? 'active' : ''}`}
                    onClick={() => handleCategoryFilter('mouses')}
                >
                    Chuột
                </button>
                <button
                    className={`btn btn-primary category-btn ${filter === 'docks' ? 'active' : ''}`}
                    onClick={() => handleCategoryFilter('docks')}
                >
                    Dock Sạc
                </button>
            </div>
            <br />
            <div className='btn-group d-flex flex-wrap '>
                <button className={`btn btn-secondary brand-btn btn-all ${brandFilter === 'All' ? 'active' : ''}`} onClick={() => handleBrandFilter('All')}>
                    All Brands
                </button>
                {filteredProducts
                    .reduce((brands, product) => {
                        if (!brands.includes(product.brand)) {
                            brands.push(product.brand);
                        }
                        return brands;
                    }, [])
                    .map(brand => (
                        <button
                            key={brand}
                            className={`btn btn-secondary brand-btn ${brandFilter === brand ? 'active' : ''}`}
                            onClick={() => handleBrandFilter(brand)}
                        >
                            {brand}
                        </button>
                    ))}
            </div>
            <br />
            <div className='row'>
                {filteredProducts.map(product => (
                    <div key={product.id} className='col-md-2'>
                        <img src={product.thumbnail} alt={product.id} className='img-fluid' />
                        <h3>{product.title}</h3>
                        <p>Price: {product.price}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FilterProducts;
