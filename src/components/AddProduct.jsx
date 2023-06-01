import React, { useState, useEffect } from 'react';
import { getDataProduct } from '../api/dataDrawFilter';

import 'bootstrap/dist/css/bootstrap.css';
import '../assets/less/AddProduct.css';

const AddProduct = ({ onAddProduct }) => {
    const [category, setCategory] = useState('');
    const [brand, setBrand] = useState('');
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [id, setId] = useState('');
    const [thumbnail, setThumbnail] = useState('');
    const [showSuggestions, setShowSuggestions] = useState(false);

    const suggestedCategories = [
        'smartphones',
        'watches',
        'laptops',
        'tablets',
        'mouses',
        'powerbanks',
        'docks',
    ];

    useEffect(() => {
        const categoryData = localStorage.getItem('category');
        const brandData = localStorage.getItem('brand');
        const titleData = localStorage.getItem('title');
        const priceData = localStorage.getItem('price');
        const idData = localStorage.getItem('id');
        const thumbnailData = localStorage.getItem('thumbnail');

        setCategory(categoryData || '');
        setBrand(brandData || '');
        setTitle(titleData || '');
        setPrice(priceData || '');
        setId(idData || '');
        setThumbnail(thumbnailData || '');
    }, []);

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const handlePriceChange = (event) => {
        setPrice(event.target.value);
    };

    const handleThumbnailChange = (event) => {
        setThumbnail(event.target.value);
    };

    const handleCategoryChange = (event) => {
        setCategory(event.target.value);
    };

    const handleIdChange = (event) => {
        setId(event.target.value);
    };

    const handleCategoryClick = (suggestedCategory) => {
        setCategory(suggestedCategory);
        setShowSuggestions(false);
    };

    const handleAddProduct = () => {
        const product = {
            id,
            title,
            price,
            thumbnail,
        };

        getDataProduct(product);

        localStorage.setItem('category', category);
        localStorage.setItem('brand', brand);
        localStorage.setItem('title', title);
        localStorage.setItem('price', price);
        localStorage.setItem('id', id);
        localStorage.setItem('thumbnail', thumbnail);

        onAddProduct(product);
        resetForm();
    };

    const handleCancel = () => {
        window.location.href = 'http://localhost:3000/Project_HH';
    };

    const resetForm = () => {
        setCategory('');
        setBrand('');
        setTitle('');
        setPrice('');
        setId('');
        setThumbnail('');
    };

    const renderSuggestions = () => {
        if (showSuggestions) {
            return (
                <div className="suggested-categories">
                    {suggestedCategories.map((suggestedCategory, index) => (
                        <div
                            className="suggested-category"
                            key={index}
                            onClick={() => handleCategoryClick(suggestedCategory)}
                        >
                            {suggestedCategory}
                        </div>
                    ))}
                </div>
            );
        }
        return null;
    };

    return (
        <div className="add-product-popup">
            <div className="add-product-popup-content">
                <h2>Thêm sản phẩm mới</h2>
                <div className="form-group">
                    <label htmlFor="category">Category</label>
                    <input
                        type="text"
                        className="form-control"
                        id="category"
                        placeholder="Category"
                        value={category}
                        onChange={handleCategoryChange}
                        onFocus={() => setShowSuggestions(true)}
                    />
                    {renderSuggestions()}
                </div>
                <div className="form-group">
                    <label htmlFor="brand">Brand</label>
                    <input
                        type="text"
                        className="form-control"
                        id="brand"
                        placeholder="Brand"
                        value={brand}
                        onChange={(e) => setBrand(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="title">Tiêu đề</label>
                    <input
                        type="text"
                        className="form-control"
                        id="title"
                        placeholder="Tiêu đề"
                        value={title}
                        onChange={handleTitleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="price">Giá</label>
                    <input
                        type="text"
                        className="form-control"
                        id="price"
                        placeholder="Giá"
                        value={price}
                        onChange={handlePriceChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="thumbnail">Link ảnh</label>
                    <input
                        type="text"
                        className="form-control"
                        id="thumbnail"
                        placeholder="Link ảnh"
                        value={thumbnail}
                        onChange={handleThumbnailChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="id">ID</label>
                    <input
                        type="text"
                        className="form-control"
                        id="id"
                        placeholder="ID"
                        value={id}
                        onChange={handleIdChange}
                    />
                </div>
                <button className="btn btn-primary" onClick={handleAddProduct}>
                    Thêm
                </button>
                <button className="btn btn-secondary" onClick={handleCancel}>
                    Hủy
                </button>
            </div>
        </div>
    );
};

export default AddProduct;
