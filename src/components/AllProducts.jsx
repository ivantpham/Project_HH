import React, { useState } from 'react';
import { getDataProduct } from '../api/dataDrawFilter';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/less/AllProducts.css';


const AllProducts = () => {
    const [createProducts, setCreateProducts] = useState(getDataProduct().products);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [newProductData, setNewProductData] = useState({
        id: '',
        title: '',
        price: '',
        brand: '',
        category: '',
        thumbnail: '',
    });

    const openPopup = () => {
        setIsPopupOpen(true);
    };

    const closePopup = () => {
        setIsPopupOpen(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewProductData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Thêm sản phẩm mới vào mảng createProducts
        setCreateProducts((prevState) => [...prevState, newProductData]);
        // Đặt lại dữ liệu của form
        setNewProductData({
            id: '',
            title: '',
            price: '',
            brand: '',
            category: '',
            thumbnail: '',
        });
        // Đóng popup
        closePopup();
    };

    return (
        <div className="container">

            <button className="btn btn-primary add-product" onClick={openPopup}>
                Thêm Sản Phẩm
            </button>
            <div className="row">
                {createProducts.map((product) => (
                    <div key={product.id} className="col-md-2">
                        <div className="card mb-3">
                            <img src={product.thumbnail} className="card-img-top" alt={product.title} />
                            <div className="card-body">
                                <h5 className="card-title">{product.title}</h5>
                                <p className="card-text">{product.price.toLocaleString()}</p>

                            </div>
                        </div>
                    </div>
                ))}
            </div>



            {isPopupOpen && (
                <div className="popup">
                    <h2>Thêm Sản Phẩm</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>ID:</label>
                            <input
                                type="text"
                                className="form-control"
                                name="id"
                                value={newProductData.id}
                                onChange={handleInputChange}
                                placeholder="Nhập ID"
                            />
                        </div>
                        <div className="form-group">
                            <label>Title:</label>
                            <input
                                type="text"
                                className="form-control"
                                name="title"
                                value={newProductData.title}
                                onChange={handleInputChange}
                                placeholder="Nhập tiêu đề"
                            />
                        </div>
                        <div className="form-group">
                            <label>Price:</label>
                            <input
                                type="text"
                                className="form-control"
                                name="price"
                                value={newProductData.price}
                                onChange={handleInputChange}
                                placeholder="Nhập giá"
                            />
                        </div>
                        <div className="form-group">
                            <label>Brand:</label>
                            <input
                                type="text"
                                className="form-control"
                                name="brand"
                                value={newProductData.brand}
                                onChange={handleInputChange}
                                placeholder="Nhập nhãn hiệu"
                            />
                        </div>
                        <div className="form-group">
                            <label>Category:</label>
                            <input
                                type="text"
                                className="form-control"
                                name="category"
                                value={newProductData.category}
                                onChange={handleInputChange}
                                placeholder="Nhập danh mục"
                            />
                        </div>
                        <div className="form-group">
                            <label>Thumbnail:</label>
                            <input
                                type="text"
                                className="form-control"
                                name="thumbnail"
                                value={newProductData.thumbnail}
                                onChange={handleInputChange}
                                placeholder="Nhập URL ảnh"
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                        <button type="button" className="btn btn-secondary" onClick={closePopup}>
                            Huỷ
                        </button>
                    </form>
                </div>

            )}
        </div>
    );
};

export default AllProducts;
