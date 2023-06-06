import React, { useState, useEffect } from 'react';

const SearchProducts = ({ onAllProductsChange }) => {
    const [searchInputValue, setSearchInputValue] = useState('');
    const [filteredProducts, setFilteredProducts] = useState([]);

    useEffect(() => {
        const filterProducts = () => {
            if (!onAllProductsChange || !searchInputValue) {
                setFilteredProducts([]);
                return;
            }

            const allProducts = onAllProductsChange();

            const filtered = allProducts.filter((product) =>
                product.title.toLowerCase().includes(searchInputValue.toLowerCase())
            );

            setFilteredProducts(filtered);
        };

        filterProducts();
    }, [onAllProductsChange, searchInputValue]);

    return (
        <div>
            <input
                type="text"
                value={searchInputValue}
                onChange={(e) => setSearchInputValue(e.target.value)}
                placeholder="Tìm kiếm sản phẩm"
            />
            {filteredProducts.map((product) => (
                <div key={product.id}>
                    <p>{product.title}</p>
                    <p>{product.price}</p>
                    <img src={product.thumbnail} alt={product.title} />
                </div>
            ))}
        </div>
    );
};

export default SearchProducts;
