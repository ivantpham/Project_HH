import React from 'react';

const FilterProducts = ({ activeFilter, onFilterChange, allProducts }) => {
    const handleClick = (filter) => {
        onFilterChange(filter);
    };

    const createBrandTagsSmartphones = () => {
        if (!allProducts) {
            return null;
        }

        const filteredProducts = allProducts.filter(
            (product) => product.category.toLowerCase() === 'smartphones'
        );

        const brands = {};

        filteredProducts.forEach((product) => {
            if (brands[product.brand]) {
                brands[product.brand]++;
            } else {
                brands[product.brand] = 1;
            }
        });

        const brandTags = [];
        for (const brand in brands) {
            brandTags.push(
                <button
                    key={brand}
                    className={`btn ${activeFilter === brand ? 'btn-primary active' : 'btn-secondary'}`}
                    onClick={() => handleClick(brand)}
                >
                    {brand}
                </button>
            );
        }

        return brandTags;
    };


    const createBrandTagsLaptops = () => {
        if (!allProducts) {
            return null;
        }

        const filteredProducts = allProducts.filter(
            (product) => product.category.toLowerCase() === 'laptops'
        );

        const brands = {};

        filteredProducts.forEach((product) => {
            if (brands[product.brand]) {
                brands[product.brand]++;
            } else {
                brands[product.brand] = 1;
            }
        });

        const brandTags = [];
        for (const brand in brands) {
            brandTags.push(
                <button
                    key={brand}
                    className={`btn ${activeFilter === brand ? 'btn-primary active' : 'btn-secondary'}`}
                    onClick={() => handleClick(brand)}
                >
                    {brand}
                </button>
            );
        }

        return brandTags;
    };


    const createAllProductsBrandTags = () => {
        if (!allProducts) {
            return null;
        }

        const allBrands = {};

        allProducts.forEach((product) => {
            if (allBrands[product.brand]) {
                allBrands[product.brand]++;
            } else {
                allBrands[product.brand] = 1;
            }
        });

        const allProductsBrandTags = [];
        for (const brand in allBrands) {
            allProductsBrandTags.push(
                <button
                    key={brand}
                    className={`btn ${activeFilter === brand ? 'btn-primary active' : 'btn-secondary'}`}
                    onClick={() => handleClick(brand)}
                >
                    {brand}
                </button>
            );
        }

        return allProductsBrandTags;
    };

    return (
        <div className="filter">
            <button
                className={`btn ${activeFilter === 'All' ? 'btn-primary active' : 'btn-secondary'}`}
                onClick={() => handleClick('All')}
            >
                Tất Cả Sản Phẩm
            </button>

            <button
                className={`btn ${activeFilter === 'Điện Thoại' ? 'btn-primary active' : 'btn-secondary'}`}
                onClick={() => handleClick('Điện Thoại')}
            >
                Điện Thoại
            </button>

            <button
                className={`btn ${activeFilter === 'Laptop' ? 'btn-primary active' : 'btn-secondary'}`}
                onClick={() => handleClick('Laptop')}
            >
                Laptop
            </button>

            <button
                className={`btn ${activeFilter === 'Tablet' ? 'btn-primary active' : 'btn-secondary'}`}
                onClick={() => handleClick('Tablet')}
            >
                Tablet
            </button>

            <button
                className={`btn ${activeFilter === 'Đồng Hồ' ? 'btn-primary active' : 'btn-secondary'}`}
                onClick={() => handleClick('Đồng Hồ')}
            >
                Đồng Hồ
            </button>

            <button
                className={`btn ${activeFilter === 'Sạc Dự Phòng' ? 'btn-primary active' : 'btn-secondary'}`}
                onClick={() => handleClick('Sạc Dự Phòng')}
            >
                Sạc Dự Phòng
            </button>

            <button
                className={`btn ${activeFilter === 'Chuột' ? 'btn-primary active' : 'btn-secondary'}`}
                onClick={() => handleClick('Chuột')}
            >
                Chuột
            </button>

            <button
                className={`btn ${activeFilter === 'Dock Sạc' ? 'btn-primary active' : 'btn-secondary'}`}
                onClick={() => handleClick('Dock Sạc')}
            >
                Dock Sạc
            </button>

            {(activeFilter === 'Điện Thoại') && (
                <div className="brand-tags">
                    {createBrandTagsSmartphones()}
                </div>
            )}

            {(activeFilter === 'Laptop') && (
                <div className="brand-tags">
                    {createBrandTagsLaptops()}
                </div>
            )}

            {activeFilter === 'All' && (
                <div className="brand-tags">
                    {createAllProductsBrandTags()}
                </div>
            )}
        </div>
    );
};

export default FilterProducts;
