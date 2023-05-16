import React, { useState } from 'react';
import { getDataProduct } from '../api/dataDrawFilter'




const FilterProduct = () => {
    const [filter, setFilter] = useState('All');
    const [brandFilter, setBrandFilter] = useState('All');

    const filteredProducts = getDataProduct().products.filter(product => {
        if (filter === 'All') {
            return true;
        }
        return product.category === filter;
    }).filter(product => {
        if (brandFilter === 'All') {
            return true;
        }
        return product.brand === brandFilter;
    });

    const handleCategoryFilter = category => {
        setFilter(category);
        setBrandFilter('All');
    };

    const handleBrandFilter = brand => {
        setBrandFilter(brand);
    };

    return (
        <div>

            <button onClick={() => handleCategoryFilter('All')}>Tất Cả Sản Phẩm</button>
            <button onClick={() => handleCategoryFilter('smartphones')}>Điện Thoại</button>
            <button onClick={() => handleCategoryFilter('laptops')}>Laptop</button>
            <button onClick={() => handleCategoryFilter('tablets')}>Tablet</button>
            <button onClick={() => handleCategoryFilter('watches')}>Đồng Hồ</button>
            <button onClick={() => handleCategoryFilter('powerbanks')}>Sạc Dự Phòng</button>
            <button onClick={() => handleCategoryFilter('mouses')}>Chuột</button>
            <button onClick={() => handleCategoryFilter('docks')}>Dock Sạc</button>
            <br />
            <button onClick={() => handleBrandFilter('All')}>All Brands</button>
            {filteredProducts
                .reduce((brands, product) => {
                    if (!brands.includes(product.brand)) {
                        brands.push(product.brand);
                    }
                    return brands;
                }, [])
                .map(brand => (
                    <button key={brand} onClick={() => handleBrandFilter(brand)}>
                        {brand}
                    </button>
                ))}
            <br />
            <div className='grid grid-cols-6 gap-6'>
                {filteredProducts.map(product => (
                    <div key={product.id}>
                        <img src={product.thumbnail} alt={product.id} />
                        <h3>{product.title}</h3>
                        <p>Price: {product.price}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FilterProduct;
