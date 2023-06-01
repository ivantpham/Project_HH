import React, { useEffect, useState } from 'react';
import { getDataProduct } from '../api/dataDrawFilter';
import '../assets/less/AllProducts.css';

const AllProducts = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [formData, setFormData] = useState({
        id: '',
        title: '',
        price: '',
        brand: '',
        category: '',
        thumbnail: '',
    });

    useEffect(() => {
        const storedTask = localStorage.getItem('task');
        if (storedTask) {
            setProducts(JSON.parse(storedTask));
        } else {
            const data = getDataProduct();
            setProducts(data.products);
            localStorage.setItem('task', JSON.stringify(data.products));
        }
    }, []);

    useEffect(() => {
        setFilteredProducts(products);
    }, [products]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const newProduct = {
            id: formData.id,
            title: formData.title,
            price: formData.price,
            brand: formData.brand,
            category: formData.category,
            thumbnail: formData.thumbnail,
        };
        const updatedProducts = [...products, newProduct];
        setProducts(updatedProducts);
        localStorage.setItem('task', JSON.stringify(updatedProducts));
        setFormData({
            id: '',
            title: '',
            price: '',
            brand: '',
            category: '',
            thumbnail: '',
        });
    };

    const handleFilterCategory = (category) => {
        if (category === 'all') {
            setFilteredProducts(products);
        } else {
            const filtered = products.filter((product) => product.category === category);
            setFilteredProducts(filtered);
        }
    };

    const handleFilterBrand = (brand) => {
        if (brand === 'all') {
            setFilteredProducts(products);
        } else {
            const filtered = products.filter((product) => product.brand === brand);
            setFilteredProducts(filtered);
        }
    };

    const allCategories = ['all', 'smartphones', 'tablets'];
    const allBrands = [...new Set(products.map((product) => product.brand))];

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="id"
                    value={formData.id}
                    onChange={handleInputChange}
                    placeholder="ID"
                />
                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="Title"
                />
                <input
                    type="text"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    placeholder="Price"
                />
                <input
                    type="text"
                    name="brand"
                    value={formData.brand}
                    onChange={handleInputChange}
                    placeholder="Brand"
                />
                <input
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    placeholder="Category"
                />
                <input
                    type="text"
                    name="thumbnail"
                    value={formData.thumbnail}
                    onChange={handleInputChange}
                    placeholder="Thumbnail"
                />
                <button type="submit">Submit</button>
            </form>

            <div className="filters">
                <button onClick={() => handleFilterCategory('all')}>Tất cả sản phẩm</button>
                {allCategories.map((category) => (
                    <button key={category} onClick={() => handleFilterCategory(category)}>
                        {category}
                    </button>
                ))}
            </div>

            <div className="filters">
                <button onClick={() => handleFilterBrand('all')}>All Brand</button>
                {allBrands.map((brand) => (
                    <button key={brand} onClick={() => handleFilterBrand(brand)}>
                        {brand}
                    </button>
                ))}
            </div>

            <div className="product-list">
                {filteredProducts.map((product) => (
                    <div key={product.id}>
                        <h3>{product.title}</h3>
                        <img src={product.thumbnail} alt={product.title} />
                        <p>Price: {product.price}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AllProducts;
