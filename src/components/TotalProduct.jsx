import React from 'react';

const TotalProduct = ({ displayedProducts }) => {
    const totalCount = displayedProducts.length;

    return (
        <div className="total-product">
            <p>{totalCount}</p>
        </div>
    );
};

export default TotalProduct;
