import React, { useState } from 'react';
import PropTypes from 'prop-types';
import "../assets/less/AddProduct.css"

const AddProducts = ({ onClose }) => {
    const [productData, setProductData] = useState({
        id: '',
        title: '',
        price: '',
        category: '',
        brand: '',
        thumbnail: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProductData((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Lưu dữ liệu vào ProductsTask của localStorage
        const products = JSON.parse(localStorage.getItem('ProductsTask')) || [];
        products.push(productData);
        localStorage.setItem('ProductsTask', JSON.stringify(products));
        // Đóng popup
        onClose();
    };

    const handleCancel = () => {
        onClose();
    };

    return (
        <div className="popup">
            <div className="popup-content">
                <h2>Add Product</h2>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="id">ID:</label>
                    <input
                        type="text"
                        id="id"
                        name="id"
                        value={productData.id}
                        onChange={handleChange}
                        required
                    />
                    <label htmlFor="title">Title:</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={productData.title}
                        onChange={handleChange}
                        required
                    />
                    <label htmlFor="price">Price:</label>
                    <input
                        type="text"
                        id="price"
                        name="price"
                        value={productData.price}
                        onChange={handleChange}
                        required
                    />
                    <label htmlFor="category">Category:</label>
                    <input
                        type="text"
                        id="category"
                        name="category"
                        value={productData.category}
                        onChange={handleChange}
                        required
                    />
                    <label htmlFor="brand">Brand:</label>
                    <input
                        type="text"
                        id="brand"
                        name="brand"
                        value={productData.brand}
                        onChange={handleChange}
                        required
                    />
                    <label htmlFor="thumbnail">Thumbnail:</label>
                    <input
                        type="text"
                        id="thumbnail"
                        name="thumbnail"
                        value={productData.thumbnail}
                        onChange={handleChange}
                        required
                    />
                    <div className="buttons">
                        <button type="submit">Submit</button>
                        <button type="button" onClick={handleCancel}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

AddProducts.propTypes = {
    onClose: PropTypes.func.isRequired,
};

export default AddProducts;