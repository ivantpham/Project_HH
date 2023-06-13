import React from 'react';
import '../assets/less/Cart.css'; // Import your custom CSS file
import 'bootstrap/dist/css/bootstrap.min.css'; // Import CSS của Bootstrap

const CartProduct = () => {
    // Lấy danh sách sản phẩm từ LocalStorage
    const products = JSON.parse(localStorage.getItem('ProductsCart'));

    return (
        <div className="container">
            <div className="row">
                {products.map((product, index) => (
                    <div className="card mb-3 d-flex justify-content-between" key={index}>
                        <div className="card-box-wrapper">
                            <img
                                src={product.thumbnail}
                                alt={product.title}
                                className="card-img-top"
                                style={{ maxWidth: '70px', maxHeight: 'auto' }}
                            />
                            <div className="card-box">
                                <h3 className="card-title">{product.title}</h3>
                                <p className="card-text">{product.price}</p>
                            </div>
                        </div>
                        <div className=""></div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CartProduct;
