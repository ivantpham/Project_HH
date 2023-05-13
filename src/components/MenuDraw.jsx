import React from 'react'
import { dataProduct } from 'api/datadraw'

const MenuDraw = () => {
    return (
        <div className='grid grid-cols-6 gap-6'>
            {dataProduct.products.map((product) => (
                <div key={product.id}>
                    <img src={product.thumbnail} alt={product.title} />
                    <h3>{product.title}</h3>
                    <p> {product.price} VND</p>
                </div>
            ))}
        </div>
    );
}

export default MenuDraw;