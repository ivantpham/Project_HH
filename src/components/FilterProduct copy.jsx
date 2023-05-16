import React from 'react'
import { useState } from 'react';
import { dataProduct } from '../api/dataDrawFilter'

const FilterProduct = () => {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedBrand, setSelectedBrand] = useState(null);

    const filterProducts = () => {
        let filteredProducts = dataProduct.products;
        if (selectedCategory) {
            filteredProducts = filteredProducts.filter(product => product.category === selectedCategory);
        }
        if (selectedBrand) {
            filteredProducts = filteredProducts.filter(product => product.brand === selectedBrand);
        }
        return filteredProducts;
    }

    const handleCategoryFilter = (category) => {
        setSelectedBrand(null);
        setSelectedCategory(category);
    }

    const handleBrandFilter = (brand) => {
        setSelectedBrand(brand);
        setSelectedCategory(null);
    }






    return (
        <div>
            <h1>Sản Phẩm Của Chúng Tôi</h1>
            <div>
                <button onClick={() => handleCategoryFilter(null)}>All Categories</button>
                <button onClick={() => handleCategoryFilter('smartphones')}>Điện Thoại</button>
                <button onClick={() => handleCategoryFilter('laptops')}>Laptop</button>
                <button onClick={() => handleCategoryFilter('tablets')}>Tablet</button>
                <button onClick={() => handleCategoryFilter('watches')}>Đồng Hồ</button>
                <button onClick={() => handleCategoryFilter('powerbanks')}>Sạc Dự Phòng</button>
                <button onClick={() => handleCategoryFilter('mouses')}>Chuột</button>
                <button onClick={() => handleCategoryFilter('docks')}>Dock Sạc</button>




            </div>

            <div >
                <button onClick={() => handleBrandFilter(null)}>All Brands</button>
                <button onClick={() => handleBrandFilter('Apple')}>Apple</button>
                <button onClick={() => handleBrandFilter('Samsung')}>Samsung</button>
                <button onClick={() => handleBrandFilter('OPPO')}>OPPO</button>
                <button onClick={() => handleBrandFilter('Huawei')}>Huawei</button>
            </div>
            <div className='grid grid-cols-6 gap-6'>
                {filterProducts().map(product => (
                    <div key={product.id}>
                        <img src={product.thumbnail} alt={product.title} />
                        <h3>{product.title}</h3>
                        <p>{product.price}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default FilterProduct;