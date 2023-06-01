import React, { useEffect, useState } from 'react';
import { getDataProduct } from '../api/dataDrawFilter';
import '../assets/less/AllProducts.css';


const AllProducts = () => {
    const [products, setProducts] = useState([]);
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
            // Render products from local storage
            setProducts(JSON.parse(storedTask));
        } else {
            // Render products from getDataProduct
            const data = getDataProduct();
            setProducts(data.products);
            localStorage.setItem('task', JSON.stringify(data.products));
        }
    }, []);

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

            {products.map((product) => (
                <div key={product.id}>
                    <h3>{product.title}</h3>
                    <img src={product.thumbnail} alt={product.title} />
                    <p>Price: {product.price}</p>
                    {/* Render other product details */}
                </div>
            ))}
        </div>
    );
};

export default AllProducts;
