import React, { useState } from 'react';
import { getDataProduct } from '../api/dataDrawFilter';
import { useEffect } from "react";
import { Link } from 'react-router-dom';

import {
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
} from "firebase/auth";
import { auth } from "../firebase/fire";

import 'bootstrap/dist/css/bootstrap.css';

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
                        {user?.email === "admin@hoangha.com" && (
                            <button onClick={() => deleteProduct(product.id)}>Xoá</button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FilterProduct;
