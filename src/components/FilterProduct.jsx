import React, { useState, useEffect } from 'react';
import { getDataProduct } from '../api/dataDrawFilter';
import { Link } from 'react-router-dom';

import {
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
} from "firebase/auth";
import { auth } from "../firebase/fire";

import 'bootstrap/dist/css/bootstrap.css';
import '../assets/less/FilterProduct.css';

const FilterProduct = () => {
    const [filter, setFilter] = useState('All');
    const [brandFilter, setBrandFilter] = useState('All');

    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [loginError, setLoginError] = useState("");
    const [user, setUser] = useState({});
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [redirectTo, setRedirectTo] = useState(null);
    const [displayedProducts, setDisplayedProducts] = useState(getDataProduct().products);

    const [editingProduct, setEditingProduct] = useState(null);
    const [editTitle, setEditTitle] = useState("");
    const [editPrice, setEditPrice] = useState("");
    const [editThumbnail, setEditThumbnail] = useState("");

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        setIsLoggedIn(!!user?.email);

        if (isLoggedIn && redirectTo) {
            setTimeout(() => {
                window.location.href = redirectTo; // Thực hiện chuyển hướng
            }, 3000);
        }
    }, [user, isLoggedIn, redirectTo]);

    const login = async () => {
        try {
            const user = await signInWithEmailAndPassword(
                auth,
                loginEmail,
                loginPassword
            );
            console.log(user);
            setRedirectTo("/Project_HH"); // Chuyển hướng về trang chủ
        } catch (error) {
            console.log(error.message);
            setLoginError("Đăng nhập không thành công - Hãy kiểm tra Email hoặc Password!");
        }
    };

    const logout = async () => {
        await signOut(auth);
    };

    const deleteProduct = (productId) => {
        const updatedProducts = displayedProducts.filter(product => product.id !== productId);
        setDisplayedProducts(updatedProducts);
    };

    const openEditPopup = (product) => {
        setEditingProduct(product);
        setEditTitle(product.title);
        setEditPrice(product.price);
        setEditThumbnail(product.thumbnail);
    };

    const closeEditPopup = () => {
        setEditingProduct(null);
        setEditTitle("");
        setEditPrice("");
        setEditThumbnail("");
    };

    const saveProductChanges = () => {
        const updatedProducts = displayedProducts.map((product) => {
            if (product.id === editingProduct.id) {
                const formattedPrice = Number(editPrice).toLocaleString("vi-VN");
                return {
                    ...product,
                    title: editTitle,
                    price: formattedPrice,
                    thumbnail: editThumbnail,
                };
            }
            return product;
        });
        setDisplayedProducts(updatedProducts);
        closeEditPopup();
    };

    const filteredProducts = displayedProducts.filter(product => {
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
        <div className="container">
            <div className="row">
                <div className="col">
                    <div className="category-brand row">
                        <div className="btn-group">
                            <button
                                className={`btn btn-primary btn-first ${filter === 'All' ? 'active' : ''}`}
                                onClick={() => handleCategoryFilter('All')}
                            >
                                Tất Cả Sản Phẩm
                            </button>
                            <button
                                className={`btn btn-primary ${filter === 'smartphones' ? 'active' : ''}`}
                                onClick={() => handleCategoryFilter('smartphones')}
                            >
                                Điện Thoại
                            </button>

                            <button
                                className={`btn btn-primary ${filter === 'tablets' ? 'active' : ''}`}
                                onClick={() => handleCategoryFilter('tablets')}
                            >
                                Tablet
                            </button>

                            <button
                                className={`btn btn-primary ${filter === 'laptops' ? 'active' : ''}`}
                                onClick={() => handleCategoryFilter('laptops')}
                            >
                                Laptop
                            </button>

                            <button
                                className={`btn btn-primary ${filter === 'watches' ? 'active' : ''}`}
                                onClick={() => handleCategoryFilter('watches')}
                            >
                                Đồng Hồ
                            </button>

                            <button
                                className={`btn btn-primary ${filter === 'powerbanks' ? 'active' : ''}`}
                                onClick={() => handleCategoryFilter('powerbanks')}
                            >
                                Sạc Dự Phòng
                            </button>

                            <button
                                className={`btn btn-primary ${filter === 'mouses' ? 'active' : ''}`}
                                onClick={() => handleCategoryFilter('mouses')}
                            >
                                Chuột
                            </button>

                            <button
                                className={`btn btn-primary ${filter === 'docks' ? 'active' : ''}`}
                                onClick={() => handleCategoryFilter('docks')}
                            >
                                Dock Sạc
                            </button>
                            {/* Rest of the category buttons */}
                        </div>

                        <div className="btn-group d-flex flex-wrap">
                            <button
                                className={`btn btn-secondary ${brandFilter === 'All' ? 'active' : ''}`}
                                onClick={() => handleBrandFilter('All')}
                            >
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
                                        className={`btn btn-secondary ${brandFilter === brand ? 'active' : ''}`}
                                        onClick={() => handleBrandFilter(brand)}
                                    >
                                        {brand}
                                    </button>
                                ))}
                        </div>
                    </div>


                    <div className='row row-cols-2 row-cols-md-6 g-6'>
                        {filteredProducts.map(product => (
                            <div key={product.id} className="col">
                                <div className="card d-flex flex-column">
                                    <div className="image-product">
                                        <img src={product.thumbnail} alt={product.id} className="card-img-top mx-auto" />

                                    </div>
                                    <div className="card-body d-flex flex-column align-items-center">
                                        <div className="row">
                                            <div className="col card-text mb-auto p-2">{product.price.toLocaleString()} VND</div>
                                        </div>
                                        <div className="row">
                                            <div className="col card-title p-2">{product.title}</div>
                                        </div>
                                        {user?.email === "admin@hoangha.com" && (
                                            <>
                                                <button
                                                    onClick={() => openEditPopup(product)}
                                                    className="btn btn-primary p-2"
                                                >
                                                    Chỉnh sửa
                                                </button>
                                                <button
                                                    onClick={() => deleteProduct(product.id)}
                                                    className="btn btn-danger p-2"
                                                >
                                                    Xoá
                                                </button>
                                            </>

                                        )}
                                    </div>
                                </div>

                            </div>
                        ))}
                    </div>

                    {editingProduct && (
                        <div className="popup">
                            <div className="popup-inner">
                                <h2>Chỉnh Sửa Sản Phẩm</h2>
                                <form>
                                    <div className="form-group">
                                        <label htmlFor="editTitle">Tiêu đề:</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="editTitle"
                                            value={editTitle}
                                            onChange={e => setEditTitle(e.target.value)}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="editPrice">Giá:</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            id="editPrice"
                                            value={editPrice}
                                            onChange={e => setEditPrice(e.target.value)}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="editThumbnail">Ảnh sản phẩm:</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="editThumbnail"
                                            value={editThumbnail}
                                            onChange={e => setEditThumbnail(e.target.value)}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <button type="button" className="btn btn-primary save" onClick={saveProductChanges}>
                                            Lưu
                                        </button>
                                        <button type="button" className="btn btn-light cancel" onClick={closeEditPopup}>
                                            Hủy
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FilterProduct;
