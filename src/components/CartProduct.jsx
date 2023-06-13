import React, { useEffect, useState } from 'react';
import '../assets/less/Cart.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const CartProduct = () => {
    const [products, setProducts] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [formData, setFormData] = useState({
        fullName: '',
        phoneNumber: '',
        address: ''
    });

    useEffect(() => {
        const updateProducts = () => {
            const storedProducts = JSON.parse(localStorage.getItem('ProductsCart'));
            setProducts(storedProducts || []);
        };

        const interval = setInterval(updateProducts, 500);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const calculateTotalPrice = () => {
            let total = 0;
            for (const product of products) {
                total += product.price * product.quantity;
            }
            setTotalPrice(total);
        };

        calculateTotalPrice();
    }, [products]);

    const handleDeleteProduct = (index) => {
        const confirmDelete = window.confirm('Bạn có muốn xoá sản phẩm này khỏi giỏ hàng?');
        if (confirmDelete) {
            const updatedProducts = [...products];
            updatedProducts.splice(index, 1);
            setProducts(updatedProducts);
            localStorage.setItem('ProductsCart', JSON.stringify(updatedProducts));
        }
    };

    const handleIncrement = (index) => {
        const updatedProducts = [...products];
        updatedProducts[index].quantity += 1;
        setProducts(updatedProducts);
        localStorage.setItem('ProductsCart', JSON.stringify(updatedProducts));
    };

    const handleDecrement = (index) => {
        const updatedProducts = [...products];
        if (updatedProducts[index].quantity > 1) {
            updatedProducts[index].quantity -= 1;
            setProducts(updatedProducts);
            localStorage.setItem('ProductsCart', JSON.stringify(updatedProducts));
        }
    };

    const calculateTotalPrice = (price, quantity) => {
        const totalPrice = price * quantity;
        return totalPrice.toLocaleString();
    };

    const handleConfirmation = () => {
        setShowConfirmation(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Gửi thông tin đặt hàng đi, xử lý dữ liệu ở đây
        // Sau khi xử lý thành công, hiển thị thông báo thành công và reset form
        setShowSuccessMessage(true);
        setFormData({
            fullName: '',
            phoneNumber: '',
            address: ''
        });
        setProducts([]);
        localStorage.removeItem('ProductsCart');
    };

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

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
                                <p className="card-text">Price: {calculateTotalPrice(product.price, product.quantity)}</p>
                            </div>
                        </div>
                        <div className="">
                            <div className="quantity">
                                <button className="btn btn-sm btn-danger" onClick={() => handleDecrement(index)}>
                                    -
                                </button>
                                <span className="quantity-text">{product.quantity}</span>
                                <button className="btn btn-sm btn-success" onClick={() => handleIncrement(index)}>
                                    +
                                </button>
                            </div>
                            <button className="btn btn-danger" onClick={() => handleDeleteProduct(index)}>
                                Xoá
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            <div className="total-price">Tổng giá cần thanh toán: {totalPrice.toLocaleString()}</div>
            {!showConfirmation && (
                <button className="btn btn-primary" onClick={handleConfirmation}>
                    Thanh Toán
                </button>
            )}
            {showConfirmation && (
                <div className="confirmation-form">
                    <h3>Xác nhận thanh toán</h3>
                    <div className="total-price">Tổng giá: {totalPrice.toLocaleString()}</div>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="fullName">Họ tên</label>
                            <input
                                type="text"
                                className="form-control"
                                id="fullName"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="phoneNumber">Số điện thoại</label>
                            <input
                                type="text"
                                className="form-control"
                                id="phoneNumber"
                                name="phoneNumber"
                                value={formData.phoneNumber}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="address">Địa chỉ</label>
                            <input
                                type="text"
                                className="form-control"
                                id="address"
                                name="address"
                                value={formData.address}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">
                            Đặt hàng
                        </button>
                        <button className="btn btn-secondary" onClick={() => setShowConfirmation(false)}>
                            Không
                        </button>
                    </form>
                </div>
            )}
            {showSuccessMessage && (
                <div className="success-message">
                    Bạn đã đặt hàng thành công, xin vui lòng chờ đợi nhân viên chăm sóc khách hàng của chúng tôi.
                </div>
            )}
        </div>
    );
};

export default CartProduct;
