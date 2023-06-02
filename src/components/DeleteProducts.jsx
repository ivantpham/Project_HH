import React from 'react';

const DeleteProducts = ({ productId, onDelete }) => {
    const handleDelete = () => {
        // Gọi hàm xử lý xóa sản phẩm từ component cha
        onDelete(productId);
    };

    return (
        <button className="btn btn-danger" onClick={handleDelete}>
            Xoá
        </button>
    );
};

export default DeleteProducts;
