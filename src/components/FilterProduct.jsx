import React, { useState, useEffect } from 'react';
import { getDataProduct } from '../api/dataDrawFilter';
import { Link } from 'react-router-dom';
import { FaCheckCircle, FaTrash } from 'react-icons/fa';


import {
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
} from "firebase/auth";
import { auth } from "../firebase/fire";

import TotalProduct from './TotalProduct';

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


    const [localStorageProducts, setLocalStorageProducts] = useState([]);

    const getTasksFromLocalStorageTask = () => {
        const tasksToDisplay = [];
        let n = 1;
        let taskKey = 'task' + n;
        while (localStorage.getItem(taskKey)) {
            const taskData = JSON.parse(localStorage.getItem(taskKey));
            tasksToDisplay.push(taskData);
            n++;
            taskKey = 'task' + n;
        }
        return tasksToDisplay;
    };

    useEffect(() => {
        const tasksToDisplay = getTasksFromLocalStorageTask();
        if (tasksToDisplay.length > 0) {
            setLocalStorageProducts(tasksToDisplay);
        }
    }, []);




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

    const filteredProducts = displayedProducts.concat(localStorageProducts).filter(product => {
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


    const productsToRender = filteredProducts.map(product => (
        <div key={product.id} className="col">
            {/* Hiển thị thông tin sản phẩm */}
        </div>
    ));

    const handleCategoryFilter = category => {
        setFilter(category);
        setBrandFilter('All');
    };

    const handleBrandFilter = brand => {
        setBrandFilter(brand);
    };



    const [tasks, setTasks] = useState([]);
    const [idValue, setIdValue] = useState('');
    const [titleValue, setTitleValue] = useState('');
    const [brandValue, setBrandValue] = useState('');
    const [categoryValue, setCategoryValue] = useState('');

    const [priceValue, setPriceValue] = useState('');
    const [thumbnailValue, setThumbnailValue] = useState('');
    const [showPopupAdd, setShowPopupAdd] = useState(false);

    const getTasksFromLocalStorage = () => {
        const tasksToDisplay = [];
        let n = 1;
        let taskKey = 'task' + n;
        while (localStorage.getItem(taskKey)) {
            const taskData = JSON.parse(localStorage.getItem(taskKey));
            tasksToDisplay.push(taskData);
            n++;
            taskKey = 'task' + n;
        }
        return tasksToDisplay;
    };

    useEffect(() => {
        const tasksToDisplay = getTasksFromLocalStorage();
        if (tasksToDisplay.length > 0) {
            setTasks(tasksToDisplay);
        }
    }, []);

    useEffect(() => {
        localStorage.clear();
        tasks.forEach((task, index) => {
            const taskKey = 'task' + (index + 1);
            localStorage.setItem(taskKey, JSON.stringify(task));
        });
    }, [tasks]);

    const handleIdChange = (e) => {
        setIdValue(e.target.value);
    };

    const handleTitleChange = (e) => {
        setTitleValue(e.target.value);
    };

    const handleBrandChange = (e) => {
        setBrandValue(e.target.value);
    };

    const handleCategoryChange = (e) => {
        setCategoryValue(e.target.value);
    };

    const handlePriceChange = (e) => {
        setPriceValue(e.target.value);
    };

    const handleThumbnailChange = (e) => {
        setThumbnailValue(e.target.value);
    };

    const handleAddTask = () => {
        if (idValue.trim() !== '' && titleValue.trim() !== '' && priceValue.trim() !== '' && thumbnailValue.trim() !== '') {
            const newTask = {
                id: idValue,
                title: titleValue,
                price: priceValue,
                thumbnail: thumbnailValue,
                completed: false,
            };
            let taskIndex = tasks.length + 1;
            const taskKey = 'task' + taskIndex;
            localStorage.setItem(taskKey, JSON.stringify(newTask));
            setTasks([...tasks, newTask]);
            setIdValue('');
            setTitleValue('');
            setPriceValue('');
            setThumbnailValue('');
        }
    };

    const handleCompleteTask = (taskId) => {
        const updatedTasks = tasks.map((task) => {
            if (task.id === taskId) {
                return {
                    ...task,
                    completed: !task.completed,
                };
            }
            return task;
        });
        setTasks(updatedTasks);
    };

    const handleDeleteTask = (taskId) => {
        const updatedTasks = tasks.filter((task) => task.id !== taskId);
        setTasks(updatedTasks);
        localStorage.clear();
        updatedTasks.forEach((task, index) => {
            const taskKey = 'task' + (index + 1);
            localStorage.setItem(taskKey, JSON.stringify(task));
        });
    };

    const handleShowPopup = () => {
        setShowPopupAdd(true);
    };

    const handleHidePopup = () => {
        setShowPopupAdd(false);
    };



    return (
        <div className="container">

            <div className="row">
                <div className="col">
                    <div className="category-brand row">
                        <div className="btn-group">

                            <div className="total-product-container">
                                <TotalProduct displayedProducts={filteredProducts} className="total-product" />
                            </div>

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

                    {user?.email === "admin@hoangha.com" && (
                        <>
                            <button onClick={handleShowPopup} type="button" class="btn btn-primary btn-add-product">Thêm Sản Phẩm</button>

                        </>

                    )}


                    {showPopupAdd && (
                        <div className="popup">
                            <div className="input-container">
                                <input
                                    type="text"
                                    placeholder="Enter an ID"
                                    value={idValue}
                                    onChange={handleIdChange}
                                />
                                <input
                                    type="text"
                                    placeholder="Enter a title"
                                    value={titleValue}
                                    onChange={handleTitleChange}
                                />
                                <input
                                    type="text"
                                    placeholder="Enter a price"
                                    value={priceValue}
                                    onChange={handlePriceChange}
                                />
                                <input
                                    type="text"
                                    placeholder="Enter a brand"
                                    value={brandValue}
                                    onChange={handleBrandChange}
                                />

                                <input
                                    type="text"
                                    placeholder="Enter a category"
                                    value={categoryValue}
                                    onChange={handleCategoryChange}
                                />
                                <input
                                    type="text"
                                    placeholder="Enter a thumbnail"
                                    value={thumbnailValue}
                                    onChange={handleThumbnailChange}
                                />
                                <button onClick={handleAddTask}>Add</button>
                                <button onClick={handleHidePopup}>Cancel</button>
                            </div>
                            <ul className="task-list">
                                {tasks.map((task) => (
                                    <li key={task.id} className={task.completed ? 'completed' : ''}>
                                        <input
                                            type="checkbox"
                                            checked={task.completed}
                                            onChange={() => handleCompleteTask(task.id)}
                                        />
                                        <span className="task-text" onClick={() => handleCompleteTask(task.id)}>
                                            ID: {task.id} - Title: {task.title} - Price: {task.price} - Thumbnail: {task.thumbnail} - Brand: {task.brand} - category: {task.category}
                                        </span>
                                        <FaTrash className="delete-icon" onClick={() => handleDeleteTask(task.id)} />
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    <div className='row row-cols-2 row-cols-md-6 g-6'>
                        {productsToRender}
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

                    <div className='row row-cols-2 row-cols-md-6 g-6'>
                        {tasks.map((task) => (
                            <div key={task.id} className={task.completed ? 'completed' : ''}>
                                <div className="card d-flex flex-column">
                                    <div className="image-product">
                                        <img src={task.thumbnail} alt={task.title} className="card-img-top mx-auto" />

                                    </div>
                                    <div className="card-body d-flex flex-column align-items-center">
                                        <div className="row">
                                            <div className="col card-text mb-auto p-2">{task.price.toLocaleString()} VND</div>
                                        </div>
                                        <div className="row">
                                            <div className="col card-title p-2">{task.title}</div>
                                        </div>
                                        {user?.email === "admin@hoangha.com" && (
                                            <>
                                                <button
                                                    onClick={() => openEditPopup(task)}
                                                    className="btn btn-primary p-2"
                                                >
                                                    Chỉnh sửa
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteTask(task.id)}
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
                                            onChange={(e) => setEditTitle(e.target.value)}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="editPrice">Giá:</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            id="editPrice"
                                            value={editPrice}
                                            onChange={(e) => setEditPrice(e.target.value)}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="editThumbnail">Ảnh sản phẩm:</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="editThumbnail"
                                            value={editThumbnail}
                                            onChange={(e) => setEditThumbnail(e.target.value)}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <button
                                            type="button"
                                            className="btn btn-primary save"
                                            onClick={saveProductChanges}
                                        >
                                            Lưu
                                        </button>
                                        <button
                                            type="button"
                                            className="btn btn-light cancel"
                                            onClick={closeEditPopup}
                                        >
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